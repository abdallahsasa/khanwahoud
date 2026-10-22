<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $isAdmin = (bool) ($user->is_admin ?? false);
        $isSuperAdmin = method_exists($user, 'isSuperAdmin') ? $user->isSuperAdmin() : false;

        // Sub-admins are permitted only if they have designated active permissions
        $isSubAdmin = false;
        if (method_exists($user, 'isSubAdmin') && $user->isSubAdmin()) {
            $perms = $user->permissions ?? [];
            if (is_string($perms)) {
                $perms = json_decode($perms, true) ?? [];
            }
            $isSubAdmin = is_array($perms) && ! empty($perms);
        }

        if (! $isAdmin && ! $isSuperAdmin && ! $isSubAdmin) {
            return response()->json(['message' => 'Forbidden. Admin privileges required.'], 403);
        }

        return $next($request);
    }
}

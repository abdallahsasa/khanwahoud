<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'role',
        'permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'permissions' => 'array',
        ];
    }

    /**
     * Check if user is Super Admin.
     */
    public function isSuperAdmin(): bool
    {
        if ($this->email === 'admin@wahoud.com') {
            return true;
        }

        if ($this->role === 'super_admin') {
            return true;
        }

        if ($this->role === 'sub_admin') {
            return false;
        }

        return (bool) $this->is_admin;
    }

    /**
     * Check if user is Sub Admin.
     */
    public function isSubAdmin(): bool
    {
        return $this->role === 'sub_admin' && !$this->isSuperAdmin();
    }

    /**
     * Check if user has permission for a specific section/resource.
     */
    public function hasPermission(string $permission): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        $perms = $this->permissions ?? [];
        if (is_string($perms)) {
            $perms = json_decode($perms, true) ?? [];
        }

        return is_array($perms) && in_array($permission, $perms, true);
    }

    /**
     * Determine if user can access the Filament admin panel.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        $perms = $this->permissions ?? [];
        if (is_string($perms)) {
            $perms = json_decode($perms, true) ?? [];
        }

        return $this->role === 'sub_admin' && is_array($perms) && !empty($perms);
    }
}

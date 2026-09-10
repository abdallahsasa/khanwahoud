<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }



    public function dining()
    {
        return Inertia::render('Dining');
    }



    public function experience()
    {
        return Inertia::render('Experience');
    }

    public function membership()
    {
        return Inertia::render('Membership');
    }

    public function restoration()
    {
        return Inertia::render('Restoration');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function adminLogin()
    {
        return Inertia::render('AdminLogin');
    }

    public function adminDashboard()
    {
        return Inertia::render('AdminDashboard');
    }

    public function notFound()
    {
        return Inertia::render('NotFound');
    }
}

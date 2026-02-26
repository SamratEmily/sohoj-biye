<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApprovedUser
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->isApproved()) {
            abort(403, 'আপনার অ্যাকাউন্ট অনুমোদিত নয়');
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
  public function handle(Request $request, Closure $next)
{
    /** @var \App\Models\User|null $user */
    $user = Auth::user();
    
    if (!$user || !$user->isAdmin()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }
    return $next($request);
}
}
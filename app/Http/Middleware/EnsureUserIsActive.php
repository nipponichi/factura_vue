<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Verifica si el usuario está autenticado y activo
        if (Auth::check() && !Auth::user()->isActive) {
            Auth::guard('web')->logout(); // Cierra la sesión del usuario
            session()->flush();
            session()->regenerate();
            return redirect('/login')->with('error', 'Tu cuenta ha sido desactivada.');
        }

        return $next($request);
    }
}
<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class LogSuccessfulLogin
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Login  $event
     * @return void
     */
    public function handle(Login $event)
    {
        $user = $event->user;
        $ipAddress = request()->ip();
        $time = now();
        
        Log::info("userLog", [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'email' => $user->email,
            'ip_address' => $ipAddress,
            'time' => $time
        ]);
    }
}

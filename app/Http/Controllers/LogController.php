<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LogController extends Controller
{

    public function __construct()
    {
        $this->middleware(['can:read log'])->only('index', 'show');
        $this->middleware(['can:create log'])->only('create', 'store');
        $this->middleware(['can:update log'])->only('edit', 'update');
        $this->middleware(['can:delete log'])->only('destroy');
    }
    function index()
    {

        $user = Auth::user();

        $logFile = storage_path('logs/laravel.log');
        if (!file_exists($logFile)) {
            return response()->json(['error' => "Log file not found."], 404);
        }

        $logs = [];
        $handle = fopen($logFile, 'r');
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                if (strpos($line, 'userLog') !== false) {
                    $jsonStart = strpos($line, '{');
                    if ($jsonStart !== false) {
                        $data = json_decode(substr($line, $jsonStart), true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $logs[] = $data;
                        }
                    }
                }
            }
            fclose($handle);
        }

        // Si el usuario no es administrador, filtrar los logs para excluir los de administradores
        if (!$user->hasRole('admin')) {
            $logs = array_filter($logs, function ($log) {
                // Aquí se asume que el log tiene un campo 'user_id' y que puedes obtener el usuario por su ID
                $logUser = \App\Models\User::find($log['user_id']);
                return !$logUser->hasRole('admin');
            });
        }

        // Ordenar los logs por fecha de la más reciente a la más antigua
        usort($logs, function ($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });

        return response()->json($logs);
    }


}

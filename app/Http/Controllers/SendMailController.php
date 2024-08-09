<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendMailController extends Controller
{
    public function sendMail(Request $request)
    {
        $mailData = [
            'title' => $request->data->title,
            'body' => $request->data->body
        ];

        Mail::to($request->data->email)->send(new SendMail($mailData));

        dd('CORRECTO! El correo fue enviado.');
    }
}

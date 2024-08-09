<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Mail;
use App\Mail\SendMail;

class SendMailController extends Controller
{
    public function sendMail(Request $request)
    {
        $mailData = [
            'title' => $request->data['subject'],
            'body' => $request->data['body']
        ];

        Mail::to($request->data['email'])->send(new SendMail($mailData));

        dd('CORRECTO! El correo fue enviado.');
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => 'string',
            'documentCounter' => 'numeric',
            'date' => 'date',
            'expirationDate' => 'date',
            'amount' => 'numeric',
            'totalTax' => 'numeric',
            'subTotal' => 'numeric',
            'paid' => 'boolean',
            'invoiced' => 'boolean',
            'isReceived' => 'boolean',
            //'active' => 'boolean'
            // 'concept' => 'array',
            // 'customer' => 'array',
            // 'company' => 'array',
            // 'type' => 'array',
            // 'serie' => 'array',
            // 'paymentMethod' => 'array',
            // 'paymentSystem' => 'array',
        ];
    }
}

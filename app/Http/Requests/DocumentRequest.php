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
            'document_counter' => 'string',
            'company_id_company' => 'string',
            'company_id_customer' => 'string',
            'documents_type_id' => 'string',
            'documents_series_id' => 'string',
            'date' => 'datetime',
            'expiration' => 'datetime',
            'amount' => 'decimal',
            'totalTax' => 'decimal',
            'subTotal' => 'decimal',
            'paid' => 'boolean',
            'invoiced' => 'boolean',
            'bank_account_id' => 'string',
            'payment_methods_id' => 'string',
            //'active' => 'boolean'
        ];
    }
}

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
            'company_id_company' => 'string',
            'company_id_customer' => 'string',
            'documents_type_id' => 'string',
            'documents_series_id' => 'string',
            'date' => 'datetime',
            'amount' => 'decimal',
            'tax' => 'decimal',
            'subtotal' => 'decimal',
            //'paid' => 'boolean',
            //'active' => 'boolean'
        ];
    }
}

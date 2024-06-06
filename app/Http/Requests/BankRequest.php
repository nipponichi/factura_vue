<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends FormRequest
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
            'id' => 'int',
            'iban' => 'string|max:4',
            'entity' => 'string|max:4',
            'office' => 'string|max:4',
            'control_digit' => 'string|max:2',
            'account_number' => 'string|max:10',
            'bank_name' => 'string|max:255',
            'country' => 'string|max:255',
            'swift' => 'string|max:255',
            'currency' => 'string|max:255',
            'favorite' => 'boolean',
            'CompanyID' => 'string|max:255',
        ];
        
    }
}

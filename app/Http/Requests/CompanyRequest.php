<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            'name' => 'string|max:255',
            'taxNumber' => 'string',
            'address1' => 'string|max:255',
            'address2' => 'nullable|string|max:255',
            'email' => 'string',
            'phone1' => 'string',
            'phone2' => 'string',
            'province' => 'string',
            'town' => 'string',
            'postCode' => 'string',
            'country' => 'string'
        ];
    }
}

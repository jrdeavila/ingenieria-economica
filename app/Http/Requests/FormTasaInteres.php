<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class FormTasaInteres extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "capital" => "required|numeric",
            "tipo_tasa_id" => "required|numeric|exists:tasa_tipos,id",
            "per_tasa" => "required|numeric",
            "tiempo" => "required|numeric",
            "periodo_id" => "required|numeric|exists:tasa_tipos,id",
            'tipo_tasa' => "required|bool"
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            "errors" => $validator->errors(),
        ], 422);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}

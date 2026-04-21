<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCircuitsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Name'           => 'required|string|max:255',
            'Location'       => 'required|string|max:255',
            'Nation'         => 'required|string|max:255',
            'FirstGrandPrix' => 'nullable|integer',
            'RecordLapTime'  => 'nullable|string|max:255',
            'RecordDriver'   => 'nullable|string|max:255',
            'Image'          => 'nullable|string',
        ];
    }
}
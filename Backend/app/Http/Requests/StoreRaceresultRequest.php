<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRaceresultRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'GrandPrixID'   => 'required|integer',
            'DriverID'      => 'required|integer',
            'ConstructorID' => 'required|integer',
            'Position'      => 'nullable|integer',
            'Grid'          => 'nullable|integer',
            'Laps'          => 'nullable|integer',
            'TimeOrRetired' => 'nullable|string|max:255',
            'Points'        => 'required|numeric',
            'FastestLap'    => 'nullable|boolean',
            'GpOrSprint'    => 'nullable|string|max:50',
        ];
    }
}
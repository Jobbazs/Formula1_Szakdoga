<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRaceresultRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'GrandPrixID'   => 'sometimes|integer',
            'DriverID'      => 'sometimes|integer',
            'ConstructorID' => 'sometimes|integer',
            'Position'      => 'nullable|integer',
            'Grid'          => 'nullable|integer',
            'Laps'          => 'nullable|integer',
            'TimeOrRetired' => 'nullable|string|max:255',
            'Points'        => 'sometimes|numeric',
            'FastestLap'    => 'nullable|boolean',
            'GpOrSprint'    => 'nullable|string|max:50',
        ];
    }
}
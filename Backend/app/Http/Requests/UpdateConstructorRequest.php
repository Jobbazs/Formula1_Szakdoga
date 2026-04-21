<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConstructorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Name'               => 'sometimes|string|max:255',
            'Nationality'        => 'sometimes|string|max:255',
            'FoundedYear'        => 'sometimes|integer',
            'TeamPrincipal'      => 'sometimes|string|max:255',
            'Wins'               => 'sometimes|integer',
            'PolePositions'      => 'sometimes|integer',
            'Podiums'            => 'sometimes|integer',
            'WorldChampionships' => 'sometimes|integer',
            'History'            => 'nullable|string',
            'Image'              => 'nullable|string',
        ];
    }
}
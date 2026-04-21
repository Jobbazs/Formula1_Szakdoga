<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConstructorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Name'               => 'required|string|max:255',
            'Nationality'        => 'required|string|max:255',
            'FoundedYear'        => 'required|integer',
            'TeamPrincipal'      => 'required|string|max:255',
            'Wins'               => 'required|integer',
            'PolePositions'      => 'required|integer',
            'Podiums'            => 'required|integer',
            'WorldChampionships' => 'required|integer',
            'History'            => 'nullable|string',
            'Image'              => 'nullable|string',
        ];
    }
}
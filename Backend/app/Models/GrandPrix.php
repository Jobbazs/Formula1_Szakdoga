<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrandPrix extends Model
{
    /** @use HasFactory<\Database\Factories\GrandPrixFactory> */
    use HasFactory;

    public function circuit()
{
    return $this->belongsTo(Circuits::class, 'CircuitID', 'CircuitID');
}

public function winner()
{
    return $this->belongsTo(Driver::class, 'WinnerDriverID', 'DriverID');
}

public function qualifyingResults()
{
    return $this->hasMany(QualifyingResult::class, 'GrandPrixID', 'GrandPrixID');
}

public function raceResults()
{
    return $this->hasMany(Raceresult::class, 'GrandPrixID', 'GrandPrixID');
}
}

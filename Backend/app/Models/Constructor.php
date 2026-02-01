<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constructor extends Model
{
    /** @use HasFactory<\Database\Factories\ConstructorFactory> */
    use HasFactory;

    public function drivers()
{
    return $this->hasMany(Driver::class, 'ConstructorID', 'ConstructorID');
}

public function driverHistory()
{
    return $this->belongsToMany(Driver::class, 'teams_drivers', 'Teams_Id', 'Drivers_Id')
                ->withPivot('First_Year', 'End_Year')
                ->withTimestamps();
}

public function qualifyingResults()
{
    return $this->hasMany(QualifyingResult::class, 'ConstructorID', 'ConstructorID');
}

public function raceResults()
{
    return $this->hasMany(Raceresult::class, 'ConstructorID', 'ConstructorID');
}
}

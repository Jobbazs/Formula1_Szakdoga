<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $primaryKey = 'DriverID';
    public $timestamps = false; 

    protected $fillable = [
        'DriverID', 
        'Name', 
        'ConstructorID', 
        'Nationality',
        'BirthDate', 
        'Biography', 
        'Image', 
    ];

    public function constructor()
    {
        return $this->belongsTo(Constructor::class, 'ConstructorID', 'ConstructorID');
    }

    public function wonGrandPrix()
    {
        return $this->hasMany(GrandPrix::class, 'WinnerDriverID', 'DriverID');
    }

    
    public function teamHistory()
    {
        return $this->belongsToMany(Constructor::class, 'teams_drivers', 'DriverID', 'ConstructorID')
            ->withPivot('FirstYear', 'EndYear')
            ->withTimestamps();
    }

    public function qualifyingResults()
    {
        return $this->hasMany(QualifyingResult::class, 'DriverID', 'DriverID');
    }

    public function raceResults()
    {
        return $this->hasMany(RaceResult::class, 'DriverID', 'DriverID'); 
    }
}
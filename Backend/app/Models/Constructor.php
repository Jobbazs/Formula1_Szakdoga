<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constructor extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'ConstructorID';
    public $timestamps = false; 
    
    protected $fillable = [
        'ConstructorID', 
        'Name', 
        'Nationality', 
        'FoundedYear',
        'TeamPrincipal',
        'Wins', 
        'PolePositions', 
        'Podiums', 
        'WorldChampionships', 
        'History',
        'Image', 
    ];

    public function drivers()
    {
        return $this->hasMany(Driver::class, 'ConstructorID', 'ConstructorID');
    }

    public function driverHistory()
    {
        return $this->belongsToMany(Driver::class, 'teams_drivers', 'ConstructorID', 'DriverID')
            ->withPivot('FirstYear', 'EndYear')
            ->withTimestamps();
    }

    public function qualifyingResults()
    {
        return $this->hasMany(QualifyingResult::class, 'ConstructorID', 'ConstructorID');
    }

    public function raceResults()
    {
        return $this->hasMany(RaceResult::class, 'ConstructorID', 'ConstructorID'); 
    }
}
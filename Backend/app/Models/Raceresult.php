<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaceResult extends Model
{
    /** @use HasFactory<\Database\Factories\RaceresultFactory> */
    use HasFactory;

    public function grandPrix()
{
    return $this->belongsTo(GrandPrix::class, 'GrandPrixID', 'GrandPrixID');
}

public function driver()
{
    return $this->belongsTo(Driver::class, 'DriverID', 'DriverID');
}

public function constructor()
{
    return $this->belongsTo(Constructor::class, 'ConstructorID', 'ConstructorID');
}
}

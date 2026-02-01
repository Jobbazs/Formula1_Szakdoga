<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Circuits extends Model
{
    /** @use HasFactory<\Database\Factories\CircuitsFactory> */
    use HasFactory;
    
    public function grandPrix()
{
    return $this->hasMany(GrandPrix::class, 'CircuitID', 'CircuitID');
}
}

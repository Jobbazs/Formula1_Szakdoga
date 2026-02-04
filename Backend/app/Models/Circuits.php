<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Circuits extends Model
{
    /** @use HasFactory<\Database\Factories\CircuitsFactory> */
    use HasFactory;

      protected $fillable = [
        'CircuitID', 
        'Name', 
        'DriverID', 
        'Location',
        'Nation ',
        'FirstGrandPrix ',
        'RecordLapTime ',
        'RecordDriver ',
        'Image ',
       
    ];
    
    public function grandPrix()
{
    return $this->hasMany(GrandPrix::class, 'CircuitID', 'CircuitID');
}
}

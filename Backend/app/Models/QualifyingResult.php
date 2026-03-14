<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QualifyingResult extends Model
{
    /** @use HasFactory<\Database\Factories\QualifyingResultFactory> */
    use HasFactory;

    protected $primaryKey = 'QualifyingID';

    protected $table = 'qualifying_result';


     protected $fillable = [
        'QualifyingID', 
        'GrandPrixID', 
        'DriverID', 
        'ConstructorID',
        'GridPosition',
        
     ];

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

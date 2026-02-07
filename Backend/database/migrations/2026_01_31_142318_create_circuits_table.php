<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('circuits', function (Blueprint $table) {
            $table->id('CircuitID');
            $table->string('Name', 150);
            $table->string('Location', 100);
            $table->string('Country', 50);
            $table->decimal('Length', 5, 3)->nullable(); 
            $table->unsignedSmallInteger('Laps')->nullable();
            $table->year('FirstGrandPrix')->nullable(); 
            $table->string('RecordDriver', 100)->nullable(); 
            $table->time('RecordLapTime')->nullable(); 
            $table->string('Image', 255)->default('');
            $table->timestamps();
        });

        
        DB::statement('ALTER TABLE circuits ADD CONSTRAINT chk_circuit_length CHECK (Length IS NULL OR Length > 0)');
        DB::statement('ALTER TABLE circuits ADD CONSTRAINT chk_laps_positive CHECK (Laps IS NULL OR Laps > 0)');
        DB::statement('ALTER TABLE circuits ADD CONSTRAINT chk_circuit_name CHECK (CHAR_LENGTH(TRIM(Name)) > 0)');
        DB::statement('ALTER TABLE circuits ADD CONSTRAINT chk_first_gp_year CHECK (FirstGrandPrix IS NULL OR (FirstGrandPrix >= 1900 AND FirstGrandPrix <= 2026))');
    }
    
    public function down(): void
    {
        Schema::dropIfExists('circuits');
    }
};
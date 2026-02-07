<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
             Schema::create('qualifying_result', function (Blueprint $table) {
            $table->id('QualifyingID');
            $table->unsignedBigInteger('GrandPrixID');
            $table->unsignedBigInteger('DriverID');
            $table->unsignedBigInteger('ConstructorID')->nullable();
            $table->integer('GridPosition')->nullable();

            $table->foreign('GrandPrixID')
                  ->references('GrandPrixID')
                  ->on('grandprix')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('DriverID')
                  ->references('DriverID')
                  ->on('drivers')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('ConstructorID')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
        });

      // Grid pozíció 1-20 között
        DB::statement('ALTER TABLE qualifying_result ADD CONSTRAINT chk_grid_position CHECK (GridPosition IS NULL OR GridPosition BETWEEN 1 AND 20)');
        

            //Bővítési lehetőség, q1 q2 q3 időit felvinni az adatbázisba 

        // Q2 idő csak akkor, ha van Q1
      //   DB::statement('ALTER TABLE qualifying_result ADD CONSTRAINT chk_q2_requires_q1 CHECK (Q2Time IS NULL OR Q1Time IS NOT NULL)');
        
        // Q3 idő csak akkor, ha van Q2
      //   DB::statement('ALTER TABLE qualifying_result ADD CONSTRAINT chk_q3_requires_q2 CHECK (Q3Time IS NULL OR Q2Time IS NOT NULL)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qualifying_result');  
          }
};

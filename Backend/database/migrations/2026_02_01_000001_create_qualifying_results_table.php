<?php

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
             Schema::create('qualifyingresults', function (Blueprint $table) {
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qualifying_results');
    }
};

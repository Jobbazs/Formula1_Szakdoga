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
             Schema::create('raceresults', function (Blueprint $table) {
            $table->id('ResultID');
            $table->unsignedBigInteger('GrandPrixID');
            $table->unsignedBigInteger('DriverID');
            $table->unsignedBigInteger('ConstructorID');
            $table->integer('Position')->nullable();
            $table->integer('Grid')->nullable();
            $table->integer('Laps')->nullable();
            $table->string('TimeOrRetired', 50)->nullable();
            $table->decimal('Points', 4, 1)->nullable();
            $table->boolean('FastestLap')->default(false);
            $table->boolean('GpOrSprint')->default(true);

            $table->foreign('GrandPrixID')
                  ->references('GrandPrixID')
                  ->on('grandprix')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('DriverID')
                  ->references('DriverID')
                  ->on('drivers')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('ConstructorID')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raceresults');
    }
};

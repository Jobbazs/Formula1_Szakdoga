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
          Schema::create('teams_drivers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('Teams_Id');
            $table->unsignedBigInteger('Drivers_Id');
            $table->year('First_Year');
            $table->year('End_Year')->nullable();

            $table->foreign('Teams_Id')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('Drivers_Id')
                  ->references('DriverID')
                  ->on('drivers')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
                  
            $table->index(['Drivers_Id', 'First_Year', 'End_Year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_drivers');
    }
};

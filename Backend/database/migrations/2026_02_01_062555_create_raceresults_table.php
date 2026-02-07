<?php

use Illuminate\Container\Attributes\DB;
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
             Schema::create('race_result', function (Blueprint $table) {
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

                // ===== MEGSZORÍTÁSOK =====
        
        // 1. Pozíció 1 és 20 között lehet
        DB::statement('ALTER TABLE race_results ADD CONSTRAINT chk_position_range CHECK (Position BETWEEN 1 AND 20 OR Position IS NULL)');
        
        // 2. Pontok 0 és 26 között (25 + 1 leggyorsabb kör)
        DB::statement('ALTER TABLE race_results ADD CONSTRAINT chk_points_range CHECK (Points BETWEEN 0 AND 26)');
        
        // 3. Csak a befutók kaphatnak pontot
        DB::statement('ALTER TABLE race_results ADD CONSTRAINT chk_points_only_finished CHECK (Status = "Finished" OR Points = 0)');
        
        // 4. 1. helyezett nem lehet 0 pont (ha befutott)
        DB::statement('ALTER TABLE race_results ADD CONSTRAINT chk_winner_points CHECK (Position != 1 OR Points > 0)');
        
        // 5. Egyedi pozíció versenyen belül (nem lehet két 1. helyezett)
        DB::statement('ALTER TABLE race_results ADD CONSTRAINT unique_position_per_race UNIQUE (GrandPrixID, Position)');
   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('race_result');
    }
};

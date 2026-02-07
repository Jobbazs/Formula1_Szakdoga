<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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
            $table->decimal('Points', 4, 1)->default(0);
            $table->boolean('FastestLap')->default(false);
            $table->boolean('GpOrSprint')->default(true); // true=GP, false=Sprint

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

            // Egy pilóta csak egyszer szerepelhet egy versenyen/sprinten
            $table->unique(['GrandPrixID', 'DriverID', 'GpOrSprint']);
        });


        // 1. Pozíció 1 és 20 között (vagy NULL ha kiesett)
        DB::statement('ALTER TABLE race_result ADD CONSTRAINT chk_position_range CHECK (Position IS NULL OR Position BETWEEN 1 AND 20)');

        // 2. Pontok 0 és 26 között
        DB::statement('ALTER TABLE race_result ADD CONSTRAINT chk_points_range CHECK (Points BETWEEN 0 AND 26)');

        // 3. Grid pozíció pozitív
        DB::statement('ALTER TABLE race_result ADD CONSTRAINT chk_grid_positive CHECK (Grid IS NULL OR Grid > 0)');

        // 4. Megtett körök pozitív
        DB::statement('ALTER TABLE race_result ADD CONSTRAINT chk_laps_positive CHECK (Laps IS NULL OR Laps >= 0)');
    }

    public function down(): void
    {
        Schema::dropIfExists('race_result');
    }
};

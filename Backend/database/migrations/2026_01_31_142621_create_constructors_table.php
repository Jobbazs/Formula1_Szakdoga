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
      Schema::create('constructors', function (Blueprint $table) {
            $table->id('ConstructorID');
            $table->string('Name', 150);
            $table->string('TeamPrincipal', 100)->nullable();
            $table->year('FoundedYear')->nullable();
            $table->integer('Podiums')->default(0);
            $table->integer('Wins')->default(0);
            $table->integer('PolePositions')->default(0);
            $table->integer('WorldChampionships')->default(0);
            $table->string('FirstGrandPrix', 100)->nullable();
            $table->string('Nation', 50)->nullable();
            $table->string('Image', 255)->default('');
        });

        //Nem lehet negatív év alapításnál
        DB::statement('ALTER TABLE constructors ADD CONSTRAINT chk_founded_year CHECK (FoundedYear > 1900 AND FoundedYear <= YEAR(CURDATE()))');
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('constructors');
    }
};

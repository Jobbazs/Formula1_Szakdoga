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
           Schema::create('grandprix', function (Blueprint $table) {
            $table->id('GrandPrixID');
            $table->string('Name', 150)->unique();
            $table->string('Country', 50);
            $table->unsignedBigInteger('CircuitID')->nullable();
            $table->year('Year');
            $table->unsignedBigInteger('WinnerDriverID')->nullable();
            $table->string('Image', 255)->default('');

            $table->foreign('CircuitID')
                  ->references('CircuitID')
                  ->on('circuits')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();

            $table->foreign('WinnerDriverID')
                  ->references('DriverID')
                  ->on('drivers')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
        });

        // 1. Év nem lehet a jövőben
        DB::statement('ALTER TABLE grandprix ADD CONSTRAINT chk_year_not_future CHECK (Year <= 2026)');
        
        // 2. Név nem lehet üres
        DB::statement('ALTER TABLE grandprix ADD CONSTRAINT chk_name_not_empty CHECK (CHAR_LENGTH(TRIM(Name)) > 0)');
    
    }
  
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grandprix');
    }
};

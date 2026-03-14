<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('constructors', function (Blueprint $table) {
            $table->id('ConstructorID');
            $table->string('Name', 150)->unique();
            $table->string('Nationality', 50);
            $table->year('FoundedYear')->nullable();
            $table->string('TeamPrincipal', 100)->nullable(); 
            $table->unsignedInteger('Wins')->default(0); 
            $table->unsignedInteger('PolePositions')->default(0); 
            $table->unsignedInteger('Podiums')->default(0); 
            $table->unsignedTinyInteger('WorldChampionships')->default(0); 
            $table->text('History')->default('');
            $table->string('Image', 255)->default('');
            $table->timestamps();
        });

        // Megszorítások
        DB::statement('ALTER TABLE constructors ADD CONSTRAINT chk_founded_year_min CHECK (FoundedYear IS NULL OR FoundedYear >= 1900)');
        DB::statement('ALTER TABLE constructors ADD CONSTRAINT chk_name_not_empty CHECK (CHAR_LENGTH(TRIM(Name)) > 0)');
        
        // Trigger a jövőbeli év ellenőrzéséhez
        DB::unprepared('
            CREATE TRIGGER check_founded_year_before_insert
            BEFORE INSERT ON constructors
            FOR EACH ROW
            BEGIN
                IF NEW.FoundedYear > YEAR(CURDATE()) THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Az alapítás éve nem lehet a jövőben";
                END IF;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER check_founded_year_before_update
            BEFORE UPDATE ON constructors
            FOR EACH ROW
            BEGIN
                IF NEW.FoundedYear > YEAR(CURDATE()) THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Az alapítás éve nem lehet a jövőben";
                END IF;
            END
        ');
    }
    
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS check_founded_year_before_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS check_founded_year_before_update');
        Schema::dropIfExists('constructors');
    }
};
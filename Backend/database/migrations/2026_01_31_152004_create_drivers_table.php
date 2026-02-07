<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id('DriverID');
            $table->string('Name', 150);
            $table->unsignedBigInteger('ConstructorID')->nullable();
            $table->string('Nationality', 50);
            $table->date('BirthDate');
            $table->text('Biography')->default('');
            $table->string('Image', 255)->default('');
            $table->timestamps();

            $table->foreign('ConstructorID')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
        });

        
        DB::unprepared('
            CREATE TRIGGER check_driver_age_before_insert
            BEFORE INSERT ON drivers
            FOR EACH ROW
            BEGIN
                IF TIMESTAMPDIFF(YEAR, NEW.BirthDate, CURDATE()) < 18 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "A pilótának legalább 18 évesnek kell lennie";
                END IF;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER check_driver_age_before_update
            BEFORE UPDATE ON drivers
            FOR EACH ROW
            BEGIN
                IF TIMESTAMPDIFF(YEAR, NEW.BirthDate, CURDATE()) < 18 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "A pilótának legalább 18 évesnek kell lennie";
                END IF;
            END
        ');
    }
    
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS check_driver_age_before_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS check_driver_age_before_update');
        Schema::dropIfExists('drivers');
    }
};
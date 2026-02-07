<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER check_max_drivers_per_race 
            BEFORE INSERT ON race_result
            FOR EACH ROW
            BEGIN
                DECLARE driver_count INT;
                DECLARE race_year INT;
                
                SELECT Year INTO race_year 
                FROM grandprix 
                WHERE GrandPrixID = NEW.GrandPrixID;
                
                SELECT COUNT(*) INTO driver_count 
                FROM race_result 
                WHERE GrandPrixID = NEW.GrandPrixID;
                
               
                
                -- Előtte 26 fő (történelmi rekord)
                IF race_year < 2024 AND driver_count >= 26 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Maximum 26 versenyző indulhat";
                END IF;
            END
        ');
    }
  
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS check_max_drivers_per_race');
    }
};
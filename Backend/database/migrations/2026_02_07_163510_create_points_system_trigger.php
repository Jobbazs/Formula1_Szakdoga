<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ✅ Töröld előbb, ha létezik
        DB::unprepared('DROP TRIGGER IF EXISTS auto_assign_points');
        
        DB::unprepared('
            CREATE TRIGGER auto_assign_points 
            BEFORE INSERT ON race_result
            FOR EACH ROW
            BEGIN
                DECLARE race_year INT;
                
                
                SELECT Year INTO race_year 
                FROM grandprix 
                WHERE GrandPrixID = NEW.GrandPrixID;
                
                -- 2010-től jelenlegi pontrendszer
                IF race_year >= 2010 THEN
                    SET NEW.Points = CASE NEW.Position
                        WHEN 1 THEN 25
                        WHEN 2 THEN 18
                        WHEN 3 THEN 15
                        WHEN 4 THEN 12
                        WHEN 5 THEN 10
                        WHEN 6 THEN 8
                        WHEN 7 THEN 6
                        WHEN 8 THEN 4
                        WHEN 9 THEN 2
                        WHEN 10 THEN 1
                        ELSE 0
                    END;
                END IF;
                
                -- ✅ JAVÍTVA: Status helyett Position NULL ellenőrzés
                -- Ha Position NULL (kiesett), akkor 0 pont
                IF NEW.Position IS NULL THEN
                    SET NEW.Points = 0;
                END IF;
            END
        ');
    }
  
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS auto_assign_points');
    }
};
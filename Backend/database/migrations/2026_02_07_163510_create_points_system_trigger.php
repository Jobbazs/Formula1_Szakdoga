<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
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
        
        IF NEW.Position IS NULL THEN
            SET NEW.Points = 0;
        ELSEIF NEW.GpOrSprint = 0 THEN
            -- Sprint: csak az első 8 kap pontot
            SET NEW.Points = CASE NEW.Position
                WHEN 1 THEN 8
                WHEN 2 THEN 7
                WHEN 3 THEN 6
                WHEN 4 THEN 5
                WHEN 5 THEN 4
                WHEN 6 THEN 3
                WHEN 7 THEN 2
                WHEN 8 THEN 1
                ELSE 0
            END;
        ELSEIF race_year >= 2010 THEN
            -- Normál GP
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
    END
');
    }
  
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS auto_assign_points');
    }
};
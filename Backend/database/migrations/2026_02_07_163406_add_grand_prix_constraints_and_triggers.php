<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Töröld az összes régi triggert
        DB::unprepared('DROP TRIGGER IF EXISTS before_race_result_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS before_points_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS after_race_result_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS before_winner_update');
        DB::unprepared('DROP TRIGGER IF EXISTS before_position_duplicate_check');

        // ===== TRIGGER 1: Maximum 20 POZÍCIÓ (nem DriverID!) =====
        DB::unprepared('
            CREATE TRIGGER before_race_result_insert 
            BEFORE INSERT ON race_result
            FOR EACH ROW
            BEGIN
                DECLARE position_count INT;
                DECLARE race_year INT;
                
                -- Verseny évének lekérése
                SELECT Year INTO race_year 
                FROM grandprix 
                WHERE GrandPrixID = NEW.GrandPrixID;
                
                -- Vagyis azokat, akiknek VAN pozíciója (nem NULL)
                SELECT COUNT(*) INTO position_count 
                FROM race_result 
                WHERE GrandPrixID = NEW.GrandPrixID 
                  AND GpOrSprint = NEW.GpOrSprint
                  AND Position IS NOT NULL;  -- ← Csak azok, akik befutottak
                
                -- 2024-től maximum 20 befutó pozíció
                IF race_year >= 2024 AND position_count >= 20 AND NEW.Position IS NOT NULL THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "2024-től maximum 20 pozíció lehet egy versenyen";
                END IF;
                
                -- 2024 előtt maximum 26 befutó pozíció
                IF race_year < 2024 AND position_count >= 26 AND NEW.Position IS NOT NULL THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Maximum 26 pozíció lehet egy versenyen";
                END IF;
            END
        ');

        // ===== TRIGGER 2: Pontok automatikus kiosztása pozíció alapján =====
        DB::unprepared('
            CREATE TRIGGER before_points_insert 
            BEFORE INSERT ON race_result
            FOR EACH ROW
            BEGIN
                DECLARE race_year INT;
                
                SELECT Year INTO race_year 
                FROM grandprix 
                WHERE GrandPrixID = NEW.GrandPrixID;
                
                -- 2010-től érvényes pontrendszer
                IF race_year >= 2010 THEN
                    CASE NEW.Position
                        WHEN 1 THEN SET NEW.Points = 25;
                        WHEN 2 THEN SET NEW.Points = 18;
                        WHEN 3 THEN SET NEW.Points = 15;
                        WHEN 4 THEN SET NEW.Points = 12;
                        WHEN 5 THEN SET NEW.Points = 10;
                        WHEN 6 THEN SET NEW.Points = 8;
                        WHEN 7 THEN SET NEW.Points = 6;
                        WHEN 8 THEN SET NEW.Points = 4;
                        WHEN 9 THEN SET NEW.Points = 2;
                        WHEN 10 THEN SET NEW.Points = 1;
                        ELSE SET NEW.Points = 0;
                    END CASE;
                    
                ELSEIF race_year BETWEEN 2003 AND 2009 THEN
                    CASE NEW.Position
                        WHEN 1 THEN SET NEW.Points = 10;
                        WHEN 2 THEN SET NEW.Points = 8;
                        WHEN 3 THEN SET NEW.Points = 6;
                        WHEN 4 THEN SET NEW.Points = 5;
                        WHEN 5 THEN SET NEW.Points = 4;
                        WHEN 6 THEN SET NEW.Points = 3;
                        WHEN 7 THEN SET NEW.Points = 2;
                        WHEN 8 THEN SET NEW.Points = 1;
                        ELSE SET NEW.Points = 0;
                    END CASE;
                    
                ELSEIF race_year BETWEEN 1991 AND 2002 THEN
                    CASE NEW.Position
                        WHEN 1 THEN SET NEW.Points = 10;
                        WHEN 2 THEN SET NEW.Points = 6;
                        WHEN 3 THEN SET NEW.Points = 4;
                        WHEN 4 THEN SET NEW.Points = 3;
                        WHEN 5 THEN SET NEW.Points = 2;
                        WHEN 6 THEN SET NEW.Points = 1;
                        ELSE SET NEW.Points = 0;
                    END CASE;
                END IF;
                
                -- Ha Position NULL (kiesett), 0 pont
                IF NEW.Position IS NULL THEN
                    SET NEW.Points = 0;
                END IF;
            END
        ');

        // ===== TRIGGER 3: Győztes automatikus frissítése =====
        DB::unprepared('
            CREATE TRIGGER after_race_result_insert 
            AFTER INSERT ON race_result
            FOR EACH ROW
            BEGIN
                -- Csak GP esetén (nem sprint)
                IF NEW.Position = 1 AND NEW.GpOrSprint = 1 THEN
                    UPDATE grandprix 
                    SET WinnerDriverID = NEW.DriverID 
                    WHERE GrandPrixID = NEW.GrandPrixID;
                END IF;
            END
        ');

        // ===== TRIGGER 4: Győztes nem változtatható meg =====
        DB::unprepared('
            CREATE TRIGGER before_winner_update 
            BEFORE UPDATE ON grandprix
            FOR EACH ROW
            BEGIN
                IF OLD.WinnerDriverID IS NOT NULL 
                   AND NEW.WinnerDriverID != OLD.WinnerDriverID 
                   AND NEW.WinnerDriverID IS NOT NULL THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Egy verseny győztese nem módosítható utólag";
                END IF;
            END
        ');

        // ===== TRIGGER 5: Pozíció egyediség ellenőrzése versenyen belül =====
        DB::unprepared('
            CREATE TRIGGER before_position_duplicate_check 
            BEFORE INSERT ON race_result
            FOR EACH ROW
            BEGIN
                DECLARE position_exists INT;
                
                SELECT COUNT(*) INTO position_exists 
                FROM race_result 
                WHERE GrandPrixID = NEW.GrandPrixID 
                  AND GpOrSprint = NEW.GpOrSprint
                  AND Position = NEW.Position
                  AND Position IS NOT NULL;

                 
                
                IF position_exists > 0 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Ez a pozíció már foglalt ezen a versenyen";
                END IF;
            END
        ');
    }
  
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS before_race_result_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS before_points_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS after_race_result_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS before_winner_update');
        DB::unprepared('DROP TRIGGER IF EXISTS before_position_duplicate_check');
    }
};
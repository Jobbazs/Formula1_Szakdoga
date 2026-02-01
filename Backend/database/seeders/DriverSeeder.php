<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('drivers')->insert([
            ['DriverID' => 1, 'Name' => 'Max Verstappen', 'ConstructorID' => 1, 'Nationality' => 'Netherlands', 'BirthDate' => '1997-09-30', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 2, 'Name' => 'Sergio Pérez', 'ConstructorID' => 1, 'Nationality' => 'Mexico', 'BirthDate' => '1990-01-26', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 3, 'Name' => 'Lando Norris', 'ConstructorID' => 4, 'Nationality' => 'United Kingdom', 'BirthDate' => '1999-11-13', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 4, 'Name' => 'Oscar Piastri', 'ConstructorID' => 4, 'Nationality' => 'Australia', 'BirthDate' => '2001-04-06', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 5, 'Name' => 'Charles Leclerc', 'ConstructorID' => 2, 'Nationality' => 'Monaco', 'BirthDate' => '1997-10-16', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 6, 'Name' => 'Carlos Sainz Jr.', 'ConstructorID' => 2, 'Nationality' => 'Spain', 'BirthDate' => '1994-09-01', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 7, 'Name' => 'George Russell', 'ConstructorID' => 3, 'Nationality' => 'United Kingdom', 'BirthDate' => '1998-02-15', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 8, 'Name' => 'Lewis Hamilton', 'ConstructorID' => 3, 'Nationality' => 'United Kingdom', 'BirthDate' => '1985-01-07', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 9, 'Name' => 'Fernando Alonso', 'ConstructorID' => 5, 'Nationality' => 'Spain', 'BirthDate' => '1981-07-29', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 10, 'Name' => 'Lance Stroll', 'ConstructorID' => 5, 'Nationality' => 'Canada', 'BirthDate' => '1998-10-29', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 11, 'Name' => 'Pierre Gasly', 'ConstructorID' => 6, 'Nationality' => 'France', 'BirthDate' => '1996-02-07', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 12, 'Name' => 'Esteban Ocon', 'ConstructorID' => 6, 'Nationality' => 'France', 'BirthDate' => '1996-09-17', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 13, 'Name' => 'Kevin Magnussen', 'ConstructorID' => 10, 'Nationality' => 'Denmark', 'BirthDate' => '1992-10-05', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 14, 'Name' => 'Nico Hülkenberg', 'ConstructorID' => 10, 'Nationality' => 'Germany', 'BirthDate' => '1987-08-19', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 15, 'Name' => 'Zhou Guanyu', 'ConstructorID' => 9, 'Nationality' => 'China', 'BirthDate' => '1999-05-30', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 16, 'Name' => 'Valtteri Bottas', 'ConstructorID' => 9, 'Nationality' => 'Finland', 'BirthDate' => '1989-08-28', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 17, 'Name' => 'Logan Sargeant', 'ConstructorID' => 7, 'Nationality' => 'United States', 'BirthDate' => '2000-12-31', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 18, 'Name' => 'Alexander Albon', 'ConstructorID' => 7, 'Nationality' => 'Thailand', 'BirthDate' => '1996-03-23', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 19, 'Name' => 'Yuki Tsunoda', 'ConstructorID' => 8, 'Nationality' => 'Japan', 'BirthDate' => '2000-05-11', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 20, 'Name' => 'Daniel Ricciardo', 'ConstructorID' => 8, 'Nationality' => 'Australia', 'BirthDate' => '1989-07-01', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 21, 'Name' => 'Liam Lawson', 'ConstructorID' => 8, 'Nationality' => 'New Zealand', 'BirthDate' => '2002-02-11', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 22, 'Name' => 'Franco Colapinto', 'ConstructorID' => 7, 'Nationality' => 'Argentina', 'BirthDate' => '2003-08-26', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 23, 'Name' => 'Oliver Bearman', 'ConstructorID' => 2, 'Nationality' => 'United Kingdom', 'BirthDate' => '2005-08-05', 'Biography' => '', 'Drivers_image' => ''],
            ['DriverID' => 24, 'Name' => 'Jack Doohan', 'ConstructorID' => 6, 'Nationality' => 'Australia', 'BirthDate' => '2003-01-20', 'Biography' => '', 'Drivers_image' => ''],
        ]);
    }
}
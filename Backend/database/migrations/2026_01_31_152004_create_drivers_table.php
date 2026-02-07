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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id('DriverID');
            $table->string('Name', 150);
            $table->unsignedBigInteger('ConstructorID')->nullable();
            $table->string('Nationality', 50);
            $table->date('BirthDate');
            $table->text('Biography')->default('');
            $table->string('Image', 255)->default('');

            $table->foreign('ConstructorID')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
        });

        //18+ életkor
        DB::statement('ALTER TABLE drivers ADD CONSTRAINT chk_driver_age CHECK (TIMESTAMPDIFF(YEAR, DateOfBirth, CURDATE()) >= 18)');

    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};

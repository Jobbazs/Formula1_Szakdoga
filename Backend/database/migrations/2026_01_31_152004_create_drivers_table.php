<?php

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
            $table->string('Drivers_image', 255)->default('');

            $table->foreign('ConstructorID')
                  ->references('ConstructorID')
                  ->on('constructors')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};

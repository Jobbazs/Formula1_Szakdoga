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
           Schema::create('grandprix', function (Blueprint $table) {
            $table->id('GrandPrixID');
            $table->string('Name', 150)->unique();
            $table->string('Country', 50);
            $table->unsignedBigInteger('CircuitID')->nullable();
            $table->year('Year');
            $table->unsignedBigInteger('WinnerDriverID')->nullable();
            $table->string('Images', 255)->default('');

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
    }
  
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grand_prixes');
    }
};

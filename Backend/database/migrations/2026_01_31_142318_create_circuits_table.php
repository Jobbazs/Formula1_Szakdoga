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
       Schema::create('circuits', function (Blueprint $table) {
            $table->id('CircuitID');
            $table->string('Name', 150);
            $table->string('Location', 100)->nullable();
            $table->string('Nation', 50)->nullable();
            $table->year('FirstGrandPrix')->nullable();
            $table->string('RecordLapTime', 20)->nullable();
            $table->string('RecordDriver', 100)->nullable();
            $table->string('Image', 255)->default('');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('circuits');
    }
};

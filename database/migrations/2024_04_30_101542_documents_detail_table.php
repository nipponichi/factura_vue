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
        Schema::create('documents_details', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable();
            $table->string('description')->nullable();
            $table->decimal('quantity');
            $table->decimal('tax');
            $table->decimal('price');
            $table->decimal('total');
            $table->decimal('discount')->nullable();
            $table->string('discount_reason')->nullable();
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->foreignId('documents_id')->constrained('documents');
        });
        

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents_details');
    }
};

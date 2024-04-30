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
        Schema::create('products_detail', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('stock')->nullable();
            $table->decimal('taxValue', 5, 2)->nullable();
            $table->string('state')->nullable();
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->foreignId('product_id')->constrained();
        });    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_detail');
    }
};

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
        
        Schema::create('invoices_concepts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('stock')->nullable();
            $table->string('state');
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->foreignId('invoice_detail_id')->constrained('invoices_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices_concepts');
    }
};

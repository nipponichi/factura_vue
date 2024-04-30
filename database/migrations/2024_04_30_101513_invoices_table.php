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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->String('number');
            $table->foreignId('company_id_company')->constrained();
            $table->foreignId('company_id_customer')->constrained();
            $table->dateTime('date');
            $table->decimal('amount');
            $table->String('type');
            $table->boolean('paid')->default (false);
            $table->boolean('active')->default (false);
            $table->foreignId('company_invoice_design_id')->constrained('companies_invoice_design');
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

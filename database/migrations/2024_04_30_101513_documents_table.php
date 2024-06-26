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
        
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->string('document_counter');
            $table->foreignId('company_id_company')->constrained();
            $table->foreignId('company_id_customer')->constrained();
            $table->foreignId('documents_type_id')->constrained('documents_type');
            $table->foreignId('documents_series_id')->constrained('documents_series');
            $table->foreignId('payment_methods_id')->constrained('payment_method');
            $table->foreignId('bank_account_id')->constrained('bank_account');
            $table->date('date');
            $table->date('expiration')->nullable();
            $table->decimal('amount', 10, 2);
            $table->boolean('paid');
            $table->boolean('active');
            $table->boolean('invoiced');
            $table->dateTime('dt_updated')->nullable();
            $table->foreignId('user_who_modified')->nullable()->constrained('users');
            $table->decimal('tax', 10, 2)->nullable();
            $table->decimal('subtotal', 10, 2)->nullable();
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};

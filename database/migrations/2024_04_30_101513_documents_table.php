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
            $table->foreignId('documents_series_id')->nullable();
            $table->foreignId('payment_methods_id')->constrained('payment_method');
            $table->foreignId('payment_system_id')->nullable();
            $table->date('date');
            $table->date('expiration')->nullable();
            $table->decimal('amount', 10, 2);
            $table->boolean('paid');
            $table->date('date_paid')->nullable();
            $table->boolean('active');
            $table->boolean('invoiced');
            $table->dateTime('dt_updated')->nullable();
            $table->foreignId('user_who_modified')->nullable()->constrained('users');
            $table->decimal('tax', 10, 2)->nullable();
            $table->decimal('subtotal', 10, 2)->nullable();
            $table->boolean('isReceived')->default (false);
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->longText('document_hash')->nullable();
            $table->longText('document_base64')->nullable();
            $table->binary('document_blob')->nullable();
            
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

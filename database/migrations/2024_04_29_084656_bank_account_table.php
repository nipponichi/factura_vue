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
        Schema::create('bank_account', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');
            $table->string('complete_bank_account');
            $table->string('iban');
            $table->string('entity');
            $table->string('office');
            $table->string('control_digit');
            $table->string('account_number');
            $table->string('swift');
            $table->string('bank_name');
            $table->string('country');
            $table->string('currency');
            $table->boolean('favourite')->default (false);
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_account');
    }
};

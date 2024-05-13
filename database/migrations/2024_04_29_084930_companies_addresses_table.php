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
        Schema::create('companies_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_detail_id')->constrained('companies_detail');
            $table->foreignId('company_address_register_id')->constrained('companies_address_register');
            $table->foreignId('company_province_register_id')->constrained('companies_province_register');
            $table->foreignId('company_town_register_id')->constrained('companies_town_register');
            $table->foreignId('company_country_register_id')->constrained('companies_country_register');
            $table->foreignId('company_post_code_register_id')->constrained('companies_post_code_register');
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->boolean('favorite')->default (false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies_addresses');
    }
};

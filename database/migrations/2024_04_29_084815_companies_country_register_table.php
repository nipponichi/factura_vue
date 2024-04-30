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
        Schema::create('companies_country_register', function (Blueprint $table) {
            $table->string('country');
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->foreignId('company_detail_id')->constrained('companies_detail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies_country_register');
    }
};

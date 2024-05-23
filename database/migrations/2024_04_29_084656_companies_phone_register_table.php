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
        Schema::create('companies_phone_register', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_detail_id')->constrained('companies_detail');
            $table->string('phone');
            $table->boolean('favourite')->default (false);
            $table->boolean('isMobile')->default (false);
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies_phone_register');
    }
};

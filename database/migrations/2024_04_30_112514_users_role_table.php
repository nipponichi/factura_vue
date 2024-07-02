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
        
        Schema::create('roles_limits', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('invoices');
            $table->bigInteger('customers');
            $table->bigInteger('companies');
            $table->bigInteger('products');
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
        });
        
        Schema::create('users_limits', function (Blueprint $table) {
            $table->dateTime('dt_start')->useCurrent();
            $table->dateTime('dt_end')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('role_limit_id')->constrained('roles_limits');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles_limits');
        Schema::dropIfExists('users_limits');
    }
};

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
        Schema::create('customer_of_customers', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->string('taxNumber');
            $table->string('address1',255);
            $table->string('address2',255)->nullable();
            $table->string('email',100);
            $table->string('phone1',12);
            $table->string('phone2',12)->nullable();
            $table->string('province',100);
            $table->string('town',100);
            $table->string('postCode',10);
            $table->string('country',10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_of_customers');
    }
};

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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name',255)->nullable();
            $table->string('taxNumber')->nullable();
            $table->string('address1',255)->nullable();
            $table->string('address2',255)->nullable();
            $table->string('email',100)->nullable();
            $table->string('phone1',12)->nullable();
            $table->string('phone2',12)->nullable();
            $table->string('province',100)->nullable();
            $table->string('town',100)->nullable();
            $table->string('postCode',10)->nullable();
            $table->string('country',10)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};

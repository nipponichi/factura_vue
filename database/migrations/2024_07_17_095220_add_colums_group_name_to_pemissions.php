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
        Schema::table('permissions', function (Blueprint $table) {
            $table->integer('group_name_id')->constrained('permission_group_names')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('permissions', function (Blueprint $table) {
            //
        });
    }

};

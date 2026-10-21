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
        Schema::table('restoration_logs', function (Blueprint $table) {
            $table->string('phase_ar')->nullable()->after('phase');
            $table->text('description_ar')->nullable()->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('restoration_logs', function (Blueprint $table) {
            $table->dropColumn(['phase_ar', 'description_ar']);
        });
    }
};

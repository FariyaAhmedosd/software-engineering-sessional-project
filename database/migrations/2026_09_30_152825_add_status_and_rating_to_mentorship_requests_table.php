<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mentorship_requests', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('message'); // pending, accepted, rejected
            $table->integer('rating')->nullable()->after('status'); // 1 to 5 star rating
            $table->text('feedback')->nullable()->after('rating');
        });
    }

    public function down(): void
    {
        Schema::table('mentorship_requests', function (Blueprint $table) {
            $table->dropColumn(['status', 'rating', 'feedback']);
        });
    }
};
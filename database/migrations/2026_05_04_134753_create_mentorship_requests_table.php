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
    Schema::create('mentorship_requests', function (Blueprint $table) {
    $table->id();
    $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
    $table->foreignId('mentor_id')->constrained('users')->onDelete('cascade');
    $table->string('skill_name'); // কোন স্কিলের জন্য মেন্টরশিপ চাচ্ছে
    $table->text('message')->nullable(); // ছোট কোনো নোট বা রিকোয়েস্ট
    $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentorship_requests');
    }
};

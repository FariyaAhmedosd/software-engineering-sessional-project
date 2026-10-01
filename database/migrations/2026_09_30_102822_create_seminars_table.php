<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seminars', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('skill_name'); // e.g., 'Blockchain', 'Machine Learning'
            $table->text('description')->nullable();
            $table->string('speaker_name')->default('Industry Expert');
            $table->dateTime('scheduled_at')->nullable();
            $table->string('location')->default('Auditorium / Online');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seminars');
    }
};

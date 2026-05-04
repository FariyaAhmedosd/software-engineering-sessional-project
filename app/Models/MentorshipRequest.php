<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorshipRequest extends Model
{
    use HasFactory;

    // এই অংশটুকু যোগ করো
    protected $fillable = [
        'student_id',
        'mentor_id',
        'skill_name',
        'message',
        'status',
    ];
}

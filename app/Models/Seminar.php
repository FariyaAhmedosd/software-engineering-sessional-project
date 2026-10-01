<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seminar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'skill_name',
        'description',
        'speaker_name',
        'scheduled_at',
        'location',
    ];
    public function users()
{
    return $this->belongsToMany(User::class);
}
}
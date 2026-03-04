<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{

public function store(Request $request) {
    Task::create([
        'title' => $request->title,
    ]);
    return back();
}
}

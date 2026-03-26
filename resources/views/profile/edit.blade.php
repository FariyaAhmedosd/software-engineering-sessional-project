<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile - SkillBridge</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h3>Update Your Skill Profile</h3>
        </div>
        <div class="card-body">
            @if(session('status'))
                <div class="alert alert-success">{{ session('status') }}</div>
            @endif

            <form action="{{ route('profile.update') }}" method="POST">
                @csrf
                @method('PATCH')

                <div class="mb-3">
                    <label class="form-label">Batch</label>
                    <input type="text" name="batch" class="form-control" value="{{ $user->batch }}">
                </div>

                <div class="mb-3">
                    <label class="form-label">Department</label>
                   <input type="text" name="department" class="form-control" value="{{ old('department', Auth::user()->department) }}">
                </div>

                <div class="mb-3">
                    <label class="form-label">Known Skills</label>
                    <textarea name="known_skills" class="form-control">{{ old('known_skills', Auth::user()->known_skills) }}</textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Interested Skills</label>
 <textarea name="interested_skills" class="form-control">{{ old('interested_skills', Auth::user()->interested_skills) }}</textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">whatsapp_number</label>
                    <input type="text" name="whatsapp_number" class="form-control" value="{{ old('whatsapp_number', Auth::user()->whatsapp_number) }}">
                </div>

                <button type="submit" class="btn btn-success">Save Profile</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
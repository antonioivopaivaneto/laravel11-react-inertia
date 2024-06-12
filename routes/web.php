<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/auth/google/redirect', [GoogleAuthController::class,'redirect']);
Route::get('/auth/google/callback',[GoogleAuthController::class,'callback']);

Route::middleware('auth', 'verified')->group(function() {
    Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::get('/project/{id}/users',[TaskController::class,'getUsersByProject'])->name('projects.users');
    Route::post('/project/userAddProject',[ProjectController::class,'AddUserInProject'])->name('userAddProject');

    Route::resource('project',ProjectController::class);
    Route::get('/task/my-tasks',[TaskController::class,'myTasks'])->name('task.myTasks');
    Route::resource('task',TaskController::class);
    Route::resource('user',UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

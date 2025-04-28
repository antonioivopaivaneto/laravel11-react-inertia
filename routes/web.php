<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\admin;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return redirect('/project');
});

Route::get('/auth/google/redirect', [GoogleAuthController::class,'redirect'])->name('login.google');
Route::get('/auth/google/callback',[GoogleAuthController::class,'callback']);

Route::middleware('auth', 'verified')->group(function() {
    Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::get('/project/{id}/users',[TaskController::class,'getUsersByProject'])->name('projects.users');
    Route::post('/project/userAddProject',[ProjectController::class,'AddUserInProject'])->name('userAddProject');
    Route::patch('/tasks/{task}/update-status', [TaskController::class, 'updateStatus'])->name('tasks.updateStatus');

    Route::resource('project',ProjectController::class);
    Route::get('/task/my-tasks',[TaskController::class,'myTasks'])->name('task.myTasks');
    Route::post('/task/createWithProject',[TaskController::class,'createWithProject'])->name('task.createWithProject');
    Route::get('/task/createWithProjectPage/{id}',[TaskController::class,'createWithProjectPage'])->name('task.createWithProjectPage');
    Route::resource('task',TaskController::class);
    Route::resource('user',UserController::class)->middleware(admin::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

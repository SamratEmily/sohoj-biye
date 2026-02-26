<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProposalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Approved User Routes
    Route::middleware('approved')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Biodata
        Route::get('/biodata/create', [BiodataController::class, 'create'])->name('biodata.create');
        Route::post('/biodata', [BiodataController::class, 'store'])->name('biodata.store');
        Route::get('/biodata/{biodata}/edit', [BiodataController::class, 'edit'])->name('biodata.edit');
        Route::put('/biodata/{biodata}', [BiodataController::class, 'update'])->name('biodata.update');

        // Feed
        Route::get('/feed', [BiodataController::class, 'index'])->name('feed');
        Route::get('/feed/{biodata}', [BiodataController::class, 'show'])->name('feed.show');

        // Proposals
        Route::post('/proposals', [ProposalController::class, 'store'])->name('proposals.store');
        Route::get('/proposals', [ProposalController::class, 'myProposals'])->name('proposals.index');

        // Chat
        Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
        Route::get('/chat/{chatRoom}', [ChatController::class, 'show'])->name('chat.show');
        Route::post('/chat/{chatRoom}/message', [ChatController::class, 'sendMessage'])->name('chat.send');
    });
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/pending-users', [AdminController::class, 'pendingUsers'])->name('pending-users');
    Route::get('/users', [AdminController::class, 'allUsers'])->name('users');
    Route::get('/users/{user}', [AdminController::class, 'showUser'])->name('users.show');
    Route::post('/users/{user}/approve', [AdminController::class, 'approveUser'])->name('users.approve');
    Route::post('/users/{user}/reject', [AdminController::class, 'rejectUser'])->name('users.reject');
    Route::get('/proposals', [AdminController::class, 'proposals'])->name('proposals');
    Route::post('/proposals/{proposal}/approve', [AdminController::class, 'approveProposal'])->name('proposals.approve');
    Route::post('/proposals/{proposal}/reject', [AdminController::class, 'rejectProposal'])->name('proposals.reject');
});

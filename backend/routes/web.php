<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestimonyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('user/portfolio');
// })->name('home');

Route::get('/myadminuser', function () {
    return Inertia::render('welcome');
})->name('admin');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('dashboard-count', [UserController::class, 'dashboard']);
    Route::get('projects', [ProjectController::class, 'index']);
    Route::post('/add_projects', [ProjectController::class, 'store']);
    // Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::post('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    //Testimony
    Route::get('testimony', [TestimonyController::class, 'getTestimony']);
    Route::patch('/admin/testimonials/{testimonial}/status', [TestimonyController::class, 'changeStatus']);
    Route::delete('/admin/testimonials/{testimonial}', [TestimonyController::class, 'destroy']);
    
    Route::get('messages', [ContactController::class, 'getMessages']);
    Route::post('/send-reply', [ContactController::class, 'sendReply'])->name('messages.reply');
    Route::patch('/messages/{id}/read', [ContactController::class, 'markAsRead'])->name('messages.read');
    Route::delete('/messages/{id}', [ContactController::class, 'destroy'])->name('messages.destroy');
});

// Route::get('/portfolio', [UserController::class, 'portfolio'])->name('portfolio');
//  return redirect(url()->previous() . '#contact')
//                 ->with('success', 'Thank you for your message! I will get back to you within 24-48 hours.');

Route::get('/', [UserController::class, 'home'])->name('home');
// Route::get('/back-to-project', function () {
//     return redirect()->to(url()->previous() . '#project');
// })->name('backToproject');
Route::get('/all-projects', [UserController::class, 'getViewAllProject'])->name('allproject');
// Route::get('/api/all-projects', [UserController::class, 'getViewAllProject']);

// Route::post('/api/submit-testimonial', [UserController::class, 'submitTestimonial']);
Route::post('/api/submit-testimonial', [TestimonyController::class, 'submitTestimonial']);
Route::get('testimonial-form', function () {
        return Inertia::render('user/TestimonialForm');
    })->name('testimonialform');


// Route::post('/api/submit-message', [UserController::class, 'createContact']);
Route::post('/api/submit-message', [ContactController::class, 'createContact']);

// Route::get('/messages', [ContactController::class, 'createMessage'])->name('messages.createMessage');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

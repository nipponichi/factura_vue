<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OfCustomerController;
use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;


// Not authenticated routes
Route::get('/', [RouteController::class, 'index']);

// Authenticated routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [RouteController::class, 'dashboard'])->name('dashboard');
    Route::resource('/companies', CompanyController::class);
    Route::resource('/customers', CustomerController::class);
    Route::resource('/invoices', InvoiceController::class);
    Route::resource('/products', ProductController::class);
    Route::resource('/customers/ofCustomers', OfCustomerController::class);
});

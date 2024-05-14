<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PhoneController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\AdminController;
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
    Route::resource('/customer', CustomerController::class);
    Route::get('/customers/{id}', [CustomerController::class, 'index']);
    Route::get('/phones/{id}', [PhoneController::class, 'index']);
    Route::resource('/phone', PhoneController::class);
    Route::resource('/invoices', InvoiceController::class);
    Route::resource('/products', ProductController::class);
    Route::resource('/admin', AdminController::class);
    Route::get('/has-company', [CompanyController::class, 'hasCompany'])->name('companies.hasCompany');
});

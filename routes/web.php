<?php

use App\Http\Controllers\AdminCompaniesController;
use App\Http\Controllers\AdminProductsController;
use App\Http\Controllers\AdminInvoicesController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PhoneController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\DocumentController;
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
    Route::get('/companies-invoice', [CompanyController::class, 'companiesInvoice']);
    Route::resource('/customer', CustomerController::class);
    Route::get('/customers/{id}', [CustomerController::class, 'index']);
    Route::get('/customers/{companyID}/{customerID}', [CustomerController::class, 'show']);
    Route::put('/phones/{id}', [PhoneController::class, 'makeFavourite']);
    Route::get('/phones/{id}', [PhoneController::class, 'index']);
    Route::resource('/phone', PhoneController::class);
    Route::put('/emails/{id}', [EmailController::class, 'makeFavourite']);
    Route::get('/emails/{id}', [EmailController::class, 'index']);
    Route::resource('/email', EmailController::class);
    Route::put('/addresses/{id}', [AddressController::class, 'makeFavourite']);
    Route::get('/addresses/{id}', [AddressController::class, 'index']);
    Route::resource('/address', AddressController::class);
    Route::get('/has-company', [CompanyController::class, 'hasCompany'])->name('companies.hasCompany');
    Route::resource('/documents', DocumentController::class);
    Route::get('/documents-type', [DocumentController::class, 'documentType']);
    Route::get('/documents-serie/{typeID}/{companyID}', [DocumentController::class, 'documentSerie']);
    Route::get('/documents-serie/{typeID}/{companyID}/{serie}', [DocumentController::class, 'documentSerieCheck']);

    // Admin
    Route::resource('/admin-companies', AdminCompaniesController::class);
    Route::resource('/admin-products', AdminProductsController::class);
    Route::resource('/admin-invoices', AdminInvoicesController::class);
    Route::resource('/admin-users', AdminUsersController::class);
    Route::put('/admin-users-pass/{id}', [AdminUsersController::class, 'resetPass']);
    Route::get('/admin-reload-users', [AdminUsersController::class, 'reload']);
    Route::get('/admin-reload-companies', [AdminCompaniesController::class, 'reload']);
    
});

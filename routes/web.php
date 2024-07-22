<?php

use App\Http\Controllers\AdminCompaniesController;
use App\Http\Controllers\AdminProductsController;
use App\Http\Controllers\AdminInvoicesController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PhoneController;
use App\Http\Controllers\AccountingController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\LogController;
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

    //Companies
    Route::resource('/companies', CompanyController::class);
    Route::get('/companies-invoice', [CompanyController::class, 'companiesInvoice']);
    Route::get('/has-company', [CompanyController::class, 'hasCompany'])->name('companies.hasCompany');
    Route::get('/companies/{documentId}{date}', [DocumentController::class, 'fromBudgetToInvoice']);
    Route::get('/companies/{companyID}/document/{documentID}', [DocumentController::class, 'show']);
    Route::get('/companies/{companyID}/customer/{customerID}', [CustomerController::class, 'show']);
    Route::get('/companies/{companyID}/provider/{customerID}', [ProviderController::class, 'show']);

    // Accounting
    Route::resource('/accountings', AccountingController::class);

    // Warehouse
    Route::resource('/warehouses', WarehouseController::class);

    //Customers
    Route::resource('/customer', CustomerController::class);
    Route::get('/customers/{id}', [CustomerController::class, 'index']);

    //Providers
    Route::resource('/provider', ProviderController::class);
    Route::get('/providers/{id}', [ProviderController::class, 'index']);
    
    //Phones
    Route::put('/phones/{id}', [PhoneController::class, 'makeFavourite']);
    Route::get('/phones/{id}', [PhoneController::class, 'index']);
    Route::resource('/phone', PhoneController::class);

    //Emails
    Route::put('/emails/{id}', [EmailController::class, 'makeFavourite']);
    Route::get('/emails/{id}', [EmailController::class, 'index']);
    Route::resource('/email', EmailController::class);

    //Bank account
    Route::put('/banks/{id}', [BankController::class, 'makeFavourite']);
    Route::get('/banks/{id}', [BankController::class, 'index']);
    Route::resource('/bank', BankController::class);

    //Addresses
    Route::put('/addresses/{id}', [AddressController::class, 'makeFavourite']);
    Route::get('/addresses/{id}', [AddressController::class, 'index']);
    Route::resource('/address', AddressController::class);

    // Payment Methods
    Route::resource('/payment', PaymentMethodController::class);

    //Documents
    Route::resource('/documents', DocumentController::class);
    Route::get('/expense', [DocumentController::class, 'indexExpense'])->name('indexExpense');
    Route::get('/documents-type', [DocumentController::class, 'documentType']);
    Route::get('/documents-show/{companyId}/{documentId}', [DocumentController::class, 'show']);
    Route::get('/documents-serie/{typeID}/{companyID}', [DocumentController::class, 'documentSerie']);
    Route::get('/documents-serie/{typeID}/{companyID}/{serie}', [DocumentController::class, 'documentSerieCheck']);
    Route::get('/documents-series/{companyID}/{typeID}', [DocumentController::class, 'documentDateCheck']);
    Route::get('/documents-serie/{companyID}', [DocumentController::class, 'indexDocuments']);
    Route::post('/documents-serie/{documentID}/{date}', [DocumentController::class, 'fromBudgetToInvoice']);
    Route::post('/documents-sign', [DocumentController::class, 'documentSing']);
    Route::get('/documents-signed/{documentId}', [DocumentController::class, 'downloadSignedXML']);


    // Admin
    Route::resource('/admin-companies', AdminCompaniesController::class);
    Route::resource('/admin-products', AdminProductsController::class);
    Route::resource('/admin-invoices', AdminInvoicesController::class);
    Route::resource('/admin-users', AdminUsersController::class);
    Route::put('/admin-users-pass/{id}', [AdminUsersController::class, 'resetPass']);
    Route::get('/admin-reload-users', [AdminUsersController::class, 'reload']);
    Route::get('/admin-reload-companies', [AdminCompaniesController::class, 'reload']);
    
    //Logs
    Route::get('/logs', [LogController::class, 'index']);

});

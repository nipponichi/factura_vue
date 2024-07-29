<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProviderRequest;
use App\Http\Requests\ProviderHeadRequest;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccountingController extends Controller
{

    public function __construct()
    {

        $this->middleware(['can:read accounting'])->only(['index', 'show']);
        $this->middleware(['can:create accounting'])->only(['create', 'store']);
        $this->middleware(['can:update accounting'])->only(['edit', 'update']);
        $this->middleware(['can:delete accounting'])->only('destroy');
    }


    public function index()
    {
        try {
            // Obtiene el ID del usuario autenticado
            $userId = Auth::id();

            $companies = DB::table('companies')
                ->select(
                    'companies.id',
                    'companies.dt_end',
                    'companies_names.name',
                    
                )
                ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
                ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
                ->where('companies_users.user_id', $userId)
                ->whereNull('companies_users.dt_end')
                ->whereNull('companies_names.dt_end')
                ->get();

            return Inertia::render('Accounting/TableAccounting', ['companies' => $companies]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading accounting', 'type' => 'error']);
        }
    }

    public function show($companyId)
    {

        try{
            
            $emittedDocuments = DB::table('documents')
            ->select(
                'documents.id',
                'documents.number',
                'documents.company_id_customer',
                'documents.documents_type_id',
                'documents.documents_series_id',
                'documents.payment_methods_id',
                'documents.date',
                'documents.amount',
                'documents.subtotal',
                'documents.tax',
                'documents.paid',
                'documents.expiration',
                'documents.invoiced',
                'documents.active',
                'documents.isReceived',
                'documents_type.name as document_type_name',
                'documents_series.serie as document_series_serie',
                'companies_names.name as customer_name'
            )
            ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
            ->leftJoin('documents_series', 'documents.documents_series_id', '=', 'documents_series.id')
            ->leftJoin('companies_names', 'documents.company_id_customer', '=', 'companies_names.company_id')
            ->where('documents.company_id_company', $companyId)
            ->where('documents_series.company_id', $companyId)
            ->whereNull('documents.dt_end')
            ->whereNull('companies_names.dt_end')
            ->get();


            $receivedDocuments = DB::table('documents')
            ->select(
                'documents.id',
                'documents.number',
                'documents.company_id_company',
                'documents.documents_type_id',
                'documents.payment_methods_id',
                'documents.date',
                'documents.amount',
                'documents.subtotal',
                'documents.tax',
                'documents.paid',
                'documents.expiration',
                'documents.invoiced',
                'documents.active',
                'documents.isReceived',
                'documents_type.name as document_type_name',
                'companies_names.name as customer_name'
            )
            ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
            ->leftJoin('companies_names', 'documents.company_id_company', '=', 'companies_names.company_id')
            ->where('documents.company_id_customer', $companyId)
            ->whereNull('documents.dt_end')
            ->whereNull('companies_names.dt_end')
            ->get();
            
            // Convert collections to arrays
            $emittedDocumentsArray = $emittedDocuments->toArray();
            $receivedDocumentsArray = $receivedDocuments->toArray();

            // Merge arrays
            $documents = array_merge($emittedDocumentsArray, $receivedDocumentsArray);
                    
            return response()->json(['message' => 'Documents uploaded', 'documents' => $documents]);
        
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error loading accounting', 'type' => 'error']);
        }
        
    }

}

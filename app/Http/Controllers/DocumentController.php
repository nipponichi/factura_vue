<?php

namespace App\Http\Controllers;
use App\Http\Requests\DocumentRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Redirect;

class DocumentController extends Controller
{

    public function __construct()
    {

        $this->middleware(['can:read company'])->only(['index', 'show','indexDocuments','documentType','documentSerieCheck','documentSerie']);
        $this->middleware(['can:create company'])->only(['create', 'store']);
        $this->middleware(['can:update company'])->only(['edit', 'update']);
        $this->middleware(['can:delete company'])->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Documents/Index');
    }

    //Saca los tipos de documentos para empresa
    public function documentType()
    {
        $types = DB::table('documents_type')
        ->select('id','name')
        ->get();

        return response()->json(['message' => 'Document types', 'types' => $types]);
    }

    //Saca la serie del documento elegido
    public function documentSerie($type_id,$company_id)
    {
        $series = DB::table('documents_series')
        ->select('id','serie','number')
        ->where('documents_type_id',$type_id)
        ->where('company_id',$company_id)
        ->whereNull('dt_end')
        ->get();


        foreach ($series as $serie) {
            $serie->number += 1;
        }
        
        return response()->json(['message' => 'Document series', 'series' => $series]);
    }

    // Trae fecha y numero de documento para comprobar si existe uno posterior al que se quiere guardar
    public function documentSerieCheck($type_id,$company_id,$serie)
    {

        $serie = DB::table('documents_series')
        ->select('number')
        ->where('documents_type_id',$type_id)
        ->where('company_id',$company_id)
        ->where('serie',$serie)
        ->whereNull('dt_end')
        ->first();

        $date = DB::table('documents')
        ->select('date')
        ->where('documents_type_id', $type_id)
        ->where('company_id_company', $company_id)
        ->whereNull('dt_end')
        ->orderBy('date', 'desc')
        ->first();

        $counter = DB::table('documents')
        ->select('document_counter')
        ->where('documents_type_id', $type_id)
        ->where('company_id_company', $company_id)
        ->whereNull('dt_end')
        ->orderByDesc('document_counter')
        ->first();

        if ($date == null) {
            $date = today()->format('d/m/Y');
        }
        
        
        return response()->json(['message' => 'Document series', 'serie' => $serie, 'date' => $date, 'counter' => $counter]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DocumentRequest $request)
    {
        
        DB::beginTransaction();
        
        try {

            $userId = Auth::id();

            $repatedInvoice = DB::table('documents')
            ->select('id')
            ->where('number',$request->documentData['number'])
            ->whereNull('dt_end')
            ->first();

            if($repatedInvoice) {
                return response()->json(['message' => 'El número de factura ya existe, puedes modificarla desde el listado de facturas']);
            }


            $documentsId = DB::table('documents')->insertGetId([
                'number' => $request->documentData['number'],
                'document_counter' => $request->documentData['document_counter'],
                'company_id_company' => $request->documentData['company_id_company'],
                'company_id_customer' => $request->documentData['company_id_customer'],
                'documents_series_id' => $request->documentData['documents_series_id'],
                'documents_type_id' => $request->documentData['documents_type_id'],
                'date' => $request->documentData['date'],
                'amount' => $request->documentData['amount'],
                'paid' => $request->documentData['paid'],
                'active' => true,
                'tax' => $request->documentData['totalTax'],
                'subtotal' => $request->documentData['subTotal'],
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);

            

            foreach ($request->documentData['concept'] as $item) {
                DB::table('documents_details')->insert([
                    'reference' => $item['reference'],
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'tax' => $item['tax'],
                    'price' => $item['price'],
                    'total' => $item['total'],
                    'documents_id' => $documentsId
                ]);
            }

            $oldInvoiceSerieNumber = DB::table('documents_series')
            ->select('number')
            ->where('company_id',$request->documentData['company_id_company'])
            ->where('documents_type_id',$request->documentData['documents_type_id'])
            ->whereNull('dt_end')
            ->first();

            if ($oldInvoiceSerieNumber->number > $request->documentData['document_counter']) {
            
                return response()->json(['message' => 'La factura se ha creado correctamente']);

            }
        
            
            DB::table('documents_series')
            ->where('company_id', $request->documentData['company_id_company'])
            ->where('documents_type_id', $request->documentData['documents_type_id'])
            ->increment('number');

            DB::commit();

            return response()->json(['message' => 'La factura se ha creado correctamente']);

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la factura ', $e->getMessage()], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show($companyId, $documentId)
    {

        $userId = Auth::id();


        $invoiceUser = DB::table('companies_users')
        ->select('user_id')
        ->where('company_id', $companyId)
        ->first();

        if ($invoiceUser == null) {
            return Redirect::to('/dashboard')->with('error', 'No se encontró la factura');
        }
        
        if ($userId != $invoiceUser->user_id) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }

        $documents = DB::table('documents')
        ->select(
            'documents.id',
            'documents.number',
            'documents.document_counter',
            'documents.company_id_customer',
            'documents.documents_type_id',
            'documents.documents_series_id',
            'documents.date',
            'documents.amount',
            'documents.paid',
            'documents.active',
            'documents_type.name as document_type_name',
            'documents_series.serie as document_series_serie',
            'companies_names.name as customer_name'
        )
        ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
        ->leftJoin('documents_series', 'documents.documents_series_id', '=', 'documents_series.id')
        ->leftJoin('companies_names', 'documents.company_id_customer', '=', 'companies_names.company_id')
        ->where('documents.company_id_company', $companyId)
        ->where('documents_series.company_id', $companyId)
        ->where('documents.id', $documentId)
        ->whereNull('documents.dt_end')
        ->first();
        
        if ($documents == null) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }
    
        $concepts = DB::table('documents_details')
        ->select(
            'reference',
            'id',
            'description',
            'quantity',
            'tax',
            'price',
            'total',
        )
        ->whereNull('dt_end')
        ->where('documents_id',$documentId)
        ->get();

        if ($concepts == null) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }

        $company = DB::table('companies')
        ->select(
            'companies.id',
            'companies.dt_end',
            'companies_tax_numbers.tax_number',
            'companies_names.name',
            'emails.email',
            'phones.phone',
            'addresses.country',
            'addresses.town',
            'addresses.post_code',
            'addresses.province',
            'addresses.address',
        )
        ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
        ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
        ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
        ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
        ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
        ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')
        ->where('companies.id', $companyId)
        ->where('companies_users.user_id', $userId)
        ->first();

        if ($company == null) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }

        $customer = DB::table('companies')
        ->select(
            'companies.id',
            'companies.dt_end',
            'companies_tax_numbers.tax_number',
            'companies_names.name',
            'emails.email',
            'phones.phone',
            'addresses.country',
            'addresses.town',
            'addresses.post_code',
            'addresses.province',
            'addresses.address'
        )
        ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
        ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
        ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
        ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
        ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
        ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')
        ->where('companies.id', $documents->company_id_customer)
        ->first();
        
        if ($customer == null) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }

        return Inertia::render('Companies/Documents/DocumentEdit', ['documents' => $documents, 'concepts' => $concepts, 'company'=>$company, 'customer'=>$customer]);
    }
    

    public function indexDocuments($id)
    {

        $documents = DB::table('documents')
        ->select(
            'documents.id',
            'documents.number',
            'documents.company_id_customer',
            'documents.documents_type_id',
            'documents.documents_series_id',
            'documents.date',
            'documents.amount',
            'documents.paid',
            'documents.active',
            'documents_type.name as document_type_name',
            'documents_series.serie as document_series_serie',
            'companies_names.name as customer_name'
        )
        ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
        ->leftJoin('documents_series', 'documents.documents_series_id', '=', 'documents_series.id')
        ->leftJoin('companies_names', 'documents.company_id_customer', '=', 'companies_names.company_id')
        ->where('documents.company_id_company', $id)
        ->where('documents_series.company_id', $id)
        ->whereNull('documents.dt_end')
        ->get();

        return response()->json(['message' => 'La factura se ha creado correctamente', 'documents'=>$documents]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DocumentRequest $request, string $id)
    {
        
        DB::beginTransaction();
        
        try {

            $userId = Auth::id();

            $invoiceUser = DB::table('companies_users')
            ->select('user_id')
            ->where('company_id', $request->documentData['company_id_company'])
            ->first();
    
            if ($invoiceUser == null) {
                return Redirect::to('/dashboard')->with('error', 'No se encontró la factura');
            }
            
            if ($userId != $invoiceUser->user_id) {
                return Redirect::to('companies/' . $request->documentData['company_id_company'])->with('error', 'No se encontró la factura');
            }
            
            // comprobar tipo documento para actualizar el counter si hay cambios en el tipo

            $oldInvoiceTypeId = DB::table('documents')
            ->select('documents_type_id')
            ->where('id', $id)
            ->first();
            
            if ($oldInvoiceTypeId->documents_type_id != $request->documentData['documents_type_id']) {
                $companyTypeCounter = DB::table('documents')
                    ->where('documents_type_id', $request->documentData['documents_type_id'])
                    ->orderByDesc('document_counter')
                    ->value('document_counter');
            
                // Si no hay documentos previos, inicializar el contador a 0
                if (is_null($companyTypeCounter)) {
                    $companyTypeCounter = 0;
                }
            
                $documentData = $request->documentData;
            
                $documentData['document_counter'] = $companyTypeCounter + 1;
            
                $request->merge(['documentData' => $documentData]);

                DB::table('documents_series')
                ->where('company_id', $request->documentData['company_id_company'])
                ->where('documents_type_id', $request->documentData['documents_type_id'])
                ->increment('number');

            }


            $documentsId = DB::table('documents')->insertGetId([
                'number' => $request->documentData['number'],
                'document_counter' => $request->documentData['document_counter'],
                'company_id_company' => $request->documentData['company_id_company'],
                'company_id_customer' => $request->documentData['company_id_customer'],
                'documents_series_id' => $request->documentData['documents_series_id'],
                'documents_type_id' => $request->documentData['documents_type_id'],
                'date' => $request->documentData['date'],
                'amount' => $request->documentData['amount'],
                'paid' => $request->documentData['paid'],
                'active' => true,
                'tax' => $request->documentData['totalTax'],
                'subtotal' => $request->documentData['subTotal'],
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);



            foreach ($request->documentData['concept'] as $item) {
                DB::table('documents_details')->insert([
                    'reference' => $item['reference'],
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'tax' => $item['tax'],
                    'price' => $item['price'],
                    'total' => $item['total'],
                    'documents_id' => $documentsId
                ]);
            }
        
            DB::table('documents')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);

            DB::table('documents_details')
                ->where('documents_id', $id)
                ->update([
                    'dt_end' => now(),
            ]);

            DB::commit();

            return Inertia::render('Documents/Index');
            //return response()->json(['message' => 'La factura se ha creado correctamente']);

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la factura ', $e->getMessage()], 500);
        }
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::table('documents')
        ->where('id', $id)
        ->update([
            'dt_end' => now(),
        ]);

        return response()->json(['message' => 'La factura se ha eliminado correctamente']);
    }


    public function pdf() {

    }
}

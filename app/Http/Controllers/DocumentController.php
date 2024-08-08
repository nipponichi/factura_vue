<?php

namespace App\Http\Controllers;
use App\Http\Requests\DocumentRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class DocumentController extends Controller
{

    public function __construct()
    {
        
        // Middlewares para 'document income'
        $this->middleware(['can:read document income'])->only(['index', 'show','indexDocuments','documentType','documentSerieCheck','documentSerie','documentDateCheck','fromBudgetToInvoice', 'downloadSignedXML']);
        $this->middleware(['can:create document income'])->only(['create', 'store']);
        $this->middleware(['can:update document income'])->only(['edit', 'update', 'documentSign']);
        $this->middleware(['can:delete document income'])->only('destroy');

        // Middlewares para 'document expense'
        $this->middleware(['can:read document expense'])->only(['indexExpense']);



    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //El isChecked es para diferenciar que va a cargar si Facturas Recibidas o Emitidas
        return Inertia::render('Documents/Document', [
            'isChecked' => false,
        ]);
    }

    public function indexExpense()
    {
        //El isChecked es para diferenciar que va a cargar si Facturas Recibidas o Emitidas
        return Inertia::render('Documents/Document', [
            'isChecked' => true,
        ]);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(DocumentRequest $request)
    {

        DB::beginTransaction();
        
        try {

            $userId = Auth::id();

            // Buscamos si un documento coincide en tipo y numero con uno ya existente para la misma empresa
            $repeatedInvoice = DB::table('documents')
            ->select('id')
            ->where('number', $request->documentData['number'])
            ->where('documents_type_id', $request->documentData['documents_type_id'])
            ->where('company_id_company', $request->documentData['company_id_company'])
            ->whereNull('dt_end')
            ->first();

            

            if($repeatedInvoice) {
                
                // Asigna los conceptos en el detalle de factura
                DB::table('documents')
                ->where('id', $repeatedInvoice->id)
                ->update(['dt_end' => now()]);

                DB::table('documents_details')
                ->where('documents_id', $repeatedInvoice->id)
                ->update(['dt_end' => now()]);
                
            }

    

            // Guarda la nueva factura
            $documentsId = DB::table('documents')->insertGetId([
                'number' => $request->documentData['number'],
                'document_counter' => $request->documentData['document_counter'],
                'company_id_company' => $request->documentData['company_id_company'],
                'company_id_customer' => $request->documentData['company_id_customer'],
                'documents_series_id' => $request->documentData['documents_series_id'],
                'payment_methods_id' => $request->documentData['payment_methods_id'],
                'documents_type_id' => $request->documentData['documents_type_id'],
                'date' => $request->documentData['date'],
                'date_paid' => $request->documentData['date_paid'],
                'isReceived' => $request->documentData['isReceived'],
                'expiration' => $request->documentData['expiration'],
                'amount' => $request->documentData['amount'],
                'paid' => $request->documentData['paid'],
                'invoiced' => $request->documentData['invoiced'],
                'active' => true,
                'tax' => $request->documentData['totalTax'],
                'subtotal' => $request->documentData['subTotal'],
                'payment_system_id' => $request->documentData['payment_system_id'],
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);
        
            
            // Asigna los conceptos en el detalle de factura
            foreach ($request->documentData['concept'] as $item) {
                DB::table('documents_details')->insert([
                    'reference' => $item['reference'],
                    'description' => $item['description'],
                    'discount' => $item['discount'],
                    'discount_reason' => $item['discount_reason'],
                    'quantity' => $item['quantity'],
                    'tax' => $item['taxes'],
                    'price' => $item['price'],
                    'total' => $item['total'],
                    'documents_id' => $documentsId
                ]);
            }

            
            if(!$repeatedInvoice) {
                // Incrementa el contador de documentos en su respectivo tipo
                DB::table('documents_series')
                ->where('company_id', $request->documentData['company_id_company'])
                ->where('documents_type_id', $request->documentData['documents_type_id'])
                ->increment('number');
                
            }

            DB::commit();

            return response()->json(['message' => 'La factura se ha creado correctamente', 'documentId' => $documentsId]);

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
            return Redirect::to('documents/')->with('error', 'No se encontró la factura');
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
            'documents.payment_methods_id',
            'documents.documents_series_id',
            'documents.date',
            'documents.date_paid',
            'documents.expiration',
            'documents.amount',
            'documents.paid',
            'documents.invoiced',
            'documents.isReceived',
            'documents.active',
            'documents.payment_methods_id',
            'documents_type.name as document_type_name',
            'documents_series.serie as document_series_serie',
            'companies_names.name as customer_name',
            'documents.payment_system_id as payment_system_id',
            'payment_method.name'
        )
        ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
        ->leftJoin('documents_series', 'documents.documents_series_id', '=', 'documents_series.id')
        ->leftJoin('companies_names', 'documents.company_id_customer', '=', 'companies_names.company_id')
        ->leftJoin('payment_method', 'documents.payment_methods_id', '=', 'payment_method.id')
        ->where('documents.company_id_company', $companyId)
        ->where('documents_series.company_id', $companyId)
        ->where('documents.id', $documentId)
        ->whereNull('documents.dt_end')
        ->first();

        if ($documents == null) {
            $documents = DB::table('documents')
            ->select(
                'documents.id',
                'documents.number',
                'documents.document_counter',
                'documents.company_id_company',
                'documents.company_id_customer',
                'documents.documents_type_id',
                'documents.payment_methods_id',
                'documents.documents_series_id',
                'documents.isReceived',
                'documents.date',
                'documents.date_paid',
                'documents.expiration',
                'documents.amount',
                'documents.paid',
                'documents.invoiced',
                'documents.active',
                'documents.payment_methods_id',
                'documents_type.name as document_type_name',
                'documents_series.serie as document_series_serie',
                'companies_names.name as customer_name',
                'documents.payment_system_id as payment_system_id',
                'payment_method.name'
            )
            ->leftJoin('documents_type', 'documents.documents_type_id', '=', 'documents_type.id')
            ->leftJoin('documents_series', 'documents.documents_series_id', '=', 'documents_series.id')
            ->leftJoin('companies_names', 'documents.company_id_company', '=', 'companies_names.company_id')
            ->leftJoin('payment_method', 'documents.payment_methods_id', '=', 'payment_method.id')
            ->where('documents.id', $documentId)
            ->whereNull('documents.dt_end')
            ->first();
        }

        
        switch ($documents->payment_methods_id) {
            case 1:
            case 7:
                $payment_system = DB::table('bank_account')
                ->select('id','complete_bank_account', 'bank_name')
                ->where('id',$documents->payment_system_id)
                ->first();
                break;
            
            case 3:
                $payment_system = DB::table('phones')
                ->select('id','phone')
                ->where('id',$documents->payment_system_id)
                ->first();
                break;
        
            case 4:
                $payment_system = DB::table('emails')
                ->select('id','email')
                ->where('id',$documents->payment_system_id)
                ->first();
                break;
                        
            default:
                $payment_system = '';
                break;
        }


        if ($documents == null) {
            return Redirect::to('companies/' . $companyId)->with('error', 'No se encontró la factura');
        }
    
        $concepts = DB::table('documents_details')
        ->select(
            'reference',
            'id',
            'description',
            'discount',
            'discount_reason',
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

        if ($documents->isReceived) {
            $documents->company_id_customer = $documents->company_id_company;
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
        return response()->json(['message' => 'Datos de las facturas cargadas correctamente', 'documents' => $documents, 'concepts' => $concepts, 'company'=>$company, 'customer'=>$customer, 'payment_system'=>$payment_system]);
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
                'invoiced' => $request->documentData['invoiced'],
                'active' => true,
                'tax' => $request->documentData['totalTax'],
                'subtotal' => $request->documentData['subTotal'],
                'payment_system_id' => $request->documentData['payment_system_id'],
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);



            foreach ($request->documentData['concept'] as $item) {
                DB::table('documents_details')->insert([
                    'reference' => $item['reference'],
                    'description' => $item['description'],
                    'discount' => $item['discount'],
                    'discount_reason' => $item['discount_reason'],
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

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la factura ', $e->getMessage()], 500);
        }
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {

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
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error deleting.','type' => 'error']);
        }
    }
    

    //Saca los tipos de documentos para empresa
    public function documentType()
    {
        $types = DB::table('documents_type')
        ->select('id','name')
        ->get();

        return response()->json(['message' => 'Document types', 'types' => $types]);
    }

    public function documentDateCheck($company_id, $type_id)
    {

        $date = DB::table('documents')
        ->select('date')
        ->where('documents_type_id', $type_id)
        ->where('company_id_company', $company_id)
        ->whereNull('dt_end')
        ->orderBy('date', 'desc')
        ->first();

        if ($date == null) {
            $date = today()->format('d/m/Y');
        }
        
    
        return response()->json(['message' => 'Document series', 'date' => $date]);

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
        
        return response()->json(['message' => 'Document series1', 'series' => $series]);
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
        
    
        return response()->json(['message' => 'Document series check', 'serie' => $serie, 'date' => $date, 'counter' => $counter]);

    }



    public function fromBudgetToInvoice ($documentId, $date)
    {
        
        DB::beginTransaction();
        
        try {

            $userId = Auth::id();
            
            $document = DB::table('documents')
            ->select('company_id_company','company_id_customer','documents_series_id', 'amount', 'tax', 'subtotal')
            ->where('id', $documentId)
            ->first();

            $concepts = DB::table('documents_details')
            ->select('reference','description', 'quantity', 'tax', 'price', 'total')
            ->where ('documents_id', $documentId)
            ->get();

            // Traemos la serie del documentp
            $serie = DB::table('documents_series')
            ->select('serie')
            ->where('id',$document->documents_series_id)
            ->where('company_id', $document->company_id_company)
            ->whereNull('dt_end')
            ->first();

            // Trae el numero de factura segun la serie del presupuesto
            $documentSerie = DB::table('documents_series')
            ->select('id','number')
            ->where('serie',$serie->serie)
            ->where('documents_type_id', 1)
            ->first();

            ++$documentSerie->number;

            $number = $serie->serie.$documentSerie->number;

            // Guarda la nueva factura
            $documentsId = DB::table('documents')->insertGetId([
                'number' => $number,
                'document_counter' => $documentSerie->number,
                'company_id_company' => $document->company_id_company,
                'company_id_customer' => $document->company_id_customer,
                'documents_series_id' => $documentSerie->id,
                'documents_type_id' => 1,
                'date' => $date,
                'amount' => $document->amount,
                'paid' => false,
                'active' => true,
                'tax' => $document->tax,
                'subtotal' => $document->subtotal,
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);
            
            // Asigna los conceptos en el detalle de factura
            foreach ($concepts as $item) {
                DB::table('documents_details')->insert([
                    'reference' => $item->reference,
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'tax' => $item->tax,
                    'price' => $item->price,
                    'discount' => $item->discount,
                    'discount_reason' => $item->discount_reason,
                    'total' => $item->total,
                    'documents_id' => $documentsId,
                    'dt_start' => now()
                ]);
            }

            // Incrementa el contador de documentos en su respectivo tipo
            DB::table('documents_series')
            ->where('company_id', $document->company_id_company)
            ->where('documents_type_id', 1)
            ->increment('number');

            // Marca el documento como facturado
            DB::table('documents')
            ->where('company_id', $document->company_id_company)
            ->where('documents_id', $documentId)
            ->update(['invoiced' => true]);

            DB::commit();

            return response()->json(['message' => 'La factura se ha creado correctamente']);

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la factura ', $e->getMessage()], 500);
        }
        
    }

    public function documentSign(Request $request){

        DB::beginTransaction();
        
        try {

            $userId = Auth::id();
            
            $invoiceUser = DB::table('companies_users')
            ->select('user_id')
            ->where('company_id', $request->datasing['company_id'])
            ->first();

            if ($invoiceUser == null) {
                return Redirect::to('/dashboard')->with('error', 'No se encontró la factura');
            }

            if ($userId != $invoiceUser->user_id) {
                return Redirect::to('companies/' . $request->datasing['company_id'])->with('error', 'No se encontró la factura');
            }
            
            $b64 = base64_encode($request->datasing['document_data']);
            $blob = tempnam(sys_get_temp_dir(), 'upload');
            file_put_contents($blob, $request->datasing['document_data']);
            // Cambiar el tipo de hash en caso de tener que cambiarlo
            $hash = hash_file('sha256', $blob);

            DB::table('documents')
                ->where('id', $request->datasing['document_id'])
                ->whereNull('dt_end')
                ->update([
                'user_who_modified' => $userId,
                'document_hash' => $hash,
                'document_base64' => $b64,
                'document_blob' => $blob
            ]);

            DB::commit();

            return response()->json(['message' => 'Factura firmada correctamente']);

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la factura ', $e->getMessage()], 500);
        }

    }
    public function downloadSignedXML($documentId){

        try {

            $userId = Auth::id();

            $document = DB::table('documents')
            ->select('document_blob', 'company_id_company','number')
            ->where('id', $documentId)
            ->first();

            $invoiceUser = DB::table('companies_users')
            ->select('user_id')
            ->where('company_id', $document->company_id_company)
            ->first();

            if ($invoiceUser == null) {
                return Redirect::to('/dashboard')->with('error', 'No se encontró la factura');
            }

            if ($userId != $invoiceUser->user_id) {
                return Redirect::to('companies/' . $document->company_id_company->with('error', 'No se encontró la factura'));
            }
            
            $today = date("Ymd");
        
            
            if (file_exists($document->document_blob)) {
                $blob = fopen($document->document_blob, 'r');
                //$blobContent = stream_get_contents($blob);
                fclose($blob);
            } else {
                return Redirect::to('/dashboard')->with('error', 'No se pudo encontrar el archivo especificado');
            }

            return response($blob, 200)
                ->header('Content-Type', 'application/xml')
                ->header('Content-Disposition', 'attachment; filename="'. $today ."_". $document->number.'".xml"');
        
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error al cargar la factura ', $e->getMessage()], 500);
        }
    }

    
    public function indexDocuments($id)
    {

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
            'documents.paid',
            'documents.expiration',
            'documents.dt_updated',
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
        ->where('documents.company_id_company', $id)
        ->where('documents_series.company_id', $id)
        ->whereNull('documents.dt_end')
        ->whereNull('companies_names.dt_end')
        ->orderBy('documents.dt_updated', 'desc')
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
            'documents.dt_updated',
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
        ->where('documents.company_id_customer', $id)
        ->whereNull('documents.dt_end')
        ->whereNull('companies_names.dt_end')
        ->orderBy('documents.dt_updated', 'desc')
        ->get();

        // Convert collections to arrays
        $emittedDocumentsArray = $emittedDocuments->toArray();
        $receivedDocumentsArray = $receivedDocuments->toArray();

        // Merge arrays
        $documents = array_merge($emittedDocumentsArray, $receivedDocumentsArray);


        return response()->json(['message' => 'Datos de las facturas cargadas correctamente', 'documents'=>$documents]);

    }

}

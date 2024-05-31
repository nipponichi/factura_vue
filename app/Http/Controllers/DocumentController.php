<?php

namespace App\Http\Controllers;
use App\Http\Requests\DocumentRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;
class DocumentController extends Controller
{

    public function __construct()
    {

        $this->middleware(['can:read company'])->only(['index', 'show','documentSerie','documentType','documentSerieCheck']);
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

    public function documentType()
    {
        $types = DB::table('documents_type')
        ->select('id','name')
        ->get();

        return response()->json(['message' => 'Document types', 'types' => $types]);
    }

    public function documentSerie($type_id,$company_id)
    {
        $series = DB::table('documents_series')
        ->select('id','serie','number')
        ->where('documents_type_id',$type_id)
        ->where('company_id',$company_id)
        ->get();

        // Incrementar el número en cada serie
        foreach ($series as $serie) {
            $serie->number += 1;
        }
        
        return response()->json(['message' => 'Document series', 'series' => $series]);
    }

    public function documentSerieCheck($type_id,$company_id,$serie)
    {

        $serie = DB::table('documents_series')
        ->select('number')
        ->where('documents_type_id',$type_id)
        ->where('company_id',$company_id)
        ->where('serie',$serie)
        ->first();

        $date = DB::table('documents')
        ->select('date')
        ->where('company_id_company', $company_id)
        ->orderBy('date', 'desc')
        ->first();
    
        return response()->json(['message' => 'Document series', 'serie' => $serie, 'date' => $date]);

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
            ->first();

            if($repatedInvoice) {
                return response()->json(['message' => 'El número de factura ya existe, puedes modificarla desde el listado de facturas']);
            }


            $documentsId = DB::table('documents')->insertGetId([
                'number' => $request->documentData['number'],
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
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'tax' => $item['tax'],
                    'price' => $item['price'],
                    'total' => $item['total'],
                    'documents_id' => $documentsId
                ]);
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
    public function show(string $id)
    {
       $documents = DB::table('documents')
        ->select(
            'id',
            'number',
            'company_id_customer',
            'documents_type_id',
            'documents_series_id',
            'date',
            'amount',
            'paid',
            'active'
            )
            ->where('company_id_company',$id)
            ->get();

        $documents_types = DB::table('documents_type')
        ->select(
            'documents_type.id',
            'documents_type.name',
            )
            ->get();

        $documents_series = DB::table('documents_series')
        ->select(
            'id',
            'serie',
            )
            ->where('company_id',$id)
            ->get();
    
            return response()->json(['message' => 'La factura se ha creado correctamente', 'documents'->$documents, 'documents_type'->$documents_types, 'documents_series'->$documents_series]);
    }


    public function showDocumentSeries(string $id)
    {


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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

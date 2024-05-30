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

        $this->middleware(['can:read company'])->only(['index', 'show','documentSerie','documentType']);
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
        $userId = Auth::id();

        try {
            
            DB::table('invoice')->insert([
                'number' => $request->number,
                'company_id_company' => $request->company_id_company,
                'company_id_customer' => $request->company_id_customer,
                'documents_series_id' => $request->documents_series_id,
                'documents_type_id' => $request->documents_type_id,
                'date' => $request->date,
                'amount' => $request->amount,
                'paid' => $request->paid,
                'active' => true,
                'tax' => $request->amount,
                'subtotal' => $request->amount,
                'user_who_modified' => $userId,
                'dt_updated' => now(),
                'dt_start' => now(),
            ]);

            

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
        //
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

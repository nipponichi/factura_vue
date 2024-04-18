<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    

    public function index()
    {
        // Obtiene el ID del usuario autenticado
        //$userId = Auth::id();
        
        // Recupera las compañías asociadas al usuario actual
        $companies = Company::all();

        //$companies = Company::all();
        
        return Inertia::render('Companies/Index', ['companies' => $companies, 'type' => 'companies']);

    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        try {
        
            $user_id = Auth::id();
            $company = new Company($request->validated());
            $company->user_id = $user_id;
            $company->save();

            //return Inertia::render('Companies/Index');
            //return response()->json(['message' => 'La compañía se ha creado correctamente']);
            
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al crear la compañía: ' . $user_id. " log: " . $e->getMessage()], 500);
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
        $product = Company::findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
        $company = Company::findOrFail($id);
        $company->update($request->validated());
        return response()->json(['message' => 'Company updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        try {

            $company = Company::findOrFail($id);
            $company->delete();
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id]);
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id . $e->getMessage()], 500);
        }
    }
}

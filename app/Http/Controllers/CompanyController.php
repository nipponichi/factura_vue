<?php

namespace App\Http\Controllers;


use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Middleware\Authorize;


class CompanyController extends Controller
{
    
    public function __construct()
    {
        $this->middleware(['can:read roles']);   
    }
    

    public function index()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        

        // Recupera las compañías asociadas al usuario actual
        //$companies = Company::all();
        $companies = Company::where('user_id', $userId)->get();

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
            return response()->json(['message' => 'La compañía se ha creado correctamente', 'company' => $company]);
            
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        try {
            $company = Company::findOrFail($id);

            return Inertia::render('Companies/Show', ['company' => $company]);

        }catch (Exception $e) {
            
            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $product = Company::findOrFail($id);
            //return response()->json($product);
            return response()->json(['product' => $product]);
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al editar la compañía: ', $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
        try{
            $company = Company::findOrFail($id);
            $company->update($request->validated());
            return response()->json(['message' => 'Company updated successfully','company'=> $company]);
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al editar la compañía: ', $e->getMessage()], 500);
        }
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

    public function hasCompany()
    {
    $user_id = Auth::id();

    // Busca empresas relacionadas con el usuario actual
    $company = Company::where('user_id', $user_id)->get();


    // Si la colección de empresas está vacía, devuelve false, de lo contrario, devuelve true
    return $company->isEmpty() ? false : true;
    }

}

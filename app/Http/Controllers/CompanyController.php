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
    
    public function __construct()
    {
        $this->middleware(['can:read company'])->only('index'); 
        $this->middleware(['can:create company'])->only('create'); 
        $this->middleware(['can:create company'])->only('store');  
        $this->middleware(['can:read company'])->only('show'); 
        $this->middleware(['can:update company'])->only('edit');
        $this->middleware(['can:update company'])->only('update');
        $this->middleware(['can:delete company'])->only('destroy');
        
    }


    public function index()
    {
    // Obtiene el ID del usuario autenticado
    $userId = Auth::id();
    
    // Recupera las compañías asociadas al usuario actual con los detalles y el nombre registrado
    $companies = Company::where('user_id', $userId)
                    ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
                    ->join('companies_email_register', 'companies_detail.company_id', '=', 'companies_email_register.company_detail_id')
                    ->join('companies_phone_register', 'companies_detail.company_id', '=', 'companies_phone_register.company_detail_id')
                    ->join('companies_address_register', 'companies_detail.company_id', '=', 'companies_address_register.company_detail_id')
                    ->join('companies_province_register', 'companies_detail.company_id', '=', 'companies_province_register.company_detail_id')
                    ->join('companies_town_register', 'companies_detail.company_id', '=', 'companies_town_register.company_detail_id')
                    ->join('companies_post_code_register', 'companies_detail.company_id', '=', 'companies_post_code_register.company_detail_id')
                    ->join('companies_country_register', 'companies_detail.company_id', '=', 'companies_country_register.company_detail_id')
                    ->get();
        
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

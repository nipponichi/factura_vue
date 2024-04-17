<?php

namespace App\Http\Controllers;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
<<<<<<< Updated upstream
        $companies = Company::paginate(10);
        return inertia('Companies/Index', ['companies' => $companies]);
=======

        /*
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        
        // Recupera las compañías asociadas al usuario actual
        $companies = Company::where('user_id', $userId)->get();
        return Inertia::render('Companies/Index', ['company' => $companies]);
        
        */
        
        $companies = Company::all();
        return Inertia::render('Companies/Index', ['company' => $companies, 'type' => 'companies']);
    

>>>>>>> Stashed changes
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
    public function store(Request $request)
    {
        //
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
        // Encuentra la compañía por su ID
        $company = Company::findOrFail($id);
        
        // Elimina la compañía
        $company->delete();
        
        // Redirige a alguna parte apropiada de tu aplicación después de eliminar
        return redirect()->route('companies.index')->with('success', 'Compañía eliminada correctamente.');
    }
}

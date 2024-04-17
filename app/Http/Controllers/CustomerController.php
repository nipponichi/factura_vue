<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Customers/Index',  ['company' => $customers, 'type' => 'customers']);
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
    public function destroy($id)
    {
        // Encuentra la compañía por su ID
        $company = Customer::findOrFail($id);
        
        // Elimina la compañía
        $company->delete();
        
        // Redirige a alguna parte apropiada de tu aplicación después de eliminar
        return redirect()->route('customers.index')->with('success', 'Compañía eliminada correctamente.');
    }

}

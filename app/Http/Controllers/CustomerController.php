<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        
        // Recupera las compañías asociadas al usuario actual
        //$customers = Customer::where('customer_id', $userId)->get();

        $customers = Customer::all();
        return response()->json(['customers' => $customers]);
        //return Inertia::render('Customers/Index', ['customers' => $customers, 'type' => 'companies']);

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
    public function store(CustomerRequest $request)
    {
        try {
            
            $user_id = Auth::id();
            $customers = new Customer($request->validated());
            $customers->user_id = $user_id;
            $customers->save();

            //return Inertia::render('Companies/Index');
            return response()->json(['message' => 'Cliente se ha creado correctamente', 'customer' => $customers]);
            
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al crear el cliente: ', $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /*
        try {
            $customer = Customer::findOrFail($id);

            return Inertia::render('Companies/Show', ['customer' => $customer]);

        }catch (Exception $e) {
            
            return response()->json(['message' => 'Cliente no encontrado ', $e->getMessage()], 500);
        }
        */
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $product = Customer::findOrFail($id);
            //return response()->json($product);
            return response()->json(['product' => $product]);
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json(['message' => 'Error al editar el cliente: ', $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $request, string $id)
    {
        try{
            
            $company = Customer::findOrFail($id);
            //$company->update($request->validated());
            $company->company_id = '1';
            $company->name = $request->input('TestCompany');
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

            $customer = Customer::findOrFail($id);
            $customer->delete();
            
            return response()->json(['message' => 'Cliente eliminado: '. $id]);
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error al eliminiar el cliente: '. $id . $e->getMessage()], 500);
        }
    }
}

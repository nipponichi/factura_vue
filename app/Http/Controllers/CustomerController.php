<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
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


    public static function index()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();



        // Recupera las compañías asociadas al usuario actual con los detalles y el nombre registrado
        $companies = Company::select(
            'companies.id',
            'companies.taxNumber',
            'companies_detail.name',
            'companies_email_register.email',
            'companies_country_register.country',
            'companies_town_register.town',
            'companies_post_code_register.postCode',
            'companies_province_register.province',
            'companies_phone_register.phone',
            'companies_address_register.address'
        )
            ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->join('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->join('companies_addresses as addr_detail', 'companies_detail.company_id', '=', 'addr_detail.id')
            ->join('companies_town_register', 'addr_detail.company_town_register_id', '=', 'companies_town_register.id')
            ->join('companies_country_register', 'addr_detail.company_country_register_id', '=', 'companies_country_register.id')
            ->join('companies_province_register', 'addr_detail.company_province_register_id', '=', 'companies_province_register.id')
            ->join('companies_post_code_register', 'addr_detail.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->join('companies_address_register', 'addr_detail.company_address_register_id', '=', 'companies_address_register.id')
            ->join('companies_phone_address', 'addr_detail.id', '=', 'companies_phone_address.companies_addresses_id')
            ->join('companies_phone_register', 'companies_phone_address.companies_phone_register_id', '=', 'companies_phone_register.id')
            ->where('user_id', $userId)
            ->where('companies_phone_register.favorite', 1)
            ->where('companies_email_register.favorite', 1)
            ->where('addr_detail.favorite', 1)
            ->get();


        //return response()->json(['message' => 'Error al eliminiar la compañia: '. $companies]);
        return Inertia::render('Companies/Index', ['companies' => $companies]);

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
        DB::beginTransaction();

        try {

            // Insertar en la tabla companies
            $companyId = DB::table('companies')->insertGetId([
                'taxNumber' => $request->taxNumber,
                'dt_start' => now(),
                'user_id' => 1,
            ]);

            // Insertar en la tabla companies_detail
            $companyDetailId = DB::table('companies_detail')->insertGetId([
                'name' => $request->name,
                'dt_start' => now(),
                'company_id' => $companyId,
            ]);

            // Insertar en la tabla companies_email_register
            DB::table('companies_email_register')->insert([
                'email' => $request->email,
                'dt_start' => now(),
                'company_detail_id' => $companyDetailId,
            ]);


            DB::commit();

            return response()->json(['message' => 'La compañía se ha creado correctamente']);// Confirma la transacción si todas las operaciones son exitosas
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
        }



    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            // Obtener el usuario autenticado
            $userId = Auth::id();

            // Verificar si el usuario autenticado es propietario de la empresa
            $company = Company::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$company) {
                return Redirect::route('companies.index')->with('error', 'No se encontró la empresa');
            }
            $companies = Company::select(
                'companies.id',

                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_country_register.country',
                'companies_town_register.town',
                'companies_post_code_register.postCode',
                'companies_province_register.province',
                'companies_phone_register.phone',
                'companies_address_register.address'
            )
                ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
                ->join('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
                ->join('companies_addresses as addr_detail', 'companies_detail.company_id', '=', 'addr_detail.id')
                ->join('companies_town_register', 'addr_detail.company_town_register_id', '=', 'companies_town_register.id')
                ->join('companies_country_register', 'addr_detail.company_country_register_id', '=', 'companies_country_register.id')
                ->join('companies_province_register', 'addr_detail.company_province_register_id', '=', 'companies_province_register.id')
                ->join('companies_post_code_register', 'addr_detail.company_post_code_register_id', '=', 'companies_post_code_register.id')
                ->join('companies_address_register', 'addr_detail.company_address_register_id', '=', 'companies_address_register.id')
                ->join('companies_phone_address', 'addr_detail.id', '=', 'companies_phone_address.companies_addresses_id')
                ->join('companies_phone_register', 'companies_phone_address.companies_phone_register_id', '=', 'companies_phone_register.id')
                ->where('companies.id', $id)
                ->where('companies.user_id', $userId)
                ->where('companies_phone_register.favorite', 1)
                ->where('companies_email_register.favorite', 1)
                ->where('addr_detail.favorite', 1)
                ->first();

            return Inertia::render('Companies/Show', ['company' => $companies]);

        } catch (Exception $e) {

            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
        }


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {

            $companies = Company::where('companies.id', $id)
                ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
                ->join('companies_email_register', 'companies_detail.company_id', '=', 'companies_email_register.company_detail_id')
                ->join('companies_phone_register', 'companies_detail.company_id', '=', 'companies_phone_register.company_detail_id')
                ->join('companies_address_register', 'companies_detail.company_id', '=', 'companies_address_register.company_detail_id')
                ->join('companies_province_register', 'companies_detail.company_id', '=', 'companies_province_register.company_detail_id')
                ->join('companies_town_register', 'companies_detail.company_id', '=', 'companies_town_register.company_detail_id')
                ->join('companies_post_code_register', 'companies_detail.company_id', '=', 'companies_post_code_register.company_detail_id')
                ->join('companies_country_register', 'companies_detail.company_id', '=', 'companies_country_register.company_detail_id')
                ->first();



            return response()->json(['company' => $companies]);

        } catch (Exception $e) {

            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
        try {
            // Actualiza la compañía y devuelve el número de filas afectadas
            $company = Company::where('companies.id', $id)
                ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
                ->join('companies_email_register', 'companies_detail.company_id', '=', 'companies_email_register.company_detail_id')
                ->join('companies_phone_register', 'companies_detail.company_id', '=', 'companies_phone_register.company_detail_id')
                ->join('companies_address_register', 'companies_detail.company_id', '=', 'companies_address_register.company_detail_id')
                ->join('companies_province_register', 'companies_detail.company_id', '=', 'companies_province_register.company_detail_id')
                ->join('companies_town_register', 'companies_detail.company_id', '=', 'companies_town_register.company_detail_id')
                ->join('companies_post_code_register', 'companies_detail.company_id', '=', 'companies_post_code_register.company_detail_id')
                ->join('companies_country_register', 'companies_detail.company_id', '=', 'companies_country_register.company_detail_id')
                ->update([
                    'companies.taxNumber' => $request->taxNumber,
                    'companies_detail.name' => $request->taxNumber,
                    'companies_email_register.email' => $request->taxNumber,
                    'companies_phone_register.phone' => $request->taxNumber,
                    '.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,

                ]);

            if ($company === 0) {
                return response()->json([
                    'message' => 'No se encontró ninguna compañía con el ID proporcionado.'
                ], 404);
            }


        } catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json([
                'message' => 'Error al editar la compañía: ' . $request->taxNumber . '. ' . $e->getMessage()
            ], 500);
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

            return response()->json(['message' => 'Error al eliminiar la compañia: ' . $id]);
        } catch (Exception $e) {

            return response()->json(['message' => 'Error al eliminiar la compañia: ' . $id . $e->getMessage()], 500);
        }
    }

}
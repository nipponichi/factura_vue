<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CustomerRequest;
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

        $this->middleware(['can:read company'])->only(['index', 'show']);
        $this->middleware(['can:create company'])->only(['create', 'store']);
        $this->middleware(['can:update company'])->only(['edit', 'update']);
        $this->middleware(['can:delete company'])->only('destroy');
}


    public static function index(string $companyId)
    {
        try {

            $companies = Company::select(
                'companies.id',
                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_town_register.town',
                'companies_country_register.country',
                'companies_province_register.province',
                'companies_post_code_register.postCode',
                'companies_phone_register.phone',
                'companies_address_register.address'
            )
            ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
            ->leftJoin('companies_addresses as addr_detail', 'companies_detail.id', '=', 'addr_detail.id')
            ->leftJoin('companies_town_register', 'addr_detail.company_town_register_id', '=', 'companies_town_register.id')
            ->leftJoin('companies_country_register', 'addr_detail.company_country_register_id', '=', 'companies_country_register.id')
            ->leftJoin('companies_province_register', 'addr_detail.company_province_register_id', '=', 'companies_province_register.id')
            ->leftJoin('companies_post_code_register', 'addr_detail.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->leftJoin('companies_address_register', 'addr_detail.company_address_register_id', '=', 'companies_address_register.id')
            ->whereIn('companies.id', function ($query) use ($companyId) {
                $query->select('company_id_customer')
                    ->from('companies_customers')
                    ->where('company_id_company', $companyId)
                    ->where('dt_end', null);              

            })
            ->get();

            return response()->json(['message' => 'Companies: ', $companies], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index companies: ' . $e->getMessage()], 500);
        }
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
                'favorite' =>true,
                'dt_start' => now(),
                'company_detail_id' => $companyDetailId,
            ]);

            // Insertar en la tabla companies_phone_register
            DB::table('companies_phone_register')->insert([
                'phone' => $request->phone,
                'favorite' =>true,
                'dt_start' => now(),
                'company_detail_id' => $companyDetailId,
            ]);

            // Insertar en la tabla companies_email_register
            $companyAddressId = DB::table('companies_address_register')->insertGetId([
                'address' => $request->address,
                'dt_start' => now(),
            
            ]);

            // Insertar en la tabla companies_email_register
            $companyTownId = DB::table('companies_town_register')->insertGetId([
                'town' => $request->town,
                'dt_start' => now(),
                
            ]);

            // Insertar en la tabla companies_email_register
            $companyProvinceId = DB::table('companies_province_register')->insertGetId([
                'province' => $request->province,
                'dt_start' => now(),
                
            ]);

            $companyPostCodeId = DB::table('companies_post_code_register')->insertGetId([
                'postCode' => $request->postCode,
                'dt_start' => now(),
                
            ]);

            $companyCowntryId = DB::table('companies_country_register')->insertGetId([
                'country' => $request->country,
                'dt_start' => now(),
                
            ]);
            $companyAddressId = DB::table('companies_addresses')->insertGetId([
                'company_detail_id' => $companyDetailId,
                'company_address_register_id' => $companyAddressId,
                'company_town_register_id' => $companyTownId,
                'company_country_register_id' => $companyCowntryId,
                'company_province_register_id' => $companyProvinceId,
                'company_post_code_register_id' => $companyPostCodeId,
                'favorite' =>true,
                'dt_start' => now(),

            ]);

            DB::table('companies_customers')->insert([
                'company_id_company' => $request->companyID,
                'company_id_customer' => $companyId,
                'dt_start' => now(),
                
            ]);

            DB::commit();

            return response()->json(['message' => 'La compañía se ha creado correctamente']);
            // Confirma la transacción si todas las operaciones son exitosas
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

            $companies = Company::select(
                'companies.id',
                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_town_register.town',
                'companies_country_register.country',
                'companies_province_register.province',
                'companies_post_code_register.postCode',
                'companies_phone_register.phone',
                'companies_address_register.address'
            )
            ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->leftJoin('companies_addresses as addr_detail', 'companies_detail.id', '=', 'addr_detail.id')
            ->leftJoin('companies_town_register', 'addr_detail.company_town_register_id', '=', 'companies_town_register.id')
            ->leftJoin('companies_country_register', 'addr_detail.company_country_register_id', '=', 'companies_country_register.id')
            ->leftJoin('companies_province_register', 'addr_detail.company_province_register_id', '=', 'companies_province_register.id')
            ->leftJoin('companies_post_code_register', 'addr_detail.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->leftJoin('companies_address_register', 'addr_detail.company_address_register_id', '=', 'companies_address_register.id')
            ->leftJoin('companies_phone_address', 'addr_detail.id', '=', 'companies_phone_address.companies_addresses_id')
            ->leftJoin('companies_phone_register', 'companies_phone_address.companies_phone_register_id', '=', 'companies_phone_register.id')
            ->whereIn('companies.id', function ($query) use ($id) {
                $query->select('company_id_customer')
                    ->from('companies_customers')
                    ->where('company_id_company', $id);
            })
            ->get();
            
            
            return response()->json(['message' => 'Companies: ', $companies], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index companies: ' . $e->getMessage()], 500);
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
    public function update(CustomerRequest $request, string $id)
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
                    'taxNumber' => $request->taxNumber,
            
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
    
            DB::table('companies_customers')
                ->where('company_id_customer', $id)
                ->update([
                    'dt_end' => now(),
                ]);

    
            return response()->json(['message' => 'Se ha desactivado la compañía con éxito: ' . $id]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al desactivar la compañía: ' . $id . $e->getMessage()], 500);
        }
    }

}

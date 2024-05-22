<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Company;
use Exception;


class AdminCompaniesController extends Controller
{

    public function __construct()
    {       
        $this->middleware(function ($request, $next) {
            if (!auth()->user()->hasRole('admin')) {
                abort(403, 'No tienes permiso para acceder a esta página.');
            }
            
            return $next($request);
        });   
    }
    /**
     * Display a listing of the resource.
     */
    public static function index()
    {
        
        $companies = DB::table('companies')
        ->select(
            'companies.id',
            'companies.user_id',
            'companies.dt_end',
            'companies.taxNumber',
            'companies_detail.name',
            'users.email as userEmail',
            'companies_email_register.email',
            'companies_phone_register.phone',
            'companies_country_register.country',
            'companies_town_register.town',
            'companies_post_code_register.postCode',
            'companies_province_register.province',       
            'companies_address_register.address'
        )
        ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
        ->leftJoin('users', 'users.id', '=', 'companies.user_id' )
        ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
        ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
        ->leftJoin('companies_addresses', 'companies_detail.id', '=', 'companies_addresses.company_detail_id')
        ->leftJoin('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
        ->leftJoin('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
        ->leftJoin('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
        ->leftJoin('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
        ->leftJoin('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
        ->where('companies_addresses.favorite', 1)
        ->where('companies_phone_register.favorite', 1)
        ->where('companies_email_register.favorite', 1)
        ->whereNull('companies_addresses.dt_end')
        ->whereNull('companies_phone_register.dt_end')
        ->whereNull('companies_email_register.dt_end')
        ->get();


        return Inertia::render('Admin/CompaniesAdmin', ['companies' => $companies]);
        //return response()->json(['message' => 'Compañia cargada correctamente', 'companies' => $companies]);
        //return response()->json(['message' => 'Error al eliminiar la compañia: '. $companies]);
        
    
    }

    public function reload()
    {
        try {   
            
            $companies = DB::table('companies')
            ->select(
                'companies.id',
                'companies.user_id',
                'companies.dt_end',
                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_phone_register.phone',
                'companies_country_register.country',
                'companies_town_register.town',
                'companies_post_code_register.postCode',
                'companies_province_register.province',       
                'companies_address_register.address'
            )
            ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
            ->leftJoin('companies_addresses', 'companies_detail.id', '=', 'companies_addresses.company_detail_id')
            ->leftJoin('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
            ->leftJoin('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
            ->leftJoin('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
            ->leftJoin('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->leftJoin('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
            ->where('companies_addresses.favorite', 1)
            ->where('companies_phone_register.favorite', 1)
            ->where('companies_email_register.favorite', 1)
            ->whereNull('companies_addresses.dt_end')
            ->whereNull('companies_phone_register.dt_end')
            ->whereNull('companies_email_register.dt_end')
            ->get();

            
            return response()->json(['message' => 'La compañía se ha creado correctamente', 'companies' => $companies]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
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
    public function store(CompanyRequest $request)
    {
        DB::beginTransaction();
        try{
            // Insertar en la tabla companies
            $companyId = DB::table('companies')->insertGetId([
                'taxNumber' => $request->taxNumber,
                'dt_start' => now(),
                'user_id' => $request->user_id,
            ]);

            // Insertar en la tabla companies_detail
            $companyDetailId = DB::table('companies_detail')->insertGetId([
                'name' => $request->name,
                'dt_start' => now(),
                'company_id' => $companyId,
                'verified' => true
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

            DB::commit();
            return response()->json(['message' => 'La compañía se ha creado correctamente']);

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

        

            // Verificar si el usuario autenticado es propietario de la empresa
            $company = Company::where('id', $id)->get();


            if (!$company) {
                return response()->json(['message' => 'La empresa no ha sido econtrada']);
            }
            
            $companies = DB::table('companies')
            ->select(
                'companies.id',
                'companies.dt_end',
                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_phone_register.phone',
                'companies_country_register.country',
                'companies_town_register.town',
                'companies_post_code_register.postCode',
                'companies_province_register.province',       
                'companies_address_register.address'
            )
            ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
            ->leftJoin('companies_addresses', 'companies_detail.id', '=', 'companies_addresses.company_detail_id')
            ->leftJoin('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
            ->leftJoin('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
            ->leftJoin('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
            ->leftJoin('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->leftJoin('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
            ->where('companies.id', $id)
            ->where('companies_addresses.favorite', 1)
            ->where('companies_phone_register.favorite', 1)
            ->where('companies_email_register.favorite', 1)
            ->whereNull('companies_addresses.dt_end')
            ->whereNull('companies_phone_register.dt_end')
            ->whereNull('companies_email_register.dt_end')
            ->first();

            
            return Inertia::render('Companies/Show', ['company' => $companies]);
            
        }catch (Exception $e) {
                
            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
        }

        
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
    public function update(CompanyRequest $request, string $oldCompanyId)
    {
        DB::beginTransaction();
        try {

            
            
            // Crea una nueva compañia asociada al id del usuario seleccionado
            $newCompanyId = DB::table('companies')->insertGetId([
                'taxNumber'=> $request->taxNumber,
                'user_id' => $request->user_id,
                'dt_start'=> now()            
            ]);
            
            // Genera un nuevo company_detail para la nueva compañía
            $newCompanyDetailId = DB::table('companies_detail')->insertGetId([
                'company_id' => $newCompanyId,
                'name'=> $request->name,
                'verified' => true,
                'dt_start'=> now()            
            ]);

            // Recoge en una colección los emails de la antigua compañía
            $allCompanyEmails = DB::table('companies_email_register')
            ->where('company_detail_id', $oldCompanyId)
            ->select('email', 'favorite', 'dt_start', 'dt_end')
            ->get();

            // Inserta los email asociadas a la compañía modificada
            $insertAllCompanyEmails = [];

            foreach ($allCompanyEmails as $emails) {
                $insertAllCompanyEmails[] = [
                    'email' => $emails->email,
                    'favorite' => $emails->favorite,
                    'dt_start' => $emails->dt_start,
                    'dt_end' => $emails->dt_end,
                    'company_detail_id' => $newCompanyDetailId,
                ];
            }
            // Guarda los emails asociados a la nueva compañia
            DB::table('companies_email_register')->insert($insertAllCompanyEmails);

            
             // Recoge en una colección los teléfonos de la antigua compañía
            $allCompanyPhones = DB::table('companies_phone_register')
            ->where('company_detail_id', $oldCompanyId)
            ->select('phone', 'favorite', 'dt_start', 'isMobile', 'dt_end')
            ->get();

            // Inserta los teléfonos asociadas a la compañía modificada
            $insertAllCompanyPhones = [];

            foreach ($allCompanyPhones as $phones) {
                $insertAllCompanyPhones[] = [
                    'email' => $phones->email,
                    'favorite' => $phones->favorite,
                    'isMobile' => $phones->isMobile,
                    'dt_start' => $phones->dt_start,
                    'dt_end' => $phones->dt_end,
                    'company_detail_id' => $newCompanyDetailId,
                ];
            }
            // Guarda los teléfonos asociados a la nueva compañia
            DB::table('companies_phone_register')->insert($insertAllCompanyPhones);


            // Recoge las direccioness de la antigua compañía
            $allCompanyAddress = DB::table('companies_addresses')
            ->where('company_detail_id',$oldCompanyId)
            ->select(
                'company_address_register_id as car_id',
                'company_province_register_id as cpr_id',
                'company_town_register_id as ctr_id',
                'company_country_register_id as ccr_id',
                'company_post_code_register_id as cpcr_id',
                'dt_start',
                'dt_end',
                'favorite'
            )
            ->get();

            // Inserta las direcciónes asociadas a la compañía modificada
            $insertAllComanyAddresses = [];

            foreach ($allCompanyAddress as $address) {
                $insertAllComanyAddresses[] = [
                    'company_detail_id' => $newCompanyId,
                    'company_address_register_id' => $address->car_id,
                    'company_province_register_id' => $address->cpr_id,
                    'company_town_register_id' => $address->ctr_id,
                    'company_country_register_id' => $address->ccr_id,
                    'company_post_code_register_id' => $address->cpcr_id,
                    'dt_start' => $address->dt_start,
                    'dt_end' => $address->dt_end,
                    'favorite' => $address->favorite    
                ];
            }
            // Guarda los adressess asociados a la nueva compañia
            DB::table('companies_addresses')->insert($insertAllComanyAddresses);


            // Recoge las relaciones de la antigua compañía
            $allCompanyCustomers = DB::table('companies_customers')
            ->where('company_id_company', $oldCompanyId)
            ->select([
                'company_id_customer',
                'dt_start',
                'dt_end',
                'isConsulting'
            ])
            ->get();

            // Inserta las relaciones asociadas a la compañía modificada
            $insertAllCompanyCustomers = [];

            foreach ($allCompanyCustomers as $customers) {
                $insertAllCompanyCustomers[] = [
                    'company_id_company' => $newCompanyId,
                    'company_id_customer' => $customers->company_id_customer,
                    'isConsulting' => $customers->isConsulting,
                    'dt_start' => $customers->dt_start, 
                    'dt_end' => $customers->dt_end, 
                ];
            }

            // Guarda las relaciones asociadas a la nueva compañia
            DB::table('companies_addresses')->insert($insertAllCompanyCustomers);

            
            // Recoge las relaciones de las facturas de la antigua compañía
            $allCompanyInvoices = DB::table('invoices')
            ->where('company_id_company', $oldCompanyId)
            ->select([
                'number',
                'company_id_customer',
                'date',
                'amount',
                'type',
                'paid',
                'active',
                'company_invoice_design_id as cid_id',
                'dt_start',
                'dt_end'
            ])
            ->get();

            // Inserta las facturas asociadas a la compañía modificada
            $insertAllCompanyInvoices = [];

            foreach ($allCompanyInvoices as $invoice) {
                $insertAllCompanyInvoices[] = [
                    'number' => $invoice->number,
                    'company_id_company' => $newCompanyId,
                    'company_id_customer' => $invoice->company_id_customer,
                    'date' => $invoice->date,
                    'amount' => $invoice->amount,
                    'type' => $invoice->type,
                    'paid' => $invoice->paid,
                    'active'=>$invoice->active,
                    'company_invoice_design_id' =>$invoice->cid_id,
                    'dt_start' => $invoice->dt_start, 
                    'dt_end' => $invoice->dt_end, 

                ];
            }
            // Guarda las relaciones asociadas de las facturas a la nueva compañia
            DB::table('invoices')->insert($insertAllCompanyInvoices);

            // Recoge las relaciones de las facturas recibidas de la antigua compañía
            $allCompanyInvoicesReceived = DB::table('invoices')
            ->where('company_id_customer', $oldCompanyId)
            ->select([
                'number',
                'company_id_company',
                'date',
                'amount',
                'type',
                'paid',
                'active',
                'company_invoice_design_id as cid_id',
                'dt_start',
                'dt_end'
            ])
            ->get();

            // Inserta las facturas recibidas a la compañía modificada
            $insertAllCompanyInvoicesReceived = [];

            foreach ($allCompanyInvoicesReceived as $invoice) {
                $insertAllCompanyInvoicesReceived[] = [
                    'number' => $invoice->number,
                    'company_id_company' => $invoice->company_id_company,
                    'company_id_customer' => $newCompanyId,
                    'date' => $invoice->date,
                    'amount' => $invoice->amount,
                    'type' => $invoice->type,
                    'paid' => $invoice->paid,
                    'active'=>$invoice->active,
                    'company_invoice_design_id' =>$invoice->cid_id,
                    'dt_start' => $invoice->dt_start, 
                    'dt_end' => $invoice->dt_end, 

                ];
            }
            // Guarda las relaciones asociadas de las facturas recibidas a la nueva compañia
            DB::table('invoices')->insert($insertAllCompanyInvoicesReceived);











            //"ELIMINACION" de todos los datos de la compañia modificada

            // "Elimina" la compañia editada
            DB::table('companies')
            ->where('id', $oldCompanyId)
            ->update([
                'dt_end' => now(),
            ]);

            // "Elimina" el company_detail de la compañia modificada
            DB::table('companies_detail')
            ->where('company_id', $oldCompanyId)
            ->update([
                'dt_end' => now(),
                'verified' => false,
            ]);

            // "Elimina" todos los emails asociados a la antigua compañía
            DB::table('companies_email_register')
            ->where('company_detail_id', $oldCompanyId)
            ->update([
                'dt_end' => now(),
                'favorite' => false,
            ]);

            // "Elimina" todos los teléfonos asociados a la antigua compañía
            DB::table('companies_phone_register')
            ->where('company_detail_id', $oldCompanyId)
            ->update([
                'dt_end' => now(),
                'favorite' => false,
            ]);

            // "Elimina" la dirección de la antigua compañía
            DB::table('companies_addresses')
            ->where('company_detail_id', $oldCompanyId)
            ->update([
                'dt_end' => now(),
                'favorite' => false,
            ]);

            // "Elimina" las relaciones de la compañia
            DB::table('companies_customers')
            ->where('company_id_company', $oldCompanyId)
            ->update([
                'dt_end' => now(),
                'isConsulting' => false
            ]);

            // "Elimina" las relaciones de la compañia
            DB::table('invoices')
            ->where('company_id_company', $oldCompanyId)
            ->update([
                'dt_end' => now(),
            ]);

            // "Elimina" las relaciones de la compañia
            DB::table('invoices')
            ->where('company_id_customer', $oldCompanyId)
            ->update([
                'dt_end' => now(),
            ]);
            DB::commit();

            return response()->json(['message' => 'La compañia se ha modificado correctamente.'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al editar la compañía: ' . $e->getMessage()], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        /*

        try {

            $company = Company::findOrFail($id);
            $company->delete();
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id]);
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id . $e->getMessage()], 500);
        }
        */
        
    }

}

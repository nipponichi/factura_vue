<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    $companyId = DB::table('companies')->insertGetId([
        'taxNumber' => 'B00000000',
        'dt_start' => now(),
        'user_id' => 3
    ]);

    // Crear detalles de la compañía
    $companyDetailId = DB::table('companies_detail')->insertGetId([
        'name' => 'ABC Company',
        'verified' => 1,
        'dt_start' => now(),
        'company_id' => $companyId
    ]);

    // Crear registro de correo electrónico de la compañía
    DB::table('companies_email_register')->insert([
        'email' => 'info@abccompany.com',
        'dt_start' => now(),
        'favorite' =>true,
        'company_detail_id' => $companyDetailId
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '696896985',
        'dt_start' => now(),
        'isMobile' =>true,
        'company_detail_id' => 1,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '966744040',
        'favorite' =>true,
        'dt_start' => now(),
        'company_detail_id' => 1,
    ]);
    
    $companyAddressRegisterId = DB::table('companies_address_register')->insert([
        'address' => 'C/Pez Volador, 54',
        'dt_start' => now(),
    ]);

    $companyPostCodeRegisterId = DB::table('companies_post_code_register')->insert([
        'postCode' => '03300',
        'dt_start' => now(),
    ]);
    $companyTownRegisterId = DB::table('companies_town_register')->insert([
        'town' => 'Orihuela',
        'dt_start' => now(),
        
    ]);
    $companyCountryRegisterId = DB::table('companies_country_register')->insert([
        'country' => 'España',
        'dt_start' => now(),
        
    ]);
    $companyProvinceRegisterId = DB::table('companies_province_register')->insert([
        'province' => 'Alicante',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_addresses')->insert([
        'company_detail_id' => $companyDetailId,
        'company_address_register_id' => $companyAddressRegisterId,
        'company_province_register_id' => $companyProvinceRegisterId,
        'company_town_register_id' => $companyTownRegisterId,
        'company_post_code_register_id' => $companyPostCodeRegisterId,
        'company_country_register_id' => $companyCountryRegisterId,
        'favorite' =>true,
        'dt_start' => now(),
    ]);




    //SEGUNDA COMPAÑIA

    DB::table('companies')->insertGetId([
        'taxNumber' => 'B11111111',
        'dt_start' => now(),
        'user_id' => 2
    ]);

    // Crear detalles de la compañía
    DB::table('companies_detail')->insertGetId([
        'name' => 'XYZ Company',
        'verified' => 1,
        'dt_start' => now(),
        'company_id' => 2
    ]);

    // Crear registro de correo electrónico de la compañía
    DB::table('companies_email_register')->insert([
        'email' => 'info@xyzcompany.com',
        'dt_start' => now(),
        'favorite' =>true,
        'company_detail_id' => 2,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '676812295',
        'favorite' =>true,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_detail_id' => 2,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '968516060',
        'dt_start' => now(),
        'company_detail_id' => 2,
    ]);
    
    DB::table('companies_address_register')->insert([
        'address' => 'C/Aragon, 33',
        'dt_start' => now(),
    ]);

    DB::table('companies_post_code_register')->insert([
        'postCode' => '03330',
        'dt_start' => now(),
    ]);
    DB::table('companies_town_register')->insert([
        'town' => 'Mazarrón',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_country_register')->insert([
        'country' => 'España',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_province_register')->insert([
        'province' => 'Murcia',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_addresses')->insert([
        'company_detail_id' => 2,
        'company_address_register_id' => 2,
        'company_province_register_id' => 2,
        'company_town_register_id' => 2,
        'company_post_code_register_id' => 2,
        'company_country_register_id' => 2,
        'favorite' =>true,
        'dt_start' => now(),
    ]);

}

}

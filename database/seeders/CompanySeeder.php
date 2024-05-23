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
    $companyId = DB::table('companies')->insert([
        'dt_start' => now(),
        'user_id' => 3
    ]);

    // Crear detalles de la compañía
    DB::table('companies_detail')->insert([
        'company_id' => $companyId,
        'verified' => true,
        'dt_start' => now(),
    ]);

    // Crear registro de correo electrónico de la compañía
    DB::table('companies_email_register')->insert([
        'email' => 'info@abccompany.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_detail_id' => 1,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '+34696896985',
        'dt_start' => now(),
        'isMobile' =>true,
        'company_detail_id' => 1,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '+34966744040',
        'favourite' =>true,
        'dt_start' => now(),
        'company_detail_id' => 1,
    ]);
    DB::table('companies_addresses')->insert([
        'company_detail_id' => 1,
        'dt_start' => now(),
    ]);
    
    DB::table('companies_address_register')->insert([
        'company_addresses_id' => 1,
        'address' => 'C/Pez Volador, 54',
        'favourite' =>true,
        'dt_start' => now(),
    ]);

    DB::table('companies_post_code_register')->insert([
        'company_addresses_id' => 1,
        'postCode' => '03300',
        'favourite' =>true,
        'dt_start' => now(),
    ]);
    DB::table('companies_town_register')->insert([
        'company_addresses_id' => 1,
        'town' => 'Orihuela',
        'favourite' =>true,
        'dt_start' => now(),
        
    ]);
    DB::table('companies_country_register')->insert([
        'company_addresses_id' => 1,
        'favourite' =>true,
        'country' => 'España',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_province_register')->insert([
        'company_addresses_id' => 1,
        'favourite' =>true,
        'province' => 'Alicante',
        'dt_start' => now(),
        
    ]);

    DB::table('companies_tax_number_register')->insert([
        'tax_number' => 'B00000000',
        'company_detail_id' => 1,
        'dt_start' => now(),
    ]);

    DB::table('companies_name_register')->insert([
        'name' => 'Company',
        'company_detail_id' => 1,
        'dt_start' => now(),
    ]);


    //SEGUNDA COMPAÑIA
    

    DB::table('companies')->insert([
        'dt_start' => now(),
        'user_id' => 2
    ]);


    // Crear detalles de la compañía
    DB::table('companies_detail')->insert([
        'verified' => true,
        'dt_start' => now(),
        'company_id' => 2
    ]);

    // Crear registro de correo electrónico de la compañía
    DB::table('companies_email_register')->insert([
        'email' => 'info@xyzcompany.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_detail_id' => 2,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '+34676812295',
        'favourite' =>true,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_detail_id' => 2,
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '+34968516060',
        'dt_start' => now(),
        'company_detail_id' => 2,
    ]);

    DB::table('companies_addresses')->insert([
        'company_detail_id' => 2,
        'dt_start' => now(),
    ]);

    
    DB::table('companies_address_register')->insert([
        'company_addresses_id' => 2,
        'favourite' =>true,
        'address' => 'C/Aragon, 33',
        'dt_start' => now(),
    ]);

    DB::table('companies_post_code_register')->insert([
        'company_addresses_id' => 2,
        'postCode' => '03330',
        'favourite' =>true,
        'dt_start' => now(),
    ]);
    DB::table('companies_town_register')->insert([
        'company_addresses_id' => 2,
        'town' => 'Mazarrón',
        'favourite' =>true,
        'dt_start' => now(),
        
    ]);
    DB::table('companies_country_register')->insert([
        'company_addresses_id' => 2,
        'favourite' =>true,
        'country' => 'España',
        'dt_start' => now(),
        
    ]);
    DB::table('companies_province_register')->insert([
        'company_addresses_id' => 2,
        'favourite' =>true,
        'province' => 'Murcia',
        'dt_start' => now(),
        
    ]);
    
    DB::table('companies_tax_number_register')->insert([
        'tax_number' => 'B00000001',
        'company_detail_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('companies_name_register')->insert([
        'name' => 'Consulting',
        'company_detail_id' => 2,
        'dt_start' => now(),
    ]);

}

}

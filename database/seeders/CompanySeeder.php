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
            // Crear compañía
    // Crear compañía
    $companyId = DB::table('companies')->insertGetId([
        'taxNumber' => 'B00000000',
        'dt_start' => now(),
        'user_id' => 1
    ]);

    // Crear detalles de la compañía
    $companyDetailId = DB::table('companies_detail')->insertGetId([
        'name' => 'Company Name',
        'verified' => 1,
        'dt_start' => now(),
        'company_id' => $companyId
    ]);

    // Crear registro de correo electrónico de la compañía
    DB::table('companies_email_register')->insert([
        'email' => 'company@example.com',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);

    DB::table('companies_phone_register')->insert([
        'phone' => '696896985',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);

    DB::table('companies_address_register')->insert([
        'address' => 'C/Pez Volador, 54',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);
    DB::table('companies_post_code_register')->insert([
        'postCode' => '03315',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);
    DB::table('companies_town_register')->insert([
        'town' => 'Orihuela',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);
    DB::table('companies_country_register')->insert([
        'country' => 'España',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);
    DB::table('companies_province_register')->insert([
        'province' => 'Alicante',
        'dt_start' => now(),
        'company_detail_id' => $companyDetailId
    ]);
/*
        Company::create([
            'name' => 'CompanyAdmin',
            'taxNumber' => 'B00000000',
            'address' => 'Pez Volador, 54',
            'email' => 'testcompany1@gmail.com',
            'phone' => '666333222',
            'province' => ' Alicante',
            'town' => 'Orihuela',
            'postCode' => '03300',
            'user_id' => '1'
        ]);

        Company::create([
            'name' => 'CompanyUser',
            'taxNumber' => 'B00000000',
            'address' => 'Pez Volador, 54',
            'email' => 'testcompany1@gmail.com',
            'phone' => '666333222',
            'province' => ' Alicante',
            'town' => 'Orihuela',
            'postCode' => '03300',
            'user_id' => '2'
        ]);*/
    }
}

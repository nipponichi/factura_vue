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

    //Tipos de documentos

    DB::table('documents_type')->insert([
        'name' => 'Factura',
    ]);

    DB::table('documents_type')->insert([
        'name' => 'Presupuesto',
    ]);

    DB::table('documents_type')->insert([
        'name' => 'Albarán',
    ]);

    DB::table('documents_type')->insert([
        'name' => 'Pedido',
    ]);

    // METODOS DE PAGO

    DB::table('payment_method')->insert([
        'name' => 'Transferencia',
        'dt_start' => now(),
    ]);

    DB::table('payment_method')->insert([
        'name' => 'Efectivo',
        'dt_start' => now(),
    ]);

    DB::table('payment_method')->insert([
        'name' => 'Bizum',
        'dt_start' => now(),
    ]);

    DB::table('payment_method')->insert([
        'name' => 'Paypal',
        'dt_start' => now(),
    ]);



    //PRIMERA COMPAÑIA
    DB::table('companies')->insert([
        'verified' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_users')->insert([
        'company_id' => 1,
        'user_id' => 2,
        'dt_start' => now(),
    ]);

        
    DB::table('emails')->insert([
        'email' => 'info@abccompany.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_id' => 1,
    ]);

    DB::table('phones')->insert([
        'phone' => '+34666555222',
        'favourite' =>false,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_id' => 1,
    ]);
    DB::table('phones')->insert([
        'phone' => '+3496544444',
        'favourite' =>true,
        'isMobile' =>false,
        'dt_start' => now(),
        'company_id' => 1,
    ]);

    DB::table('bank_account')->insert([
        'complete_bank_account' => 'ES91 2048 6032 47 4223364022',
        'iban' => 'ES91',
        'entity' => '2048',
        'office' => '6032',
        'control_digit' => '47',
        'account_number' => '4223364022',
        'bank_name' => 'Banco Santander',
        'country' => 'España',
        'swift' => 'BSCHESMM',
        'currency' => 'eur',
        'favourite' =>true,
        'dt_start' => now(),
        'company_id' => 1,
    ]);

    DB::table('bank_account')->insert([
        'complete_bank_account' => 'ES56 0049 0843 21 5318356484',
        'iban' => 'ES56',
        'entity' => '0049',
        'office' => '0843',
        'control_digit' => '21',
        'account_number' => '5318356484',
        'bank_name' => 'BBVA',
        'swift' => 'BBVAESMM',
        'country' => 'España',
        'currency' => 'eur',
        'favourite' =>false,
        'dt_start' => now(),
        'company_id' => 1,
    ]);

    
    DB::table('addresses')->insert([
        'company_id' => 1,
        'town' => 'Orihuela',
        'address' => 'C/Mondragon, 44',
        'post_code' => '03300',
        'province' => 'Alicante',
        'country' => 'España',
        'favourite' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_tax_numbers')->insert([
        'tax_number' => 'B123123123',
        'company_id' => 1,
        'dt_start' => now(),
    ]);

    DB::table('companies_names')->insert([
        'name' => 'Company ABC',
        'company_id' => 1,
        'dt_start' => now(),
    ]);


    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 1,
        'documents_type_id' => 1,
        'dt_start' => now(),
    ]);

    
    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 1,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);

    
    //SEGUNDA COMPAÑIA

    DB::table('companies')->insert([
        'verified' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_users')->insert([
        'company_id' => 2,
        'user_id' => 3,
        'dt_start' => now(),
    ]);

    
    DB::table('emails')->insert([
        'email' => 'info@xyzcompany.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_id' => 2,
    ]);
    DB::table('phones')->insert([
        'phone' => '+34676812295',
        'favourite' =>false,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_id' => 2,
    ]);
    DB::table('phones')->insert([
        'phone' => '+34968516060',
        'favourite' =>true,
        'isMobile' =>false,
        'dt_start' => now(),
        'company_id' => 2,
    ]);

    DB::table('bank_account')->insert([
        'complete_bank_account' => 'ES40 2048 3506 36 9026752232',
        'iban' => 'ES40',
        'entity' => '2048',
        'office' => '3506',
        'control_digit' => '36',
        'account_number' => '9026752232',
        'bank_name' => 'EVO Banco',
        'country' => 'España',
        'swift' => 'EVOBESMM',
        'currency' => 'eur',
        'favourite' =>true,
        'dt_start' => now(),
        'company_id' => 2,
    ]);


    DB::table('addresses')->insert([
        'company_id' => 2,
        'town' => 'Mazarrón',
        'address' => 'C/Aragon, 33',
        'post_code' => '30310',
        'province' => 'Murcia',
        'country' => 'España',
        'favourite' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_tax_numbers')->insert([
        'tax_number' => 'B11111111',
        'company_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('companies_names')->insert([
        'name' => 'Consulting XYZ',
        'company_id' => 2,
        'dt_start' => now(),
    ]);


    DB::table('documents_series')->insert([
        'serie' => 'F24',
        'number' => 44,
        'company_id' => 2,
        'documents_type_id' => 1,
        'dt_start' => now(),
    ]);

    
    DB::table('documents_series')->insert([
        'serie' => 'F24',
        'number' => 1,
        'company_id' => 2,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);





    
    

}

}

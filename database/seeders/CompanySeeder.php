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

    DB::table('documents_type')->insert([
        'name' => 'Fra. Rectificativa',
    ]);

    // METODOS DE PAGO

    DB::table('payment_method')->insert([
        'name' => 'Transferencia',
        'dt_start' => now(),
    ]);
    DB::table('payment_method')->insert([
        'name' => 'Contado',
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
    DB::table('payment_method')->insert([
        'name' => 'Tarjeta',
        'dt_start' => now(),
    ]);
    DB::table('payment_method')->insert([
        'name' => 'Cheque',
        'dt_start' => now(),
    ]);
    DB::table('payment_method')->insert([
        'name' => 'Domiciliación',
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
        'is_owner' => true,
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

    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 1,
        'documents_type_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 1,
        'documents_type_id' => 4,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'AB',
        'number' => 0,
        'company_id' => 1,
        'documents_type_id' => 5,
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
        'is_owner' => true,
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
        'serie' => 'F',
        'number' => 0,
        'company_id' => 2,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 2,
        'documents_type_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'F',
        'number' => 0,
        'company_id' => 2,
        'documents_type_id' => 4,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'AB',
        'number' => 0,
        'company_id' => 2,
        'documents_type_id' => 5,
        'dt_start' => now(),
    ]);

    // DEMO COMPANY 

    DB::table('companies')->insert([
        'verified' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_users')->insert([
        'company_id' => 3,
        'user_id' => 4,
        'dt_start' => now(),
        'is_owner' => true,
    ]);

    
    DB::table('emails')->insert([
        'email' => 'grovelec@grovelec.es',
        'dt_start' => now(),
        'favourite' =>true,
        'company_id' => 3,
    ]);
    DB::table('phones')->insert([
        'phone' => '+34604084935',
        'favourite' =>true,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_id' => 3,
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
        'company_id' => 3,
    ]);


    DB::table('addresses')->insert([
        'company_id' => 3,
        'town' => 'El Grove',
        'address' => 'Rúa do Sol, 70, 5º A',
        'post_code' => '36980',
        'province' => 'Pontevedra',
        'country' => 'España',
        'favourite' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_tax_numbers')->insert([
        'tax_number' => '35449716T',
        'company_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('companies_names')->insert([
        'name' => 'Antonio Castro Bea',
        'company_id' => 3,
        'dt_start' => now(),
    ]);


    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 3,
        'documents_type_id' => 1,
        'dt_start' => now(),
    ]);

    
    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 3,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 3,
        'documents_type_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 3,
        'documents_type_id' => 4,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'AB',
        'number' => 0,
        'company_id' => 3,
        'documents_type_id' => 5,
        'dt_start' => now(),
    ]);

    // ALBERTO EMILIO
    
    DB::table('companies')->insert([
        'verified' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_users')->insert([
        'company_id' => 4,
        'user_id' => 5,
        'dt_start' => now(),
        'is_owner' => true,
    ]);

    
    DB::table('emails')->insert([
        'email' => 'axenciag@gmail.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_id' => 4,
    ]);
    DB::table('phones')->insert([
        'phone' => '+34658176318',
        'favourite' =>true,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_id' => 4,
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
        'company_id' => 4,
    ]);


    DB::table('addresses')->insert([
        'company_id' => 4,
        'town' => 'A Coruña',
        'address' => 'Calle Santo Tomás, 26, 4',
        'post_code' => '15002',
        'province' => 'Ourense',
        'country' => 'España',
        'favourite' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_tax_numbers')->insert([
        'tax_number' => '46900071N',
        'company_id' => 4,
        'dt_start' => now(),
    ]);

    DB::table('companies_names')->insert([
        'name' => 'Alberto Emilio Castaño Pereira',
        'company_id' => 4,
        'dt_start' => now(),
    ]);


    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 4,
        'documents_type_id' => 1,
        'dt_start' => now(),
    ]);

    
    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 4,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 4,
        'documents_type_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 4,
        'documents_type_id' => 4,
        'dt_start' => now(),
    ]);
    
    DB::table('documents_series')->insert([
        'serie' => 'AB',
        'number' => 0,
        'company_id' => 4,
        'documents_type_id' => 5,
        'dt_start' => now(),
    ]);

    // MIREN

    DB::table('companies')->insert([
        'verified' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_users')->insert([
        'company_id' => 5,
        'user_id' => 6,
        'dt_start' => now(),
        'is_owner' => true,
    ]);

    
    DB::table('emails')->insert([
        'email' => 'mirrentxu@gmail.com',
        'dt_start' => now(),
        'favourite' =>true,
        'company_id' => 5,
    ]);
    DB::table('phones')->insert([
        'phone' => '+34697436790',
        'favourite' =>true,
        'isMobile' =>true,
        'dt_start' => now(),
        'company_id' => 5,
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
        'company_id' => 5,
    ]);


    DB::table('addresses')->insert([
        'company_id' => 5,
        'town' => 'Bustarviejo',
        'address' => 'CALLE PARRA N 28',
        'post_code' => '28720',
        'province' => 'Madrid',
        'country' => 'España',
        'favourite' => true,
        'dt_start' => now(),
    ]);

    DB::table('companies_tax_numbers')->insert([
        'tax_number' => '44552795R',
        'company_id' => 5,
        'dt_start' => now(),
    ]);

    DB::table('companies_names')->insert([
        'name' => 'Miren Alzola Cambronero',
        'company_id' => 5,
        'dt_start' => now(),
    ]);


    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 5,
        'documents_type_id' => 1,
        'dt_start' => now(),
    ]);

    
    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 5,
        'documents_type_id' => 2,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 5,
        'documents_type_id' => 3,
        'dt_start' => now(),
    ]);

    DB::table('documents_series')->insert([
        'serie' => 'R',
        'number' => 0,
        'company_id' => 5,
        'documents_type_id' => 4,
        'dt_start' => now(),
    ]);
    
    DB::table('documents_series')->insert([
        'serie' => 'AB',
        'number' => 0,
        'company_id' => 5,
        'documents_type_id' => 5,
        'dt_start' => now(),
    ]);

}

}

<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'name' => 'CompanyAdmin',
            'taxNumber' => 'B00000000',
            'address1' => 'Pez Volador, 54',
            'email' => 'testcompany1@gmail.com',
            'phone1' => '666333222',
            'province' => ' Alicante',
            'town' => 'Orihuela',
            'postCode' => '03300',
            'user_id' => '1'
        ]);

        Company::create([
            'name' => 'CompanyUser',
            'taxNumber' => 'B00000000',
            'address1' => 'Pez Volador, 54',
            'email' => 'testcompany1@gmail.com',
            'phone1' => '666333222',
            'province' => ' Alicante',
            'town' => 'Orihuela',
            'postCode' => '03300',
            'user_id' => '2'
        ]);
    }
}

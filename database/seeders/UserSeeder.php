<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;



class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'admin',
            'email'=> 'admin@gmail.com',
            'password'=> Hash::make('12345678')
        ]);
        $admin -> assignRole('admin');

        $company = User::create([
            'name' => 'company',
            'email'=> 'company@gmail.com',
            'password'=> Hash::make('12345678')
        ]);
        $company -> assignRole('company');
    
    }
}

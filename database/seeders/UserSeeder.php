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

        $consulting = User::create([
            'name' => 'consulting',
            'email'=> 'consulting@gmail.com',
            'password'=> Hash::make('12345678')
        ]);
        $consulting -> assignRole('consulting');

        $userDemo = User::create([
            'name' => 'Antonio Castro',
            'email'=> 'grovelec@grovelec.es',
            'password'=> Hash::make('12345678')
        ]);
        $userDemo -> assignRole('company');

        $userDemo2 = User::create([
            'name' => 'Alberto Emilio',
            'email'=> 'axenciag@gmail.com',
            'password'=> Hash::make('12345678')
        ]);
        $userDemo2 -> assignRole('company');

        $userDemo3 = User::create([
            'name' => 'Miren Alzola',
            'email'=> 'mirrentxu@gmail.com',
            'password'=> Hash::make('12345678')
        ]);
        $userDemo3 -> assignRole('company');
    
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $role_admin = Role::create(['name' => 'admin']);
        $role_company = Role::create(['name' => 'company']);
        $role_consulting = Role::create(['name' => 'consulting']);
        $role_freelancer = Role::create(['name' => 'freelancer']);

        $permission_create_role = Permission::create(['name'=> 'create roles']);
        $permission_read_role = Permission::create(['name'=> 'read roles']);
        $permission_update_role = Permission::create(['name'=> 'update roles']);
        $permission_delete_role = Permission::create(['name'=> 'delete roles']);

        $permission_view_company = Permission::create(['name'=> 'view company']);
        $permission_create_company = Permission::create(['name'=> 'create company']);
        $permission_read_company = Permission::create(['name'=> 'read company']);
        $permission_update_company = Permission::create(['name'=> 'update company']);
        $permission_delete_company = Permission::create(['name'=> 'delete company']);

        $permission_view_consulting = Permission::create(['name'=> 'view consulting']);
        $permission_create_consulting = Permission::create(['name'=> 'create consulting']);
        $permission_read_consulting = Permission::create(['name'=> 'read consulting']);
        $permission_update_consulting = Permission::create(['name'=> 'update consulting']);
        $permission_delete_consulting = Permission::create(['name'=> 'delete consulting']);
        

        //Permisos admin
        $permissions_admin = [
            $permission_create_role, $permission_read_role, $permission_update_role, $permission_delete_role,      
        ];

        //Permisos company
        $permissions_company = [
            $permission_create_company, $permission_read_company, $permission_update_company, $permission_delete_company,  
        ];

        
        //Permisos consulting
        $permissions_consulting = [
            $permission_create_consulting, $permission_read_consulting, $permission_update_consulting, $permission_delete_consulting,
        ];
        
        $role_admin->syncPermissions($permissions_admin,$permissions_company,$permissions_consulting);
        $role_company->syncPermissions($permissions_company,$permission_view_company);
        $role_freelancer->syncPermissions($permissions_company, $permission_view_company);
        $role_consulting->syncPermissions($permissions_company,$permissions_consulting, $permission_view_company, $permission_view_consulting);
        
    }
}

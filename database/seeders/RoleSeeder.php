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
        //$role_consulting = Role::create(['name' => 'consulting']);

        $permission_create_role = Permission::create(['name'=> 'create roles']);
        $permission_read_role = Permission::create(['name'=> 'read roles']);
        $permission_update_role = Permission::create(['name'=> 'update roles']);
        $permission_delete_role = Permission::create(['name'=> 'delete roles']);

        $permission_create_company = Permission::create(['name'=> 'create company']);
        $permission_read_company = Permission::create(['name'=> 'read company']);
        $permission_update_company = Permission::create(['name'=> 'update company']);
        $permission_delete_company = Permission::create(['name'=> 'delete company']);

        $permission_create_customer = Permission::create(['name'=> 'create customer']);
        $permission_read_customer = Permission::create(['name'=> 'read customer']);
        $permission_update_customer = Permission::create(['name'=> 'update customer']);
        $permission_delete_customer = Permission::create(['name'=> 'delete customer']);

        $permission_create_invoice = Permission::create(['name'=> 'create invoice']);
        $permission_read_invoice = Permission::create(['name'=> 'read invoice']);
        $permission_update_invoice = Permission::create(['name'=> 'update invoice']);
        $permission_delete_invoice = Permission::create(['name'=> 'delete invoice']);

        $permission_create_customerOfCustomer = Permission::create(['name'=> 'create customerOfCustomer']);
        $permission_read_customerOfCustomer = Permission::create(['name'=> 'read customerOfCustomer']);
        $permission_update_customerOfCustomer = Permission::create(['name'=> 'update customerOfCustomer']);
        $permission_delete_customerOfCustomer = Permission::create(['name'=> 'delete customerOfCustomer']);

        $permission_create_product = Permission::create(['name'=> 'create product']);
        $permission_read_product = Permission::create(['name'=> 'read product']);
        $permission_update_product = Permission::create(['name'=> 'update product']);
        $permission_delete_product = Permission::create(['name'=> 'delete product']);

        //Permisos admin
        $permissions_admin = [
            $permission_create_role, $permission_read_role, $permission_update_role, $permission_delete_role,
            $permission_create_company, $permission_read_company, $permission_update_company, $permission_delete_company,
            $permission_create_customer, $permission_read_customer, $permission_update_customer, $permission_delete_customer,
            $permission_create_invoice, $permission_read_invoice, $permission_update_invoice, $permission_delete_invoice, $permission_create_customerOfCustomer,
            $permission_read_customerOfCustomer,$permission_update_customerOfCustomer, $permission_delete_customerOfCustomer, $permission_create_product,
            $permission_read_product, $permission_update_product,$permission_delete_product
        ];

        //Permisos company
        $permissions_company = [
            $permission_create_company, $permission_read_company, $permission_update_company, $permission_delete_company,
            $permission_create_customer, $permission_read_customer, $permission_update_customer, $permission_delete_customer,
            $permission_create_invoice, $permission_read_invoice, $permission_update_invoice, $permission_delete_invoice, $permission_create_customerOfCustomer,
            $permission_read_customerOfCustomer, $permission_update_customerOfCustomer, $permission_delete_customerOfCustomer, $permission_create_product,
            $permission_read_product, $permission_update_product, $permission_delete_product
        ];

        /*
        //Permisos consulting
        $permissions_consulting = [
            $permission_create_company, $permission_read_company, $permission_update_company, $permission_delete_company,
            $permission_create_customer, $permission_read_customer, $permission_update_customer, $permission_delete_customer,
            $permission_create_invoice, $permission_read_invoice, $permission_update_invoice, $permission_delete_invoice, $permission_create_customerOfCustomer,
            $permission_read_customerOfCustomer, $permission_update_customerOfCustomer, $permission_delete_customerOfCustomer, $permission_create_product,
            $permission_read_product, $permission_update_product, $permission_delete_product
        ];

        $role_consulting->syncPermissions($permissions_consulting);
        */

        $role_admin->syncPermissions($permissions_admin);
        $role_company->syncPermissions($permissions_company);
        
        
    }
}

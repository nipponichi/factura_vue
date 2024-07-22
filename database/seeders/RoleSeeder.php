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
        // MAIN PERMISSIONS
        $role_admin = Role::create(['name' => 'admin']);
        $role_company = Role::create(['name' => 'company']);
        $role_consulting = Role::create(['name' => 'consulting']);

        // Permisos para la categoría "roles"
        $permission_create_role = Permission::create(['name'=> 'create roles']);
        $permission_read_role = Permission::create(['name'=> 'read roles']);
        $permission_update_role = Permission::create(['name'=> 'update roles']);
        $permission_delete_role = Permission::create(['name'=> 'delete roles']);

        // Permisos para la categoría "compañia / company"
        $permission_read_company = Permission::create(['name'=> 'read company']);
        $permission_create_company = Permission::create(['name'=> 'create company']);
        $permission_update_company = Permission::create(['name'=> 'update company']);
        $permission_delete_company = Permission::create(['name'=> 'delete company']);

        // Permisos para la categoría "asesoria / consulting"
        $permission_create_consulting = Permission::create(['name'=> 'create consulting']);
        $permission_read_consulting = Permission::create(['name'=> 'read consulting']);
        $permission_update_consulting = Permission::create(['name'=> 'update consulting']);
        $permission_delete_consulting = Permission::create(['name'=> 'delete consulting']);
        
        // Permisos para la categoría "invoice income"
        $permission_create_document_income = Permission::create(['name'=> 'create document income']);
        $permission_read_document_income = Permission::create(['name'=> 'read document income']);
        $permission_update_document_income = Permission::create(['name'=> 'update document income']);
        $permission_delete_document_income = Permission::create(['name'=> 'delete document income']);

        // Permisos para la categoría "invoice expense"
        $permission_create_document_expense = Permission::create(['name'=> 'create document expense']);
        $permission_read_document_expense = Permission::create(['name'=> 'read document expense']);
        $permission_update_document_expense = Permission::create(['name'=> 'update document expense']);
        $permission_delete_document_expense = Permission::create(['name'=> 'delete document expense']);

        // Permisos para la categoría "user"
        $permission_create_user = Permission::create(['name'=> 'create user']);
        $permission_read_user = Permission::create(['name'=> 'read user']);
        $permission_update_user = Permission::create(['name'=> 'update user']);
        $permission_delete_user = Permission::create(['name'=> 'delete user']);

        // Permisos para la categoría "warehouse"
        $permission_create_warehouse = Permission::create(['name'=> 'create warehouse']);
        $permission_read_warehouse = Permission::create(['name'=> 'read warehouse']);
        $permission_update_warehouse = Permission::create(['name'=> 'update warehouse']);
        $permission_delete_warehouse = Permission::create(['name'=> 'delete warehouse']);

        // Permisos para la categoría "accounting"
        $permission_create_accounting = Permission::create(['name'=> 'create accounting']);
        $permission_read_accounting = Permission::create(['name'=> 'read accounting']);
        $permission_update_accounting = Permission::create(['name'=> 'update accounting']);
        $permission_delete_accounting = Permission::create(['name'=> 'delete accounting']);

        // Permisos para la categoría "customer"
        $permission_create_customer = Permission::create(['name'=> 'create customer']);
        $permission_read_customer = Permission::create(['name'=> 'read customer']);
        $permission_update_customer = Permission::create(['name'=> 'update customer']);
        $permission_delete_customer = Permission::create(['name'=> 'delete customer']);

        // Permisos para la categoría "provider"
        $permission_read_provider = Permission::create(['name'=> 'read provider']);
        $permission_update_provider = Permission::create(['name'=> 'update provider']);
        $permission_delete_provider = Permission::create(['name'=> 'delete provider']);

        // Permisos para la categoría "address"
        $permission_create_address = Permission::create(['name'=> 'create address']);
        $permission_read_address = Permission::create(['name'=> 'read address']);
        $permission_update_address = Permission::create(['name'=> 'update address']);
        $permission_delete_address = Permission::create(['name'=> 'delete address']);

        // Permisos para la categoría "phone"
        $permission_create_phone = Permission::create(['name'=> 'create phone']);
        $permission_read_phone = Permission::create(['name'=> 'read phone']);
        $permission_update_phone = Permission::create(['name'=> 'update phone']);
        $permission_delete_phone = Permission::create(['name'=> 'delete phone']);

        // Permisos para la categoría "email"
        $permission_create_email = Permission::create(['name'=> 'create email']);
        $permission_read_email = Permission::create(['name'=> 'read email']);
        $permission_update_email = Permission::create(['name'=> 'update email']);
        $permission_delete_email = Permission::create(['name'=> 'delete email']);

        // Permisos para la categoría "bank account"
        $permission_create_bank_account = Permission::create(['name'=> 'create bank account']);
        $permission_read_bank_account = Permission::create(['name'=> 'read bank account']);
        $permission_update_bank_account = Permission::create(['name'=> 'update bank account']);
        $permission_delete_bank_account = Permission::create(['name'=> 'delete bank account']);

        // Permisos para la categoría "company"
        $permission_create_company = Permission::create(['name'=> 'create company']);
        $permission_read_company = Permission::create(['name'=> 'read company']);
        $permission_update_company = Permission::create(['name'=> 'update company']);
        $permission_delete_company = Permission::create(['name'=> 'delete company']);

        // Permisos para la categoría "Role"
        $permission_create_role = Permission::create(['name'=> 'create role']);
        $permission_read_role = Permission::create(['name'=> 'read role']);
        $permission_update_role = Permission::create(['name'=> 'update role']);
        $permission_delete_role = Permission::create(['name'=> 'delete role']);

        // Permisos para la categoría "Consulting"
        $permission_create_consulting = Permission::create(['name'=> 'create consulting']);
        $permission_read_consulting = Permission::create(['name'=> 'read consulting']);
        $permission_update_consulting = Permission::create(['name'=> 'update consulting']);
        $permission_delete_consulting = Permission::create(['name'=> 'delete consulting']);

        // Permisos para la categoría "Log"
        $permission_create_log = Permission::create(['name'=> 'create log']);
        $permission_read_log = Permission::create(['name'=> 'read log']);
        $permission_update_log = Permission::create(['name'=> 'update log']);
        $permission_delete_log = Permission::create(['name'=> 'delete log']);



        //Permisos admin
        $permissions_admin = [
            $permission_create_consulting, $permission_update_consulting, $permission_delete_consulting, 
        ];

        //Permisos company
        $permissions_company = [
            $permission_read_company, 
            $permission_read_invoice_income, $permission_create_invoice_income, $permission_update_invoice_income, $permission_delete_invoice_income,
            $permission_read_user, $permission_create_user, $permission_update_user, $permission_delete_user,
            $permission_read_customer, $permission_create_customer, $permission_update_customer, $permission_delete_customer,
            $permission_read_address, $permission_create_address, $permission_update_address, $permission_delete_address,
            $permission_read_phone, $permission_create_phone, $permission_update_phone, $permission_delete_phone,
            $permission_read_email, $permission_create_email, $permission_update_email, $permission_delete_email,
            $permission_read_bank_account, $permission_create_bank_account, $permission_update_bank_account, $permission_delete_bank_account,
            $permission_read_role, $permission_create_role, $permission_update_role, $permission_delete_role,
            $permission_read_log, $permission_create_log, $permission_update_log, $permission_delete_log,
        ];
    
        //Permisos consulting
        $permissions_consulting = [
            $permission_read_consulting, 
            $permission_create_company, $permission_update_company, $permission_delete_company,
        ];
        
        
        $role_company->syncPermissions($permissions_company);
        $role_consulting->syncPermissions($permissions_company,$permissions_consulting);
        $role_admin->syncPermissions($permissions_admin,$permissions_company,$permissions_consulting);
        
    }
}

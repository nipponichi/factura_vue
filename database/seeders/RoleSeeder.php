<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;


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
        $role_demo = Role::create(['name' => 'demo']);

        DB::table('permission_group_names')->insert([
            ['id' => 1, 'name' => 'Role'],
            ['id' => 2, 'name' => 'Log'],
            ['id' => 3, 'name' => 'Company'],
            ['id' => 4, 'name' => 'Consulting'],
            ['id' => 5, 'name' => 'Document income'],
            ['id' => 6, 'name' => 'Document expense'],
            ['id' => 7, 'name' => 'User'],
            ['id' => 8, 'name' => 'Warehouse'],
            ['id' => 9, 'name' => 'Accounting'],
            ['id' => 10, 'name' => 'Customer'],
            ['id' => 11, 'name' => 'Provider'],
            ['id' => 12, 'name' => 'Address'],
            ['id' => 13, 'name' => 'Phone'],
            ['id' => 14, 'name' => 'Email'],
            ['id' => 15, 'name' => 'Bank account'],
            ['id' => 16, 'name' => 'Product'],
            ['id' => 17, 'name' => 'Admin'],
        ]);

        // Permisos para la categoría "Admin"
        $permission_create_admin = Permission::create(['name' => 'create admin', 'group_name_id' => 17, 'description' => 'To create admin']);
        $permission_read_admin = Permission::create(['name' => 'read admin', 'group_name_id' => 17, 'description' => 'To see admin']);
        $permission_update_admin = Permission::create(['name' => 'update admin', 'group_name_id' => 17, 'description' => 'To update admin']);
        $permission_delete_admin = Permission::create(['name' => 'delete admin', 'group_name_id' => 17, 'description' => 'To delete admin']);

        // Permisos para la categoría "roles"
        $permission_create_role = Permission::create(['name' => 'create roles', 'group_name_id' => 1, 'description' => 'To create roles']);
        $permission_read_role = Permission::create(['name' => 'read roles', 'group_name_id' => 1, 'description' => 'To see roles']);
        $permission_update_role = Permission::create(['name' => 'update roles', 'group_name_id' => 1, 'description' => 'To update roles']);
        $permission_delete_role = Permission::create(['name' => 'delete roles', 'group_name_id' => 1, 'description' => 'To delete roles']);

        // Permisos para la categoría "Log"
        $permission_create_log = Permission::create(['name' => 'create log', 'group_name_id' => 2, 'description' => 'To create logs']);
        $permission_read_log = Permission::create(['name' => 'read log', 'group_name_id' => 2, 'description' => 'To see logs']);
        $permission_update_log = Permission::create(['name' => 'update log', 'group_name_id' => 2, 'description' => 'To update logs']);
        $permission_delete_log = Permission::create(['name' => 'delete log', 'group_name_id' => 2, 'description' => 'To delete logs']);

        // Permisos para la categoría "Company"
        $permission_read_company = Permission::create(['name' => 'read company', 'group_name_id' => 3, 'description' => 'To see companies']);
        $permission_create_company = Permission::create(['name' => 'create company', 'group_name_id' => 3, 'description' => 'To create companies']);
        $permission_update_company = Permission::create(['name' => 'update company', 'group_name_id' => 3, 'description' => 'To update companies']);
        $permission_delete_company = Permission::create(['name' => 'delete company', 'group_name_id' => 3, 'description' => 'To delete companies']);

        // Permisos para la categoría "Consulting"
        $permission_create_consulting = Permission::create(['name' => 'create consulting', 'group_name_id' => 4, 'description' => 'To create consulting services']);
        $permission_read_consulting = Permission::create(['name' => 'read consulting', 'group_name_id' => 4, 'description' => 'To see consulting services']);
        $permission_update_consulting = Permission::create(['name' => 'update consulting', 'group_name_id' => 4, 'description' => 'To update consulting services']);
        $permission_delete_consulting = Permission::create(['name' => 'delete consulting', 'group_name_id' => 4, 'description' => 'To delete consulting services']);

        // Permisos para la categoría "Document income"
        $permission_create_document_income = Permission::create(['name' => 'create document income', 'group_name_id' => 5, 'description' => 'To create income documents']);
        $permission_read_document_income = Permission::create(['name' => 'read document income', 'group_name_id' => 5, 'description' => 'To see income documents']);
        $permission_update_document_income = Permission::create(['name' => 'update document income', 'group_name_id' => 5, 'description' => 'To update income documents']);
        $permission_delete_document_income = Permission::create(['name' => 'delete document income', 'group_name_id' => 5, 'description' => 'To delete income documents']);

        // Permisos para la categoría "Document expense"
        $permission_create_document_expense = Permission::create(['name' => 'create document expense', 'group_name_id' => 6, 'description' => 'To create expense documents']);
        $permission_read_document_expense = Permission::create(['name' => 'read document expense', 'group_name_id' => 6, 'description' => 'To see expense documents']);
        $permission_update_document_expense = Permission::create(['name' => 'update document expense', 'group_name_id' => 6, 'description' => 'To update expense documents']);
        $permission_delete_document_expense = Permission::create(['name' => 'delete document expense', 'group_name_id' => 6, 'description' => 'To delete expense documents']);

        // Permisos para la categoría "User"
        $permission_create_user = Permission::create(['name' => 'create user', 'group_name_id' => 7, 'description' => 'To create users']);
        $permission_read_user = Permission::create(['name' => 'read user', 'group_name_id' => 7, 'description' => 'To see users']);
        $permission_update_user = Permission::create(['name' => 'update user', 'group_name_id' => 7, 'description' => 'To update users']);
        $permission_delete_user = Permission::create(['name' => 'delete user', 'group_name_id' => 7, 'description' => 'To delete users']);

        // Permisos para la categoría "Warehouse"
        $permission_create_warehouse = Permission::create(['name' => 'create warehouse', 'group_name_id' => 8, 'description' => 'To create warehouses']);
        $permission_read_warehouse = Permission::create(['name' => 'read warehouse', 'group_name_id' => 8, 'description' => 'To see warehouses']);
        $permission_update_warehouse = Permission::create(['name' => 'update warehouse', 'group_name_id' => 8, 'description' => 'To update warehouses']);
        $permission_delete_warehouse = Permission::create(['name' => 'delete warehouse', 'group_name_id' => 8, 'description' => 'To delete warehouses']);

        // Permisos para la categoría "Accounting"
        $permission_create_accounting = Permission::create(['name' => 'create accounting', 'group_name_id' => 9, 'description' => 'To create accounting entries']);
        $permission_read_accounting = Permission::create(['name' => 'read accounting', 'group_name_id' => 9, 'description' => 'To see accounting entries']);
        $permission_update_accounting = Permission::create(['name' => 'update accounting', 'group_name_id' => 9, 'description' => 'To update accounting entries']);
        $permission_delete_accounting = Permission::create(['name' => 'delete accounting', 'group_name_id' => 9, 'description' => 'To delete accounting entries']);

        // Permisos para la categoría "Customer"
        $permission_create_customer = Permission::create(['name' => 'create customer', 'group_name_id' => 10, 'description' => 'To create customers']);
        $permission_read_customer = Permission::create(['name' => 'read customer', 'group_name_id' => 10, 'description' => 'To see customers']);
        $permission_update_customer = Permission::create(['name' => 'update customer', 'group_name_id' => 10, 'description' => 'To update customers']);
        $permission_delete_customer = Permission::create(['name' => 'delete customer', 'group_name_id' => 10, 'description' => 'To delete customers']);

        // Permisos para la categoría "Provider"
        $permission_create_provider = Permission::create(['name' => 'create provider', 'group_name_id' => 11, 'description' => 'To create providers']);
        $permission_read_provider = Permission::create(['name' => 'read provider', 'group_name_id' => 11, 'description' => 'To see providers']);
        $permission_update_provider = Permission::create(['name' => 'update provider', 'group_name_id' => 11, 'description' => 'To update providers']);
        $permission_delete_provider = Permission::create(['name' => 'delete provider', 'group_name_id' => 11, 'description' => 'To delete providers']);

        // Permisos para la categoría "Address"
        $permission_create_address = Permission::create(['name' => 'create address', 'group_name_id' => 12, 'description' => 'To create addresses']);
        $permission_read_address = Permission::create(['name' => 'read address', 'group_name_id' => 12, 'description' => 'To see addresses']);
        $permission_update_address = Permission::create(['name' => 'update address', 'group_name_id' => 12, 'description' => 'To update addresses']);
        $permission_delete_address = Permission::create(['name' => 'delete address', 'group_name_id' => 12, 'description' => 'To delete addresses']);

        // Permisos para la categoría "Phone"
        $permission_create_phone = Permission::create(['name' => 'create phone', 'group_name_id' => 13, 'description' => 'To create phones']);
        $permission_read_phone = Permission::create(['name' => 'read phone', 'group_name_id' => 13, 'description' => 'To see phones']);
        $permission_update_phone = Permission::create(['name' => 'update phone', 'group_name_id' => 13, 'description' => 'To update phones']);
        $permission_delete_phone = Permission::create(['name' => 'delete phone', 'group_name_id' => 13, 'description' => 'To delete phones']);

        // Permisos para la categoría "Email"
        $permission_create_email = Permission::create(['name' => 'create email', 'group_name_id' => 14, 'description' => 'To create emails']);
        $permission_read_email = Permission::create(['name' => 'read email', 'group_name_id' => 14, 'description' => 'To see emails']);
        $permission_update_email = Permission::create(['name' => 'update email', 'group_name_id' => 14, 'description' => 'To update emails']);
        $permission_delete_email = Permission::create(['name' => 'delete email', 'group_name_id' => 14, 'description' => 'To delete emails']);

        // Permisos para la categoría "Bank account"
        $permission_create_bank_account = Permission::create(['name' => 'create bank account', 'group_name_id' => 15, 'description' => 'To create bank accounts']);
        $permission_read_bank_account = Permission::create(['name' => 'read bank account', 'group_name_id' => 15, 'description' => 'To see bank accounts']);
        $permission_update_bank_account = Permission::create(['name' => 'update bank account', 'group_name_id' => 15, 'description' => 'To update bank accounts']);
        $permission_delete_bank_account = Permission::create(['name' => 'delete bank account', 'group_name_id' => 15, 'description' => 'To delete bank accounts']);

        // Permisos para la categoría "Productos"
        $permission_create_product = Permission::create(['name' => 'create product', 'group_name_id' => 16, 'description' => 'To create products']);
        $permission_read_product = Permission::create(['name' => 'read product', 'group_name_id' => 16, 'description' => 'To see products']);
        $permission_update_product = Permission::create(['name' => 'update product', 'group_name_id' => 16, 'description' => 'To update products']);
        $permission_delete_product = Permission::create(['name' => 'delete product', 'group_name_id' => 16, 'description' => 'To delete products']);
        
        //Permisos admin
        $permissions_admin = [
            $permission_create_consulting, $permission_update_consulting, $permission_delete_consulting,
            $permission_create_admin, $permission_read_admin, $permission_update_admin, $permission_delete_admin
        ];

        //Permisos company
        $permissions_company = [
            $permission_read_company, 
            $permission_read_document_income, $permission_create_document_income, $permission_update_document_income, $permission_delete_document_income,
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
        

        // Permisos demo
        $permissions_demo = [
            $permission_create_document_expense, $permission_read_document_expense, $permission_update_document_expense, $permission_delete_document_expense,
            $permission_create_warehouse, $permission_read_warehouse, $permission_update_warehouse, $permission_delete_warehouse,
            $permission_create_accounting, $permission_read_accounting, $permission_update_accounting, $permission_delete_accounting,
            $permission_create_provider, $permission_read_provider, $permission_update_provider, $permission_delete_provider
        ];
        
        $role_company->syncPermissions($permissions_company);
        $role_consulting->syncPermissions($permissions_company,$permissions_consulting);
        $role_admin->syncPermissions($permissions_admin,$permissions_company,$permissions_consulting);
        $role_demo->syncPermissions($permissions_company, $permissions_demo);
        
    }
}

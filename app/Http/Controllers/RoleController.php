<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;



class RoleController extends Controller
{

    public function __construct()
    {
        
        $this->middleware(['can:read roles'])->only('index', 'show', 'getId');
        $this->middleware(['can:create roles'])->only('create', 'store');
        $this->middleware(['can:update roles'])->only('edit', 'addPermission', 'assignRole','update');
        $this->middleware(['can:delete roles'])->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {    
            

            // if ($user->hasRole('admin')) {
            //     $rawUsers = DB::table('users')
            //     ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            //     ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            //     ->leftJoin('users as creator', 'users.user_who_created', '=', 'creator.id')
            //     ->leftJoin('users as modifier', 'users.user_who_modified', '=', 'modifier.id')
            //     ->leftJoin('companies_users', 'users.id', '=', 'companies_users.user_id')
            //     ->select(
            //         'users.*',
            //         'roles.name as role_type',
            //         'creator.name as user_who_created',
            //         'modifier.name as user_who_modified',
            //         'companies_users.company_id as company_ID'
            //     )
            //     ->where('users.id', '<>', 1) // Usa <> para "not equal" en lugar de whereNot
            //     ->orderBy('users.id')
            //     ->whereNull('users.dt_end')
            //     ->whereNull('companies_users.dt_end')
            //     ->get();

            //     $users = $rawUsers->groupBy('id')->map(function ($group) {
            //         $first = $group->first(); // Obtén el primer registro del grupo
            //         // Agrega `company_ID` como un array único
            //         $first->company_ID = $group->pluck('company_ID')->unique()->values()->toArray();
            //         return $first;
            //     })->values();
                
            //     return Inertia::render('Users/Partials/TableUser', ['users' => $users]);
            // }
            
            $data = $this->getId();
            $owner_id = $data['owner_id'];
            $roles = $data['roles'];
            
            // Obtener el usuario utilizando el ID
            $user = User::find($owner_id);

            if ($user) {
                // Obtener los permisos del usuario
                $permissions = $user->getAllPermissions();
                
                
            }
            
            $permissions_with_group_names = DB::table('permissions')
            ->join('permission_group_names', 'permissions.group_name_id', '=', 'permission_group_names.id')
            ->select('permissions.*', 'permission_group_names.name as group_name')
            ->whereIn('permissions.id', $permissions->pluck('id'))
            ->get();
    
            $result = [
                'roles' => $roles,
                'permission_group_names' => $permissions_with_group_names
            ];


            return Inertia::render('Roles/Partials/TableRole', ['result' => $result]);
        
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index Roles: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        try {
            DB::beginTransaction();
            
            $user_id = Auth::id();

            $owner_id = DB::table('companies_users')
            ->select (
                'user_id as owner_id',
            )
            ->where('companies_users.is_owner', true)
            ->whereIn('companies_users.company_id', function($query) use ($user_id) {
                $query->select('company_id')
                    ->from('companies_users')
                    ->where('user_id',$user_id);
            })
            ->first();


            $role = Role::create(['name' => $request->name, 'guard_name' => 'web', 'user_id' => $owner_id->owner_id]); 

            DB::commit();
            

            return response()->json(['message' => 'It has been created correctly.','type' => 'success', 'role' => $role]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when creating.','type' => 'error']);
        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $role = Role::find($id);

            if (!$role) {
                return response()->json(['error' => 'Role not found'], 404);
            }

            $permissions = $role->permissions;
            
            return response()->json(['permissions' => $permissions]);
    
        } catch (Exception $e) {

            return response()->json(['message' => 'Error when loading role.','type' => 'error']);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        try {
            DB::beginTransaction();

            DB::table('roles')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
            ]);


            DB::commit();
            

            return response()->json(['message' => 'It has been created correctly.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when creating.','type' => 'error']);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            
            DB::table('roles')
            ->where('id', $id)
            ->update([
                'dt_end' => now()
            ]);

            DB::commit();
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error deleting.','type' => 'error']);
        }
    }

    
    public function addPermission ($roleID, $permissionID) {
        try {

        
        $role = Role::find($roleID);
        $permission = Permission::find($permissionID);


        if (!$role || !$permission) {
            return response()->json(['message' => 'Role or permission not found', 'type'=>'error']);
        }

        $exists = DB::table('role_has_permissions')
            ->where('role_id', $roleID)
            ->where('permission_id', $permissionID)
            ->exists();

        if ($exists) {
            DB::table('role_has_permissions')
                ->where('role_id', $roleID)
                ->where('permission_id', $permissionID)
                ->delete();
            
                return response()->json(['message' => 'It has been successfully extracted.','type' => 'success']);
        } else {
            DB::table('role_has_permissions')
                ->insert([
                    'role_id' => $roleID,
                    'permission_id' => $permissionID
                ]);

            return response()->json(['message' => 'It has been successfully added.','type' => 'success']);
        }
    } catch (Exception $e) {
        return response()->json(['message' => 'Role not updated', 'type'=>'error']);
    }
    }

    public function getId () {
        $user_id = Auth::id();

        $owner_id = DB::table('companies_users')
        ->select (
            'user_id as owner_id',
        )
        ->where('companies_users.is_owner', true)
        ->whereIn('companies_users.company_id', function($query) use ($user_id) {
            $query->select('company_id')
                ->from('companies_users')
                ->where('user_id',$user_id);
        })
        ->first();
        
        $roles = DB::table('roles')
        ->select('roles.*')
        ->where('user_id',$owner_id->owner_id)
        ->whereNull('dt_end')
        ->get();
        

        return [
            'owner_id' => $owner_id->owner_id,
            'roles' => $roles
        ];
    }

    public function assignRole () {
        $roles = $this -> getId();

        return response()->json(['message' => 'It has been successfully added.','roles' => $roles]);
    }
}

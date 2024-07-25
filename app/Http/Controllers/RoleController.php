<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware(['can:read company'])->only('index');
        $this->middleware(['can:create company'])->only('create');
        $this->middleware(['can:create company'])->only('store');
        $this->middleware(['can:read company'])->only('show');
        $this->middleware(['can:update company'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete company'])->only('destroy');
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
            ->get();
    
            // Obtener el usuario utilizando el ID
            $user = User::find($owner_id->owner_id);

            if ($user) {
                // Obtener los permisos del usuario
                $permissions = $user->getAllPermissions();
                
                
            }

            //$permission_group_name_ids = $permissions->pluck('group_name_id');
            
            $permissions_with_group_names = DB::table('permissions')
            ->join('permission_group_names', 'permissions.group_name_id', '=', 'permission_group_names.id')
            ->select('permissions.*', 'permission_group_names.name as group_name')
            ->whereIn('permissions.id', $permissions->pluck('id'))
            ->get();
    
            $result = [
                'role_id' => $roles,
                'permissions' => $permissions,
                'permission_group_names' => $permissions_with_group_names
            ];


            return Inertia::render('Roles/Partials/TableRole', ['result' => $result]);
        
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index Roles: ' . $e->getMessage()], 500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

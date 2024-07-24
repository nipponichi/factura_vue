<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
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
            
            $user = auth()->user();

            if ($user->hasRole('admin')) {
                $rawUsers = DB::table('users')
                ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
                ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->leftJoin('users as creator', 'users.user_who_created', '=', 'creator.id')
                ->leftJoin('users as modifier', 'users.user_who_modified', '=', 'modifier.id')
                ->leftJoin('companies_users', 'users.id', '=', 'companies_users.user_id')
                ->select(
                    'users.*',
                    'roles.name as role_type',
                    'creator.name as user_who_created',
                    'modifier.name as user_who_modified',
                    'companies_users.company_id as company_ID'
                )
                ->where('users.id', '<>', 1) // Usa <> para "not equal" en lugar de whereNot
                ->orderBy('users.id')
                ->whereNull('users.dt_end')
                ->whereNull('companies_users.dt_end')
                ->get();

                $users = $rawUsers->groupBy('id')->map(function ($group) {
                    $first = $group->first(); // Obtén el primer registro del grupo
                    // Agrega `company_ID` como un array único
                    $first->company_ID = $group->pluck('company_ID')->unique()->values()->toArray();
                    return $first;
                })->values();
                
                return Inertia::render('Users/Partials/TableUser', ['users' => $users]);
            }
            
            $rawUsers = DB::table('users as main')
            ->leftJoin('model_has_roles', 'main.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->leftJoin('users as creator', 'main.user_who_created', '=', 'creator.id')
            ->leftJoin('users as modifier', 'main.user_who_modified', '=', 'modifier.id')
            ->leftJoin('companies_users', 'main.id', '=', 'companies_users.user_id')
            ->select(
                'main.*',
                'roles.name as role_type',
                'creator.name as user_who_created',
                'modifier.name as user_who_modified',
                'companies_users.company_id as company_ID'
            )
            ->whereNull('main.dt_end')
            ->whereNull('companies_users.dt_end')
            ->whereIn('main.id', function($query) use ($user) {
                $query->select('user_id')
                    ->from('companies_users')
                    ->whereIn('company_id', function($subQuery) use ($user) {
                        $subQuery->select('company_id')
                            ->from('companies_users')
                            ->where('user_id', $user->id);
                    });
            })
            ->orderBy('main.id')
            ->get();

            // Agrupación en PHP
            $users = $rawUsers->groupBy('id')->map(function ($group) {
                $first = $group->first();
                $first->company_ID = $group->pluck('company_ID')->unique()->values()->toArray();
                return $first;
            })->values();

            

            
        
            
            return Inertia::render('Users/Partials/TableUser', ['users' => $users]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
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
    public function store(UserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user_id = Auth::id(); 
            $pass = $request->password;
            $confirmPass = $request->confirmPassword;
            $role_type = $request->role_type;
            
            if($pass != $confirmPass) {
                return response()->json(['message' => 'Password does not match' , 'type' => 'warning']);
            }

            if($role_type == null) {
                return response()->json(['message' => 'You must select a user role','type' => 'warning']);
            }

            // Check if the user already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json(['message' => 'User already registered with this email', 'type' => 'warning']);
            }

            // Crear el nuevo usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($pass),
                'user_who_created' => $user_id,
                'user_who_modified' => $user_id,
                'isActive' => 1,
                'created_at' => now(),
                'dt_start' => now(),
            ]);
    
            // Asignar el rol al usuario
            $user ->assignRole($role_type);
            
            foreach ($request->selectedCompany as $company) {
                DB::table('companies_users')->insert([
                    'user_id' => $user->id,
                    'company_id' => $company['id'],
                    'dt_start' => now(),
                ]);
            }

            $userDetails = DB::table('users as main')
            ->leftJoin('model_has_roles', 'main.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->leftJoin('users as creator', 'main.user_who_created', '=', 'creator.id')
            ->leftJoin('users as modifier', 'main.user_who_modified', '=', 'modifier.id')
            ->select(
                'main.*',
                'roles.name as role_type',
                'creator.name as user_who_created',
                'modifier.name as user_who_modified'
            )
            ->where('main.id', $user->id)
            ->first();
        
            $companyIDs = DB::table('companies_users')
            ->where('user_id', $user->id)
            ->pluck('company_id')
            ->toArray();
            
            $userSave = [
                'id' => $userDetails->id,
                'name' => $userDetails->name,
                'email' => $userDetails->email,
                'isActive'=> $userDetails->isActive,
                'role_type' => $userDetails->role_type,
                'user_who_created' => $userDetails->user_who_created,
                'user_who_modified' => $userDetails->user_who_modified,
                'company_ID' => $companyIDs
            ];


            DB::commit();
            return response()->json(['message' => 'User successfully created','type' => 'success', 'user' => $userSave]);
            
        }catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error creating user' ,'type' => 'error']);
        }
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
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
    
        try {
            DB::beginTransaction();
            $modifier_user = Auth::id();
            $user = User::find($id);
            $selected_companies_id = $request->selectedCompany;

            if (!$user) {
                return response()->json(['message' => 'User not found', 'type' => 'error']);
            }

            
            DB::table('users')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'email' => $request->email,
                'user_who_modified' => $modifier_user,
                'updated_at' => now(),
            ]);
            
            $user->syncRoles([$request->role_type]);    

            
            DB::table('companies_users')
            ->where('user_id', $user->id)
            ->update([
                'dt_end' => now(),
            ]);
    

            foreach ($request->selectedCompany as $company) {
                DB::table('companies_users')->insert([
                    'user_id' => $user->id,
                    'company_id' => $company['id'],
                    'dt_start' => now(),
                ]);
            }
        
            DB::commit();        
            return response()->json(['message' => 'Successfully updated.', 'type' => 'success']);
        

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when updating.', 'type' => 'error']);
        }
    }

    public function resetPass(PasswordRequest $request, string $id) {
        try {
            DB::beginTransaction();
            
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found', 'type' => 'error']);
            }

            $pass = $request->password;
            $confirmPass = $request->confirmPassword;
            
            if($pass != $confirmPass) {
                return response()->json(['message' => 'Password does not match' , 'type' => 'warning']);
            }

            DB::table('users')
            ->where('id', $id)
            ->update([
                'password' => bcrypt($pass),
                'updated_at' => now(),
            ]);

            DB::commit();        
            
            return response()->json(['message' => 'Password successfully modified', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error updating user password' ,'type' => 'error']);
        }
        
    }

    public function userActive($id)
    {
        try {
            DB::beginTransaction();
            
            $user = User::find($id);
    
            if (!$user) {
                return response()->json(['message' => 'User not found', 'type' => 'error']);
            }
    
            // Alternar el estado de isActive
            $user->isActive = !$user->isActive;
            $user->update();
            
            DB::commit();
            return response()->json(['message' => 'User status updated', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error updating user status' ,'type' => 'error']);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {

            DB::beginTransaction();
            $user = User::find($id);
            $user->delete();

            DB::commit();
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error deleting: ' . $e->getMessage(), 'type' => 'error']);
        }
    }
    

}


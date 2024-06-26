<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUserRequest;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\DB;


class AdminUsersController extends Controller
{
    public function __construct()
    {       
        $this->middleware(function ($request, $next) {
            if (!auth()->user()->hasRole('admin')) {
                abort(403, 'No tienes permiso para acceder a esta página.');
            }
            
            return $next($request);
        });   
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {    
            $users = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select('users.id', 'users.name as name', 'users.email', 'roles.name as role_type', 'users.dt_end as active')
            ->orderBy('users.id')
            ->whereNot('users.id',1)
            ->get();

            
            return Inertia::render('Admin/UsersAdmin', ['users' => $users]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
        }
        
    }

    public function reload()
    {
        try {    
            $users = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select('users.id', 'users.name as name', 'users.email', 'roles.name as role_type', 'users.dt_end as active')
            ->orderBy('users.id')
            ->whereNot('users.id',1)
            ->get();

            
            return response()->json(['message' => 'La compañía se ha creado correctamente', 'users' => $users]);
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
    public function store(AdminUserRequest $request)
    {
    
        DB::beginTransaction();
        try {

            $pass = $request->password;
            $confirmPass = $request->confirmPassword;
            $role_type = $request->role_type;
            
            if($pass != $confirmPass) {
                return response()->json(['message' => 'El password no coincide']);
            }

            if($role_type == null) {
                return response()->json(['message' => 'Debe seleccionar un rol de usuario']);
            }

            // Crear el nuevo usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($pass),
                'created_at' => now(),
                'dt_start' => now(),
            ]);

            // Asignar el rol al usuario
            $user->assignRole($role_type);

        DB::commit();
        return response()->json(['message' => 'El usuario se ha creado correctamente']);
        
    }catch (Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
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
            
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            
            DB::table('users')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'email' => $request->email,
                'updated_at' => now(),
            ]);
            
            $user->syncRoles([$request->role_type]);    
            DB::commit();        
            return response()->json(['message' => 'Usuario modificado']);
        

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al editar usuario: ' . $e->getMessage()], 500);
        }
    }

    public function resetPass(PasswordRequest $request, string $id) {
        try {
            DB::beginTransaction();
            
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            $pass = $request->password;
            $confirmPass = $request->confirmPassword;
            
            if($pass != $confirmPass) {
                return response()->json(['message' => 'El password no coincide']);
            }

            DB::table('users')
            ->where('id', $id)
            ->update([
                'password' => bcrypt($pass),
                'updated_at' => now(),
            ]);

            DB::commit();        
            return response()->json(['message' => 'Contraseña modificada correctamente',]);
        

        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al editar usuario: ' . $e->getMessage()], 500);
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
            $user->dt_end = $user->dt_end ? null : now();
            $user->update();
            
            DB::commit();
            return response()->json(['message' => 'Usuario eliminado']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error eliminando usuario: ' . $e->getMessage()], 500);
        }
    }
    

}


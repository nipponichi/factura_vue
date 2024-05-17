<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
            ->select('users.id', 'users.name as userName', 'users.email', 'roles.name as roleName', 'users.dt_end as active')
            ->orderBy('users.id')
            ->whereNot('users.id',1)
            ->get();

            
            return Inertia::render('Admin/UsersAdmin', ['users' => $users]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
        }
        
    }

    public function recargar()
    {
        try {    
            $users = DB::table('users')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select('users.id', 'users.name as userName', 'users.email', 'roles.name as roleName', 'users.dt_end as active')
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
    public function store(Request $request)
    {
      /* try {
        
        $user_id = Auth::id();
        $company = new Company($request->validated());
        $company->user_id = $user_id;
        $company->save();

        //return Inertia::render('Companies/Index');
        return response()->json(['message' => 'La compañía se ha creado correctamente', 'company' => $company]);
        
    }catch (Exception $e) {
        // Devuelve una respuesta JSON con un mensaje de error
        return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
    }*/
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

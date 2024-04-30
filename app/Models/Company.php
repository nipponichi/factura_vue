<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'taxNumber', 
        'address1', 
        'address2', 
        'email', 
        'phone1', 
        'phone2',
        'province', 
        'town', 
        'postCode',
        'country'
    ];


    
    public function users(){
        return $this -> belongsTo(User::class);
    }

    public function details(){
        return $this -> belongsTo(Company::class);
    }

    
    public function customers() {
        return $this -> hasMany(Customer::class);
    }

    public function invoices() {
        return $this -> hasMany(Invoice::class);
    }
}

/* GUIA
$userProfile = UserProfile::find($id); // Obtener el perfil del usuario
$user = $userProfile->users; // Obtener el usuario relacionado

// Acceder a los clientes y facturas relacionados con el usuario
$clientes = $user->customers;
$facturas = $user->invoices;
 */

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name', 
        'taxNumber', 
        'address', 
        'email', 
        'phone', 
        'province', 
        'town', 
        'postCode',
        'country'
    ];

    public function users(){
        return $this -> belongsTo(User::class);
    }

    public function products() {
        return $this -> hasMany(Product::class);
    }

    public function invoices() {
        return $this ->hasMany(Invoice::class);
    }
}

/* GUIA
$userProfile = UserProfile::find($id); // Obtener el perfil del usuario
$user = $userProfile->users; // Obtener el usuario relacionado

// Acceder a los clientes y facturas relacionados con el usuario
$clientes = $user->customers;
$facturas = $user->invoices;
 */

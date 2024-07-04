<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = ['name', 'taxNumber', 'address1', 'address2', 'email', 'phone1', 'phone2','province', 'town', 'postCode'];

    public function companies() {
        return $this->belongsTo(Company::class);  
    }

    public function customerOfCustomers() {
        return $this->hasMany(CustomerOfCustomer::class);
    }

    public function invoices() {
        return $this -> hasMany(Invoice::class);
    }
        
}

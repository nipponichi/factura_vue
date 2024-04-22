<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerOfCustomer extends Model
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

        // Tiene customer_id foránea
        public function customers(){
            return $this->belongsTo(Customer::class);
        }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'number', 
        'company_id', 
        'customer_id', 
        'date', 
        'amount', 
        'type', 
        'isPaid', 
        'active',
        'design_id'
    ];

    public function companies() {
        return $this -> belongsTo(Company::class);
    }

}

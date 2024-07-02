<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
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

    public function products() {
        return $this -> hasMany(Product::class);
    }

}

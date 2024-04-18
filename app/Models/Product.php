<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [];

    public function companies() {
        return $this -> belongsTo(Company::class);
    }

    public function customers() {
        return $this -> belongsTo(Customer::class);
    }

}

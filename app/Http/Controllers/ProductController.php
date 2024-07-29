<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller

{
    public function __construct()
    {
        $this->middleware(['can:read product'])->only('index', 'show');
        $this->middleware(['can:create product'])->only('create', 'store');
        $this->middleware(['can:update product'])->only('edit', 'update');
        $this->middleware(['can:delete product'])->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

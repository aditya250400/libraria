<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryFrontResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryFrontController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->latest()
            ->paginate(8);

        return inertia('Front/Categories/Index', [
            'page_setting' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua kategori yang tersedia pada platform ini'
            ],
            'categories' => CategoryFrontResource::collection($categories)->additional([
                'meta' => [
                    'has_pages' => $categories->hasPages(),
                ]
            ])
        ]);
    }
}

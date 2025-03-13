<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;

class PublisherController extends Controller
{
    public function index()
    {
        $publishers = Publisher::query()
            ->select('id', 'name', 'email', 'slug', 'address', 'phone', 'created_at')
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/Publishers/Index', [
            'page_setting' => [
                'title' => 'Penerbit',
                'subtitle' => 'Menampilkan semua data penerbit yang tersedia pada platform ini',

            ],
            'publishers' => PublisherResource::collection($publishers)->additional([
                'meta' =>  ['has_pages' => $publishers->hasPages()],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ]
        ]);
    }
}

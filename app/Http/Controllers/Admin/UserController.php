<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->select(['id', 'name', 'username', 'email', 'avatar', 'gender', 'date_of_birth', 'address', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Admin/Users/Index', [
            'page_setting' => [
                'title' => 'Pengguna',
                'subtitle' => 'Menampilkan semua data pengguna yang tersedia pada platform ini'
            ],
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10

            ]
        ]);
    }
}

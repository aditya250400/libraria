<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RouteAccessRequest;
use App\Http\Resources\Admin\RouteAccessResource;
use App\Models\RouteAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

class RouteAccessController extends Controller
{
    public function index()
    {

        $route_accesses = RouteAccess::query()
            ->select(['id', 'route_name', 'role_id', 'permission_id', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['role', 'permission'])
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/RouteAccesses/Index', [
            'page_setting' => [
                'title' => 'Akses Rute',
                'subtitle' => 'Menampilkan semua data akses rute pada platform',
            ],

            'route_accesses' => RouteAccessResource::collection($route_accesses)->additional([
                'meta' => [
                    'has_pages' => $route_accesses->hasPages(),
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create()
    {
        return inertia('Admin/RouteAccesses/Create', [
            'page_setting' => [
                'title' => 'Tambah Akses Rute',
                'subtitle' => 'Buat akses rute baru di sini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.route-accesses.store'),
            ],
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'routes' => collect(Route::getRoutes())->map(function ($route) {
                return [
                    'value' => $route->getName(),
                    'label' => $route->getName(),
                ];
            })->filter(),
        ]);
    }

    public function store(RouteAccessRequest $request)
    {
        try {
            $role = Role::query()->where('name', $request->role)->first();
            $permission = Permission::query()->where('name', $request->permission)->first();

            RouteAccess::create([
                'route_name' => $request->route_name,
                'role_id' => $role->id ?? null,
                'permission_id' => $permission->id ?? null,
            ]);

            flashMessage(MessageType::CREATED->message('Rute Akses'));

            return to_route('admin.route-accesses.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
            // return to_route('admin.route-accesses.index');
        }
    }
}

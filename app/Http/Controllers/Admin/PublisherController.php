<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Throwable;

class PublisherController extends Controller
{
    use HasFile;

    public function index()
    {
        $publishers = Publisher::query()
            ->select('id', 'name', 'slug', 'email', 'slug', 'address', 'phone', 'created_at')
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

    public function create()
    {
        return inertia('Admin/Publishers/Create', [
            'page_setting' => [
                'title' => 'Tambah penerbit',
                'subtitle' => 'Buat penerbit baru disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.publishers.store')
            ]
        ]);
    }

    public function store(PublisherRequest $request)
    {
        try {
            Publisher::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, 'logo', 'publishers'),
            ]);

            flashMessage(MessageType::CREATED->message('Publisher'));

            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return back();
            // return to_route('admin.publishers.index');
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::query()
            ->select(['id', 'message', 'url', 'is_active', 'created_at'])
            ->paginate(10)
            ->withQueryString();

        return inertia('Admin/Announcements/Index', [
            'page_setting' => [
                'title' => 'Pengumuman',
                'subtitle' => 'Menampilkan semua data penggumuman yang tersedia pada platform ini'
            ],
            'announcements' => AnnouncementResource::collection($announcements)->additional([
                'meta' => [
                    'has_pages' => $announcements->hasPages(),
                ]
            ]),
        ]);
    }
}

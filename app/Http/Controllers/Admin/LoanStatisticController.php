<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoanStatisticController extends Controller
{
    public function index()
    {
        return inertia('Admin/LoanStatistics/Index', [
            'page_setting' => [
                'title' => 'Statistik Peminjaman',
                'subtitle' => 'Menampilkan statistik peminjaman yang tersedia pada platform ini'
            ],
        ]);
    }
}

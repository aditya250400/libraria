<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\StockResource;
use App\Models\Stock;
use Illuminate\Http\Request;

class BookStockReportController extends Controller
{
    public function index()
    {
        $stocks = Stock::query()
            ->select(['stocks.id', 'book_id', 'total', 'available', 'loan', 'lost', 'damage', 'stocks.created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Admin/BookStockReports/Index', [
            'page_setting' => [
                'title' => 'Laporan Stok Buku',
                'subtitle' => 'Menampilkan laporan stock buku yang tersedia pada platform ini'
            ],
            'stocks' => StockResource::collection($stocks)->additional([
                'meta' => [
                    'has_pages' => $stocks->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ]
        ]);
    }
}

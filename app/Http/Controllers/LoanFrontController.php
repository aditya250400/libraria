<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanFrontResource;
use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanFrontController extends Controller
{
    public function index()
    {
        $authUser = Auth::user();
        $loans = Loan::query()
            ->select(['id', 'loan_code', 'user_id', 'book_id', 'loan_date', 'due_date', 'created_at'])
            ->where('user_id', $authUser->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'user'])
            ->latest()
            ->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Front/Loans/Index', [
            'page_setting' => [
                'title' => 'Peminjaman',
                'subtitle' => 'Menampilkan semua data peminjaman anda yan tersedia pada platform ini'
            ],
            'loans' => LoanFrontResource::collection($loans)->additional([
                'meta' => [
                    'has_pages' => $loans->hasPages(),
                ]
            ]),
            'state' => [
                'search' => request()->search ?? '',
                'page' => request()->page ?? 1,
                'load' => 10
            ]
        ]);
    }
}

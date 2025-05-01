<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReturnBookFrontResource;
use App\Models\ReturnBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReturnBookFrontController extends Controller
{
    public function index()
    {
        $authUser = Auth::user();

        $return_books = ReturnBook::query()
            ->select(['id', 'return_book_code', 'status', 'loan_id', 'user_id', 'book_id', 'return_date', 'created_at'])
            ->where('user_id', $authUser->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest()
            ->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Front/ReturnBooks/Index', [
            'page_setting' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian anda'
            ],
            'return_books' => ReturnBookFrontResource::collection($return_books)->additional([
                'meta' => [
                    'has_pages' => $return_books->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
            'page_data' => [
                'returned' => ReturnBook::query()->member($authUser->id)->returned()->count(),
                'fine' => ReturnBook::query()->member($authUser->id)->fine()->count(),
                'checked' => ReturnBook::query()->member($authUser->id)->checked()->count(),
            ]
        ]);
    }
}

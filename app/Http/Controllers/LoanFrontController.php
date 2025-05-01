<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanFrontResource;
use App\Models\Book;
use App\Models\Loan;
use Carbon\Carbon;
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

    public function store(Book $book)
    {
        $authUser = Auth::user();

        if (Loan::checkLoanBook($authUser->id, $book->id)) {
            flashMessage('Anda sudah meminjam buku ini, harap kembalikan bukunya terlebih dahulu', 'error');
            return to_route('front.books.show', $book->slug);
        }
        if ($book->stock->available <= 0) {
            flashMessage('Stock buku tidak tersedia', 'error');
            return to_route('front.books.show', $book->slug);
        }

        $loan = tap(Loan::create([
            'loan_code' => str()->lower(str()->random(10)),
            'user_id' => $authUser->id,
            'book_id' => $book->id,
            'loan_date' => Carbon::now()->toDateString(),
            'due_date' => Carbon::now()->addDays(7)->toDateString(),
        ]), function ($loan) {
            $loan->book->stock_loan();
            flashMessage('Berhasil melakukan peminjaman buku');
        });

        return to_route('front.loans.index');
    }
}

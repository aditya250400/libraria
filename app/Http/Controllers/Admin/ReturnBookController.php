<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\ReturnBookCondition;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReturnBookRequest;
use App\Http\Resources\Admin\ReturnBookResource;
use App\Models\FineSetting;
use App\Models\Loan;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Throwable;

class ReturnBookController extends Controller
{
    public function index()
    {
        $return_books = ReturnBook::query()
            ->select(['id', 'return_book_code', 'status', 'loan_id', 'user_id', 'book_id', 'return_date', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest()
            ->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Admin/ReturnBooks/Index', [
            'page_setting' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian yang tersedia pada platform ini'
            ],
            'return_books' => ReturnBookResource::collection($return_books)->additional([
                'meta' => [
                    'has_pages' => $return_books->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
            'conditions' => ReturnBookCondition::options(),
        ]);
    }

    public function create(Loan $loan)
    {
        if ($loan->returnBook()->exists()) {
            return to_route('admin.loans.index');
        }

        if (!FineSetting::first()) {
            return to_route('admin.fine-settings.create');
        }

        return inertia('Admin/ReturnBooks/Create', [
            'page_setting' => [
                'title' => 'Pengembalian Buku',
                'subtitle' => 'Kembalikan buku yang dipinjam disini. Klik kembalikan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.return-books.store', $loan)
            ],
            'loan' =>  [
                'id' => $loan->id,
                'loan_code' => $loan->loan_code,
                'loan_date' => Carbon::parse($loan->loan_date)->toDateString(),
                'due_date' => Carbon::parse($loan->due_date)->toDateString(),
                'user' => $loan->user,
                'book' => $loan->book->load('publisher'),
            ],
            'date' => [
                'return_date' => Carbon::now()->toDateString(),
            ],
            'conditions' => ReturnBookCondition::options(),
        ]);
    }

    public function store(Loan $loan, ReturnBookRequest $request)
    { {
            try {

                $return_book = $loan->returnBook()->create([
                    'return_book_code' => str()->lower(str()->random(10)),
                    'book_id' => $loan->book_id,
                    'user_id' => $loan->user_id,
                    'return_date' => Carbon::today(),
                ]);

                $return_book_check = $return_book->returnBookCheck()->create([
                    'condition' => $request->condition,
                    'notes' => $request->notes,
                ]);

                match ($return_book_check->condition->value) {
                    ReturnBookCondition::GOOD->value => $return_book->book->stock_loan_return(),
                    ReturnBookCondition::LOST->value => $return_book->book->stock_lost(),
                    ReturnBookCondition::DAMAGE->value => $return_book->book->stock_damaged(),
                    default => flashMessage('Kondisi Buku Tidak sesuai', 'error'),
                };
                flashMessage('Berhasil mengembalikan buku');

                return to_route('admin.return-books.index');
            } catch (Throwable $e) {
                flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
                return to_route('admin.loans.index');
                // return to_route('admin.books.index');
            }
        }
    }
}

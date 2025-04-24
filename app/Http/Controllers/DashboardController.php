<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\TransactionLoanResource;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Models\Book;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $authUser = Auth::user();

        $loans = Loan::query()
            ->select(['id', 'loan_code', 'book_id', 'user_id', 'created_at'])
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {
                return $query;
            }, function ($query) {
                return $query->where('user_id', auth()->user()->id);
            })->latest()->limit(5)->with(['user', 'book'])->get();

        $return_books = ReturnBook::query()
            ->select(['id', 'return_book_code', 'book_id', 'user_id', 'created_at'])
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {
                return $query;
            }, function ($query) {
                return $query->where('user_id', auth()->user()->id);
            })->latest()->limit(5)->with(['user', 'book'])->get();

        return inertia('Dashboard', [
            'page_setting' => [
                'title' => 'Dashboard',
                'subtitle' => 'Menampilkan semua statistik pada platform ini',
            ],
            'page_data' => [
                'loans' => TransactionLoanResource::collection($loans),
                'return_books' => TransactionReturnBookResource::collection($return_books),
                'total_books' => auth()->user()->hasAnyRole(['admin', 'operator']) ? Book::count() : 0,
                'total_users' => auth()->user()->hasAnyRole(['admin', 'operator']) ? User::count() : 0,
                'total_loans' => Loan::query()
                    ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {
                        return $query;
                    }, function ($query) {
                        return $query->where('user_id', auth()->user()->id);
                    })->count(),
                'total_returns' => ReturnBook::query()
                    ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {
                        return $query;
                    }, function ($query) {
                        return $query->where('user_id', auth()->user()->id);
                    })->count(),
                'total_fines' => auth()->user()->hasRole('member') ? Fine::query()
                    ->where('user_id', auth()->user()->id)->sum('total_fee') : 0,
            ]
        ]);
    }
}

<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Illuminate\Database\Eloquent\Model;

class ReturnBook extends Model
{
    protected $guarded = [];


    protected $cast = [
        'status' => ReturnBookStatus::class,
        'return_date' => 'date',
    ];
}

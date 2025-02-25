<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $guarded = [];


    protected function casts()
    {
        return [
            'language' => BookLanguage::class,
            'status' => BookStatus::class,
        ];
    }
}

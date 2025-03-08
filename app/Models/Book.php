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

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }
}

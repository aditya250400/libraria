<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('total')->default(0);
            $table->unsignedInteger('available')->default(0);
            $table->unsignedInteger('loan')->default(0);
            $table->unsignedInteger('lost')->default(0);
            $table->unsignedInteger('damage')->default(0);
            $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};

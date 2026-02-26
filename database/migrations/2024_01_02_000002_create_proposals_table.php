<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('biodata_id')->constrained('biodatas')->onDelete('cascade');

            $table->text('why_prefer'); // কেন পছন্দ করেছেন
            $table->text('kabin_nama_expectations')->nullable(); // কাবিননামা প্রত্যাশা
            $table->text('gold_jewelry_expectations')->nullable(); // স্বর্ণালঙ্কার প্রত্যাশা

            $table->enum('status', ['pending', 'approved', 'rejected', 'chat_allowed'])->default('pending');
            $table->text('admin_note')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};

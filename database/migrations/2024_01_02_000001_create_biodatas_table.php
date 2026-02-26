<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('biodatas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Basic Info
            $table->enum('biodata_type', ['bride', 'groom']); // পাত্রী / পাত্র
            $table->date('date_of_birth');
            $table->enum('marital_status', ['unmarried', 'divorced', 'widowed', 'separated']);
            // অবিবাহিত, তালাকপ্রাপ্ত, বিধবা/বিপত্নীক, বিচ্ছিন্ন
            $table->string('religion'); // ধর্ম
            $table->string('height')->nullable(); // উচ্চতা
            $table->string('weight')->nullable(); // ওজন
            $table->string('complexion')->nullable(); // গাত্রবর্ণ
            $table->string('blood_group')->nullable(); // রক্তের গ্রুপ

            // Address
            $table->string('division'); // বিভাগ
            $table->string('district'); // জেলা
            $table->string('upazila'); // উপজেলা
            $table->text('full_address')->nullable(); // সম্পূর্ণ ঠিকানা

            // Permanent Address
            $table->string('permanent_division')->nullable();
            $table->string('permanent_district')->nullable();
            $table->string('permanent_upazila')->nullable();
            $table->text('permanent_address')->nullable();

            // Education
            $table->string('education_level'); // শিক্ষাগত যোগ্যতা
            $table->string('education_detail')->nullable(); // বিস্তারিত

            // Profession
            $table->string('profession'); // পেশা
            $table->string('monthly_income')->nullable(); // মাসিক আয়

            // Family
            $table->string('father_name')->nullable(); // পিতার নাম
            $table->string('father_profession')->nullable(); // পিতার পেশা
            $table->string('mother_name')->nullable(); // মাতার নাম
            $table->string('mother_profession')->nullable(); // মাতার পেশা
            $table->integer('brothers')->default(0); // ভাইয়ের সংখ্যা
            $table->integer('sisters')->default(0); // বোনের সংখ্যা

            // Partner Preferences
            $table->text('partner_age_range')->nullable(); // পাত্র/পাত্রীর বয়স
            $table->text('partner_complexion')->nullable(); // পাত্র/পাত্রীর গাত্রবর্ণ
            $table->text('partner_height')->nullable(); // পাত্র/পাত্রীর উচ্চতা
            $table->text('partner_district')->nullable(); // পাত্র/পাত্রীর জেলা
            $table->text('partner_education')->nullable(); // পাত্র/পাত্রীর শিক্ষাগত যোগ্যতা
            $table->text('partner_profession')->nullable(); // পাত্র/পাত্রীর পেশা

            // Additional
            $table->text('about_me')->nullable(); // নিজের সম্পর্কে
            $table->text('qualities')->nullable(); // যে গুণাবলী আশা করেন
            $table->boolean('is_published')->default(true);
            $table->string('contact_person')->nullable(); // যোগাযোগকারীর নাম
            $table->string('contact_relation')->nullable(); // সম্পর্ক

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('biodatas');
    }
};

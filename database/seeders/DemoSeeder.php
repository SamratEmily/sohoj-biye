<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Biodata;
use App\Models\Proposal;
use App\Models\ChatRoom;
use App\Models\Message;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Approved Users with Biodatas ───────────────────────────────

        // Groom 1
        $groom1 = User::create([
            'name' => 'আরিফ হোসেন',
            'email' => 'arif@demo.com',
            'phone' => '01712345678',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $groom1->id,
            'biodata_type' => 'groom',
            'date_of_birth' => '1997-03-15',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'৮\"",
            'weight' => '৬৮ কেজি',
            'complexion' => 'ফর্সা',
            'blood_group' => 'A+',
            'division' => 'ঢাকা',
            'district' => 'ঢাকা',
            'upazila' => 'ধানমন্ডি',
            'full_address' => 'ধানমন্ডি ২৭, রোড ৫',
            'permanent_division' => 'চট্টগ্রাম',
            'permanent_district' => 'চট্টগ্রাম',
            'permanent_upazila' => 'পটিয়া',
            'permanent_address' => 'পটিয়া, চট্টগ্রাম',
            'education_level' => 'স্নাতকোত্তর (মাস্টার্স)',
            'education_detail' => 'কম্পিউটার সায়েন্স, বুয়েট',
            'profession' => 'সফটওয়্যার ইঞ্জিনিয়ার',
            'monthly_income' => '৮০,০০০ টাকা',
            'father_name' => 'মোঃ করিম হোসেন',
            'father_profession' => 'ব্যবসায়ী',
            'mother_name' => 'ফাতেমা বেগম',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 1,
            'sisters' => 2,
            'about_me' => 'আমি একজন সফটওয়্যার ইঞ্জিনিয়ার। প্রযুক্তি নিয়ে কাজ করতে ভালোবাসি। নামাজ পড়ি, কুরআন তেলাওয়াত করি। ভ্রমণ ও বই পড়া আমার শখ।',
            'contact_person' => 'মোঃ করিম হোসেন',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২১-২৫ বছর',
            'partner_complexion' => 'ফর্সা বা উজ্জ্বল শ্যামলা',
            'partner_height' => "৫'২\" - ৫'৫\"",
            'partner_district' => 'যেকোনো',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'যেকোনো',
            'qualities' => 'দ্বীনদার, শিক্ষিত, পরিবারপ্রিয়',
            'is_published' => true,
        ]);

        // Groom 2
        $groom2 = User::create([
            'name' => 'তানভীর আহমেদ',
            'email' => 'tanvir@demo.com',
            'phone' => '01798765432',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $groom2->id,
            'biodata_type' => 'groom',
            'date_of_birth' => '1995-08-22',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'১০\"",
            'weight' => '৭৫ কেজি',
            'complexion' => 'উজ্জ্বল ফর্সা',
            'blood_group' => 'B+',
            'division' => 'চট্টগ্রাম',
            'district' => 'চট্টগ্রাম',
            'upazila' => 'হাটহাজারী',
            'full_address' => 'হাটহাজারী, চট্টগ্রাম',
            'permanent_division' => 'চট্টগ্রাম',
            'permanent_district' => 'চট্টগ্রাম',
            'permanent_upazila' => 'হাটহাজারী',
            'permanent_address' => 'হাটহাজারী, চট্টগ্রাম',
            'education_level' => 'স্নাতক (অনার্স)',
            'education_detail' => 'ব্যবসায় প্রশাসন, চট্টগ্রাম বিশ্ববিদ্যালয়',
            'profession' => 'ব্যাংকার',
            'monthly_income' => '৫৫,০০০ টাকা',
            'father_name' => 'আবদুল আহমেদ',
            'father_profession' => 'অবসরপ্রাপ্ত সরকারি কর্মকর্তা',
            'mother_name' => 'রহিমা আক্তার',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 2,
            'sisters' => 1,
            'about_me' => 'আমি একজন ব্যাংকার। ইসলামিক ফিন্যান্সে বিশেষভাবে আগ্রহী। নিয়মিত নামাজ আদায় করি। খেলাধুলা ও দানশীলতায় বিশ্বাসী।',
            'contact_person' => 'আবদুল আহমেদ',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২০-২৫ বছর',
            'partner_complexion' => 'যেকোনো',
            'partner_height' => "৫'০\" - ৫'৪\"",
            'partner_district' => 'চট্টগ্রাম',
            'partner_education' => 'ন্যূনতম এইচএসসি',
            'partner_profession' => 'যেকোনো',
            'qualities' => 'পর্দানশীন, নম্র, ধৈর্যশীল',
            'is_published' => true,
        ]);

        // Groom 3
        $groom3 = User::create([
            'name' => 'রাকিব হাসান',
            'email' => 'rakib@demo.com',
            'phone' => '01611223344',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $groom3->id,
            'biodata_type' => 'groom',
            'date_of_birth' => '1993-01-10',
            'marital_status' => 'divorced',
            'religion' => 'ইসলাম',
            'height' => "৫'৭\"",
            'weight' => '৭০ কেজি',
            'complexion' => 'শ্যামলা',
            'blood_group' => 'O+',
            'division' => 'রাজশাহী',
            'district' => 'রাজশাহী',
            'upazila' => 'বোয়ালিয়া',
            'full_address' => 'বোয়ালিয়া, রাজশাহী সিটি',
            'permanent_division' => 'রাজশাহী',
            'permanent_district' => 'রাজশাহী',
            'permanent_upazila' => 'বোয়ালিয়া',
            'permanent_address' => 'রাজশাহী সদর',
            'education_level' => 'পিএইচডি',
            'education_detail' => 'পদার্থবিদ্যা, রাজশাহী বিশ্ববিদ্যালয়',
            'profession' => 'বিশ্ববিদ্যালয় শিক্ষক',
            'monthly_income' => '৬৫,০০০ টাকা',
            'father_name' => 'মোঃ হাসান আলী',
            'father_profession' => 'শিক্ষক',
            'mother_name' => 'সালমা খাতুন',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 0,
            'sisters' => 3,
            'about_me' => 'বিশ্ববিদ্যালয়ে শিক্ষকতা করছি। গবেষণা ও লেখালেখি আমার প্রধান কাজ। আগের বিয়ে পারিবারিক কারণে ভেঙ্গে গেছে। নতুন করে জীবন শুরু করতে চাই।',
            'contact_person' => 'সালমা খাতুন',
            'contact_relation' => 'মা',
            'partner_age_range' => '২৫-৩২ বছর',
            'partner_complexion' => 'যেকোনো',
            'partner_height' => "৫'০\" - ৫'৬\"",
            'partner_district' => 'রাজশাহী বা ঢাকা',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'শিক্ষকতা বা যেকোনো',
            'qualities' => 'বুদ্ধিমতী, ধৈর্যশীল, সহানুভূতিশীল',
            'is_published' => true,
        ]);

        // Bride 1
        $bride1 = User::create([
            'name' => 'ফাতিমা জান্নাত',
            'email' => 'fatima@demo.com',
            'phone' => '01855667788',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $bride1->id,
            'biodata_type' => 'bride',
            'date_of_birth' => '1999-06-20',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'৩\"",
            'weight' => '৫২ কেজি',
            'complexion' => 'উজ্জ্বল ফর্সা',
            'blood_group' => 'A+',
            'division' => 'ঢাকা',
            'district' => 'ঢাকা',
            'upazila' => 'মিরপুর',
            'full_address' => 'মিরপুর ১০, ঢাকা',
            'permanent_division' => 'সিলেট',
            'permanent_district' => 'সিলেট',
            'permanent_upazila' => 'বিশ্বনাথ',
            'permanent_address' => 'বিশ্বনাথ, সিলেট',
            'education_level' => 'স্নাতকোত্তর (মাস্টার্স)',
            'education_detail' => 'ইংরেজি সাহিত্য, ঢাকা বিশ্ববিদ্যালয়',
            'profession' => 'শিক্ষিকা',
            'monthly_income' => '৩৫,০০০ টাকা',
            'father_name' => 'মোঃ জসিম উদ্দিন',
            'father_profession' => 'ডাক্তার',
            'mother_name' => 'নাসরিন সুলতানা',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 2,
            'sisters' => 0,
            'about_me' => 'আমি একজন শিক্ষিকা। ইসলামী জীবনযাপনে অভ্যস্ত। হিফজ সম্পন্ন করেছি। রান্নাবান্না ও সেলাই আমার শখ। পরিবারের সাথে সময় কাটাতে ভালোবাসি।',
            'contact_person' => 'মোঃ জসিম উদ্দিন',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২৬-৩২ বছর',
            'partner_complexion' => 'ফর্সা বা উজ্জ্বল শ্যামলা',
            'partner_height' => "৫'৬\" - ৫'১০\"",
            'partner_district' => 'ঢাকা বা চট্টগ্রাম',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'ডাক্তার বা ইঞ্জিনিয়ার',
            'qualities' => 'দ্বীনদার, সৎ, দায়িত্ববান, পরিবারপ্রিয়',
            'is_published' => true,
        ]);

        // Bride 2
        $bride2 = User::create([
            'name' => 'সাদিয়া রহমান',
            'email' => 'sadia@demo.com',
            'phone' => '01966778899',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $bride2->id,
            'biodata_type' => 'bride',
            'date_of_birth' => '2000-11-05',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'৪\"",
            'weight' => '৫৫ কেজি',
            'complexion' => 'ফর্সা',
            'blood_group' => 'B+',
            'division' => 'খুলনা',
            'district' => 'খুলনা',
            'upazila' => 'সোনাডাঙ্গা',
            'full_address' => 'সোনাডাঙ্গা, খুলনা',
            'permanent_division' => 'খুলনা',
            'permanent_district' => 'যশোর',
            'permanent_upazila' => 'যশোর সদর',
            'permanent_address' => 'যশোর সদর, যশোর',
            'education_level' => 'স্নাতক (অনার্স)',
            'education_detail' => 'গণিত, খুলনা বিশ্ববিদ্যালয়',
            'profession' => 'ছাত্রী (মাস্টার্স চলমান)',
            'monthly_income' => 'প্রযোজ্য নয়',
            'father_name' => 'আবদুর রহমান',
            'father_profession' => 'ব্যবসায়ী',
            'mother_name' => 'হাসিনা বেগম',
            'mother_profession' => 'শিক্ষিকা',
            'brothers' => 1,
            'sisters' => 1,
            'about_me' => 'বর্তমানে মাস্টার্সে পড়ছি। কুরআন শিক্ষা, হ্যান্ডিক্র্যাফট ও ফটোগ্রাফি আমার আগ্রহের বিষয়। পরিবারের বড় মেয়ে হওয়ায় দায়িত্ববোধ আমার মধ্যে সহজাত।',
            'contact_person' => 'আবদুর রহমান',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২৫-৩০ বছর',
            'partner_complexion' => 'যেকোনো',
            'partner_height' => "৫'৬\" - ৬'০\"",
            'partner_district' => 'যেকোনো',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'চাকরিজীবী বা ব্যবসায়ী',
            'qualities' => 'নামাজি, সৎ, ভদ্র, কুরআন পড়তে পারেন',
            'is_published' => true,
        ]);

        // Bride 3
        $bride3 = User::create([
            'name' => 'মারিয়াম আক্তার',
            'email' => 'mariam@demo.com',
            'phone' => '01511223355',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $bride3->id,
            'biodata_type' => 'bride',
            'date_of_birth' => '1998-02-14',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'২\"",
            'weight' => '৫০ কেজি',
            'complexion' => 'উজ্জ্বল শ্যামলা',
            'blood_group' => 'AB+',
            'division' => 'সিলেট',
            'district' => 'সিলেট',
            'upazila' => 'সিলেট সদর',
            'full_address' => 'আম্বরখানা, সিলেট',
            'permanent_division' => 'সিলেট',
            'permanent_district' => 'মৌলভীবাজার',
            'permanent_upazila' => 'মৌলভীবাজার সদর',
            'permanent_address' => 'মৌলভীবাজার সদর',
            'education_level' => 'হাফেজ',
            'education_detail' => 'হিফজুল কুরআন সম্পন্ন, দাখিল পাস',
            'profession' => 'কুরআন শিক্ষিকা',
            'monthly_income' => '১৫,০০০ টাকা',
            'father_name' => 'মোঃ ইব্রাহীম',
            'father_profession' => 'মাদ্রাসা শিক্ষক',
            'mother_name' => 'আয়েশা সিদ্দিকা',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 3,
            'sisters' => 2,
            'about_me' => 'আমি হাফেজা। ছোটবেলা থেকেই কুরআনের সাথে গভীর সম্পর্ক। বর্তমানে মাদ্রাসায় কুরআন শেখাচ্ছি। সাদাসিধে জীবনযাপনে অভ্যস্ত।',
            'contact_person' => 'মোঃ ইব্রাহীম',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২৫-৩৫ বছর',
            'partner_complexion' => 'যেকোনো',
            'partner_height' => "৫'৫\" এর বেশি",
            'partner_district' => 'সিলেট বা ঢাকা',
            'partner_education' => 'আলেম বা ন্যূনতম এইচএসসি',
            'partner_profession' => 'যেকোনো হালাল পেশা',
            'qualities' => 'দাড়িওয়ালা, পাঁচ ওয়াক্ত নামাজি, কুরআন পড়তে পারেন',
            'is_published' => true,
        ]);

        // Groom 4 (Hindu)
        $groom4 = User::create([
            'name' => 'সুব্রত দাস',
            'email' => 'subrata@demo.com',
            'phone' => '01411223366',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $groom4->id,
            'biodata_type' => 'groom',
            'date_of_birth' => '1996-12-01',
            'marital_status' => 'unmarried',
            'religion' => 'হিন্দু',
            'height' => "৫'৯\"",
            'weight' => '৭২ কেজি',
            'complexion' => 'শ্যামলা',
            'blood_group' => 'O-',
            'division' => 'বরিশাল',
            'district' => 'বরিশাল',
            'upazila' => 'বরিশাল সদর',
            'full_address' => 'বরিশাল সদর',
            'permanent_division' => 'বরিশাল',
            'permanent_district' => 'বরিশাল',
            'permanent_upazila' => 'বরিশাল সদর',
            'permanent_address' => 'বরিশাল সদর',
            'education_level' => 'স্নাতকোত্তর (মাস্টার্স)',
            'education_detail' => 'হিসাববিজ্ঞান, বরিশাল বিশ্ববিদ্যালয়',
            'profession' => 'চার্টার্ড একাউন্ট্যান্ট',
            'monthly_income' => '৯০,০০০ টাকা',
            'father_name' => 'বিমল দাস',
            'father_profession' => 'ব্যবসায়ী',
            'mother_name' => 'রেখা দাস',
            'mother_profession' => 'গৃহিণী',
            'brothers' => 1,
            'sisters' => 0,
            'about_me' => 'আমি একজন চার্টার্ড একাউন্ট্যান্ট। পেশাগত জীবনে সফল। সঙ্গীত ও সাহিত্যে আগ্রহী। পারিবারিক মূল্যবোধে বিশ্বাসী।',
            'contact_person' => 'বিমল দাস',
            'contact_relation' => 'বাবা',
            'partner_age_range' => '২২-২৮ বছর',
            'partner_complexion' => 'ফর্সা',
            'partner_height' => "৫'১\" - ৫'৫\"",
            'partner_district' => 'যেকোনো',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'যেকোনো',
            'qualities' => 'শিক্ষিত, সংস্কৃতিবান, পরিবারপ্রিয়',
            'is_published' => true,
        ]);

        // Bride 4
        $bride4 = User::create([
            'name' => 'নুসরাত জাহান',
            'email' => 'nusrat@demo.com',
            'phone' => '01322334455',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        Biodata::create([
            'user_id' => $bride4->id,
            'biodata_type' => 'bride',
            'date_of_birth' => '2001-04-18',
            'marital_status' => 'unmarried',
            'religion' => 'ইসলাম',
            'height' => "৫'৫\"",
            'weight' => '৫৮ কেজি',
            'complexion' => 'ফর্সা',
            'blood_group' => 'A-',
            'division' => 'ঢাকা',
            'district' => 'গাজীপুর',
            'upazila' => 'টঙ্গী',
            'full_address' => 'টঙ্গী, গাজীপুর',
            'permanent_division' => 'ময়মনসিংহ',
            'permanent_district' => 'ময়মনসিংহ',
            'permanent_upazila' => 'ময়মনসিংহ সদর',
            'permanent_address' => 'ময়মনসিংহ সদর',
            'education_level' => 'স্নাতক (অনার্স)',
            'education_detail' => 'ফার্মেসি, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
            'profession' => 'ফার্মাসিস্ট',
            'monthly_income' => '৪০,০০০ টাকা',
            'father_name' => 'মোঃ শাহিদুল ইসলাম',
            'father_profession' => 'প্রকৌশলী',
            'mother_name' => 'শামীমা আক্তার',
            'mother_profession' => 'ডাক্তার',
            'brothers' => 0,
            'sisters' => 1,
            'about_me' => 'আমি একজন ফার্মাসিস্ট। স্বাস্থ্যসচেতন ও সক্রিয় জীবনযাপন করি। পরিবারের একমাত্র মেয়ে হওয়ায় পরিবারের সাথে খুব ঘনিষ্ঠ।',
            'contact_person' => 'শামীমা আক্তার',
            'contact_relation' => 'মা',
            'partner_age_range' => '২৫-৩০ বছর',
            'partner_complexion' => 'উজ্জ্বল ফর্সা বা ফর্সা',
            'partner_height' => "৫'৮\" এর বেশি",
            'partner_district' => 'ঢাকা',
            'partner_education' => 'ন্যূনতম স্নাতক',
            'partner_profession' => 'ডাক্তার, ইঞ্জিনিয়ার বা ব্যবসায়ী',
            'qualities' => 'সৎ, উচ্চাকাঙ্ক্ষী, পরিশ্রমী',
            'is_published' => true,
        ]);

        // ─── Pending Users (waiting for admin approval) ────────────────

        $pending1 = User::create([
            'name' => 'জাহিদ হাসান',
            'email' => 'jahid@demo.com',
            'phone' => '01655443322',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'pending',
            'email_verified_at' => now(),
        ]);

        $pending2 = User::create([
            'name' => 'তাসনিম ফেরদৌস',
            'email' => 'tasnim@demo.com',
            'phone' => '01944332211',
            'password' => bcrypt('password'),
            'role' => 'user',
            'status' => 'pending',
            'email_verified_at' => now(),
        ]);

        // ─── Proposals ─────────────────────────────────────────────────

        // Arif → Fatima (pending)
        Proposal::create([
            'sender_id' => $groom1->id,
            'receiver_id' => $bride1->id,
            'biodata_id' => $bride1->biodata->id,
            'why_prefer' => 'আপনার বায়োডাটা পড়ে খুবই ভালো লেগেছে। শিক্ষিত, দ্বীনদার এবং পরিবারপ্রিয় — আমার পরিবারও এমন একজন পাত্রী খুঁজছেন। আশা করি আমরা একে অপরের জীবনসঙ্গী হতে পারি।',
            'kabin_nama_expectations' => 'পরিবারের সম্মতিতে নির্ধারণ করা হবে',
            'gold_jewelry_expectations' => 'ন্যূনতম ৫ ভরি স্বর্ণ',
            'status' => 'pending',
        ]);

        // Tanvir → Sadia (approved)
        $proposal2 = Proposal::create([
            'sender_id' => $groom2->id,
            'receiver_id' => $bride2->id,
            'biodata_id' => $bride2->biodata->id,
            'why_prefer' => 'আপনার পরিবার ও আমার পরিবারের মধ্যে অনেক মিল রয়েছে। আমিও খুলনার মানুষ, তাই সংস্কৃতিগত মিল থাকবে। আপনার শিক্ষা ও গুণাবলী আমাকে আকৃষ্ট করেছে।',
            'kabin_nama_expectations' => '৫ লক্ষ টাকা',
            'gold_jewelry_expectations' => 'পারস্পরিক আলোচনা সাপেক্ষে',
            'status' => 'approved',
        ]);

        // Rakib → Mariam (approved, chat allowed)
        $proposal3 = Proposal::create([
            'sender_id' => $groom3->id,
            'receiver_id' => $bride3->id,
            'biodata_id' => $bride3->biodata->id,
            'why_prefer' => 'আপনি হাফেজা — এটি আমার কাছে অত্যন্ত সম্মানের। আমিও দ্বীনের পথে চলতে চাই এবং একজন দ্বীনদার জীবনসঙ্গিনী খুঁজছি। আপনার সরলতা ও ইসলামী মূল্যবোধ আমাকে অনুপ্রাণিত করেছে।',
            'kabin_nama_expectations' => 'শরীয়াহ অনুসারে',
            'gold_jewelry_expectations' => 'সামর্থ্য অনুযায়ী',
            'status' => 'approved',
        ]);

        // Groom1 → Nusrat (rejected)
        Proposal::create([
            'sender_id' => $groom1->id,
            'receiver_id' => $bride4->id,
            'biodata_id' => $bride4->biodata->id,
            'why_prefer' => 'আপনার প্রোফাইল দেখে ভালো লেগেছে। পেশাগত দিক থেকে আমরা মিলে যাই।',
            'kabin_nama_expectations' => 'আলোচনা সাপেক্ষে',
            'gold_jewelry_expectations' => 'পরিবারের সিদ্ধান্ত অনুযায়ী',
            'status' => 'rejected',
            'admin_note' => 'পাত্রীর পরিবার এই মুহূর্তে সম্মত নন।',
        ]);

        // Groom4 → Bride2 (pending)
        Proposal::create([
            'sender_id' => $groom4->id,
            'receiver_id' => $bride2->id,
            'biodata_id' => $bride2->biodata->id,
            'why_prefer' => 'আপনার শিক্ষাগত যোগ্যতা ও গুণাবলী দেখে খুবই প্রভাবিত হয়েছি। আমি বিশ্বাস করি আমরা একে অপরের পরিপূরক হতে পারি।',
            'kabin_nama_expectations' => 'পারস্পরিক সম্মতিতে',
            'gold_jewelry_expectations' => '৮ ভরি স্বর্ণ',
            'status' => 'pending',
        ]);

        // ─── Chat Room & Messages (for proposal3 — chat_allowed) ─────

        $chatRoom = ChatRoom::create([
            'proposal_id' => $proposal3->id,
            'user_one_id' => $groom3->id,
            'user_two_id' => $bride3->id,
            'is_active' => true,
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $groom3->id,
            'body' => 'আসসালামু আলাইকুম, কেমন আছেন?',
            'is_read' => true,
            'created_at' => now()->subHours(5),
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $bride3->id,
            'body' => 'ওয়ালাইকুম আসসালাম, আলহামদুলিল্লাহ ভালো আছি। আপনি কেমন আছেন?',
            'is_read' => true,
            'created_at' => now()->subHours(4)->subMinutes(45),
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $groom3->id,
            'body' => 'আলহামদুলিল্লাহ, আমিও ভালো আছি। আপনার বায়োডাটা পড়ে খুবই ভালো লেগেছে। আপনি হাফেজা — এটি সত্যিই প্রশংসনীয়।',
            'is_read' => true,
            'created_at' => now()->subHours(4)->subMinutes(30),
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $bride3->id,
            'body' => 'জাজাকাল্লাহু খাইরান। আপনার সম্পর্কেও বায়োডাটায় পড়েছি। বিশ্ববিদ্যালয়ে শিক্ষকতা করছেন — মাশাআল্লাহ।',
            'is_read' => true,
            'created_at' => now()->subHours(4),
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $groom3->id,
            'body' => 'আপনার পরিবার কি এই বিয়ে নিয়ে ইতিবাচক? আমার পরিবার আপনার বায়োডাটা দেখে খুশি হয়েছেন।',
            'is_read' => false,
            'created_at' => now()->subHours(2),
        ]);

        Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $bride3->id,
            'body' => 'জ্বী, আমার আব্বু-আম্মু আপনার বায়োডাটা দেখেছেন এবং তারাও ইতিবাচক মনোভাব দেখিয়েছেন। ইনশাআল্লাহ, সামনে এগিয়ে যেতে পারি।',
            'is_read' => false,
            'created_at' => now()->subHours(1),
        ]);

        $this->command->info('✅ ডেমো ডাটা সফলভাবে যোগ করা হয়েছে!');
        $this->command->info('');
        $this->command->info('📋 ডেমো অ্যাকাউন্টসমূহ (পাসওয়ার্ড: password):');
        $this->command->info('   পাত্র: arif@demo.com, tanvir@demo.com, rakib@demo.com, subrata@demo.com');
        $this->command->info('   পাত্রী: fatima@demo.com, sadia@demo.com, mariam@demo.com, nusrat@demo.com');
        $this->command->info('   অপেক্ষমাণ: jahid@demo.com, tasnim@demo.com');
        $this->command->info('   অ্যাডমিন: nayakemily50@gmail.com');
    }
}

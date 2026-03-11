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
        // ─── Data Arrays ────────────────────────────────────────────────

        $groomNames = [
            'আরিফ হোসেন', 'তানভীর আহমেদ', 'রাকিব হাসান', 'সুব্রত দাস', 'মাহমুদুল হাসান',
            'ইমরান হোসেন', 'নাজমুল ইসলাম', 'শাহরিয়ার রহমান', 'আশিকুর রহমান', 'মেহেদী হাসান',
            'রিদওয়ান হোসেন', 'সাইফুল ইসলাম', 'আবু বকর', 'মোঃ সালাউদ্দিন', 'হাসিবুল হক',
            'জাবির আহমেদ', 'তৌফিক হাসান', 'রফিকুল ইসলাম', 'মাসুম বিল্লাহ', 'রাহাত হোসেন',
            'ফারহান আহমেদ', 'নাইমুল ইসলাম', 'মিজানুর রহমান', 'সাজ্জাদ হোসেন', 'জুবায়ের আহমেদ',
            'আকরামুল ইসলাম', 'নাফিস উদ্দিন', 'সাদাত হোসেন', 'মাহফুজ আলম', 'রিয়াদ হোসেন',
            'তারেক আজিজ', 'শামীম হোসেন', 'জিয়াউর রহমান', 'মনির হোসেন', 'আনিসুর রহমান',
            'ফয়সাল হোসেন', 'বিল্লাল হোসেন', 'আলামিন হোসেন', 'সাহিদুল ইসলাম', 'নূরুল ইসলাম',
            'আজমাইন হোসেন', 'হামজা আহমেদ', 'ওয়াসিম আকরাম', 'শফিকুল ইসলাম', 'আনোয়ার হোসেন',
            'দেলোয়ার হোসেন', 'সালমান ফারসী', 'তাহসিন আহমেদ', 'রিজওয়ান আলী', 'মুরাদ হোসেন',
        ];

        $brideNames = [
            'ফাতিমা জান্নাত', 'সাদিয়া রহমান', 'মারিয়াম আক্তার', 'নুসরাত জাহান', 'তাসনিম আক্তার',
            'রুমানা ইসলাম', 'সাবিহা রহমান', 'নাজনীন সুলতানা', 'ফারজানা বেগম', 'শাহানারা বেগম',
            'মিম আক্তার', 'সুমাইয়া হাসান', 'নাফিসা রহমান', 'আফরিন হোসেন', 'রিমা বেগম',
            'সামিরা আক্তার', 'তানজিলা ইসলাম', 'নূর জান্নাত', 'সানজিদা হোসেন', 'ইসরাত জাহান',
            'মাহজাবীন রহমান', 'শামিমা আক্তার', 'হাসনাত আরা', 'লাবণ্য ইসলাম', 'নওরিন তাবাস্সুম',
            'জেরিন আক্তার', 'সোহানা বেগম', 'উম্মে কুলসুম', 'আয়েশা সিদ্দিকা', 'জান্নাতুল ফেরদৌস',
            'সুরাইয়া বেগম', 'নাদিয়া ইসলাম', 'রোজিনা আক্তার', 'তানিয়া হোসেন', 'সুফিয়া বেগম',
            'মাশরুরা হোসেন', 'ফারহানা ইসলাম', 'জুলেখা বেগম', 'নাসরিন আক্তার', 'আনোয়ারা বেগম',
            'সামিনা ইসলাম', 'রুবাইয়াত হোসেন', 'মুশফিকা রহমান', 'খাদিজা তুল কুবরা', 'মাহবুবা খানম',
            'শিরিন আক্তার', 'দিলরুবা বেগম', 'তানজিম আরা', 'জেসমিন আক্তার', 'ইশরাত জাহান',
        ];

        $divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'ময়মনসিংহ', 'রংপুর'];

        $districtsByDivision = [
            'ঢাকা'        => ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'মুন্সিগঞ্জ', 'মানিকগঞ্জ', 'নরসিংদী', 'টাঙ্গাইল'],
            'চট্টগ্রাম'   => ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'ব্রাহ্মণবাড়িয়া', 'নোয়াখালী', 'চাঁদপুর'],
            'রাজশাহী'     => ['রাজশাহী', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ', 'সিরাজগঞ্জ', 'বগুড়া', 'পাবনা'],
            'খুলনা'       => ['খুলনা', 'যশোর', 'কুষ্টিয়া', 'বাগেরহাট', 'সাতক্ষীরা', 'ঝিনাইদহ', 'মেহেরপুর'],
            'সিলেট'       => ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
            'বরিশাল'      => ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'ঝালকাঠি', 'পিরোজপুর', 'বরগুনা'],
            'ময়মনসিংহ'   => ['ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোণা'],
            'রংপুর'       => ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'নীলফামারী', 'লালমনিরহাট', 'কুড়িগ্রাম'],
        ];

        $upazilas = ['সদর', 'পৌরসভা', 'উত্তর', 'দক্ষিণ', 'পূর্ব', 'পশ্চিম', 'মধ্যম'];

        $groomProfessions = [
            'সফটওয়্যার ইঞ্জিনিয়ার', 'ব্যাংকার', 'বিশ্ববিদ্যালয় শিক্ষক', 'চার্টার্ড একাউন্ট্যান্ট',
            'ডাক্তার (MBBS)', 'সরকারি কর্মকর্তা (BCS)', 'ব্যবসায়ী', 'আইনজীবী', 'প্রকৌশলী (BUET)',
            'কৃষিবিদ', 'পুলিশ অফিসার', 'সেনা অফিসার', 'ফার্মাসিস্ট', 'জার্নালিস্ট', 'আর্কিটেক্ট',
            'গ্রাফিক ডিজাইনার', 'মার্চেন্ট নেভি অফিসার', 'পাইলট', 'ডেন্টিস্ট', 'ভেটেরিনারি ডাক্তার',
        ];

        $brideProfessions = [
            'শিক্ষিকা', 'ডাক্তার (MBBS)', 'ফার্মাসিস্ট', 'ছাত্রী (অনার্স চলমান)', 'নার্স',
            'ব্যাংকার', 'গৃহিণী', 'সরকারি কর্মকর্তা (BCS)', 'সফটওয়্যার ইঞ্জিনিয়ার',
            'ডায়েটিশিয়ান', 'আইনজীবী', 'কুরআন শিক্ষিকা', 'ব্যবসায়ী', 'গার্মেন্টস কর্মকর্তা',
            'এনজিও কর্মী', 'ডিজাইনার', 'মিডিয়া প্রফেশনাল', 'সাইকোলজিস্ট', 'আর্কিটেক্ট', 'ফটোগ্রাফার',
        ];

        $educationLevels = [
            'এসএসসি', 'এইচএসসি', 'স্নাতক (অনার্স)', 'স্নাতকোত্তর (মাস্টার্স)', 'পিএইচডি',
            'এমবিবিএস', 'বিডিএস', 'ইঞ্জিনিয়ারিং (বিএসসি)', 'হাফেজ', 'আলেম (দাওরা)',
        ];

        $educationDetails = [
            'কম্পিউটার সায়েন্স, বুয়েট', 'ব্যবসায় প্রশাসন, ঢাকা বিশ্ববিদ্যালয়',
            'ইংরেজি সাহিত্য, রাজশাহী বিশ্ববিদ্যালয়', 'চিকিৎসাবিজ্ঞান, ঢাকা মেডিকেল কলেজ',
            'পদার্থবিজ্ঞান, চট্টগ্রাম বিশ্ববিদ্যালয়', 'আইন, জগন্নাথ বিশ্ববিদ্যালয়',
            'ফার্মেসি, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', 'হিসাববিজ্ঞান, খুলনা বিশ্ববিদ্যালয়',
            'সিভিল ইঞ্জিনিয়ারিং, বুয়েট', 'গণিত, সিলেট শাহজালাল বিশ্ববিদ্যালয়',
            'কৃষি বিজ্ঞান, বাংলাদেশ কৃষি বিশ্ববিদ্যালয়', 'লোক প্রশাসন, ঢাকা বিশ্ববিদ্যালয়',
        ];

        $incomes = [
            '২০,০০০ টাকা', '২৫,০০০ টাকা', '৩০,০০০ টাকা', '৩৫,০০০ টাকা', '৪০,০০০ টাকা',
            '৪৫,০০০ টাকা', '৫০,০০০ টাকা', '৬০,০০০ টাকা', '৭০,০০০ টাকা', '৮০,০০০ টাকা',
            '৯০,০০০ টাকা', '১,০০,০০০ টাকা', '১,২০,০০০ টাকা', '১,৫০,০০০ টাকা', 'প্রযোজ্য নয়',
        ];

        $bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

        $complexions = ['ফর্সা', 'উজ্জ্বল ফর্সা', 'উজ্জ্বল শ্যামলা', 'শ্যামলা', 'কালো'];

        $groomHeights = ["৫'৫\"", "৫'৬\"", "৫'৭\"", "৫'৮\"", "৫'৯\"", "৫'১০\"", "৬'০\"", "৬'১\""];
        $brideHeights = ["৫'০\"", "৫'১\"", "৫'২\"", "৫'৩\"", "৫'৪\"", "৫'৫\"", "৫'৬\""];

        $groomWeights = ['৫৮ কেজি', '৬২ কেজি', '৬৫ কেজি', '৬৮ কেজি', '৭০ কেজি', '৭৫ কেজি', '৭৮ কেজি', '৮০ কেজি'];
        $brideWeights = ['৪৫ কেজি', '৪৮ কেজি', '৫০ কেজি', '৫২ কেজি', '৫৫ কেজি', '৫৮ কেজि', '৬০ কেজি'];

        $religions = ['ইসলাম', 'ইসলাম', 'ইসলাম', 'ইসলাম', 'হিন্দু', 'হিন্দু', 'খ্রিস্টান'];

        $maritalStatuses = ['unmarried', 'unmarried', 'unmarried', 'unmarried', 'divorced', 'widowed'];

        $fatherProfessions = [
            'ব্যবসায়ী', 'সরকারি কর্মকর্তা', 'শিক্ষক', 'ডাক্তার', 'প্রকৌশলী',
            'আইনজীবী', 'কৃষক', 'অবসরপ্রাপ্ত সরকারি কর্মকর্তা', 'ব্যাংকার', 'মাদ্রাসা শিক্ষক',
        ];

        $motherProfessions = ['গৃহিণী', 'শিক্ষিকা', 'গৃহিণী', 'গৃহিণী', 'ডাক্তার', 'গৃহিণী', 'ব্যবসায়ী', 'গৃহিণী'];

        $contactRelations = ['বাবা', 'মা', 'ভাই', 'চাচা', 'মামা'];

        $whyPreferTexts = [
            'আপনার বায়োডাটা পড়ে খুবই ভালো লেগেছে। শিক্ষিত, দ্বীনদার এবং পরিবারপ্রিয় — আমার পরিবারও এমন একজন খুঁজছেন। আশা করি আমরা একে অপরের জীবনসঙ্গী হতে পারব।',
            'আপনার পেশাগত যোগ্যতা এবং পারিবারিক মূল্যবোধ আমাকে আকৃষ্ট করেছে। আমি বিশ্বাস করি আমরা একসাথে সুন্দর ভবিষ্যৎ গড়তে পারব।',
            'আপনার ধর্মীয় মূল্যবোধ ও শিক্ষাগত যোগ্যতা দেখে অত্যন্ত মুগ্ধ হয়েছি। সৎ, নামাজি এবং দায়িত্ববান জীবনসঙ্গী চাই, আপনি সেই মানদণ্ড পূরণ করেন।',
            'আপনার পরিবার ও আমার পরিবারের মধ্যে অনেক মিল রয়েছে। একই অঞ্চলের হওয়ায় সংস্কৃতিগত মিল আছে। আপনার গুণাবলী আমাকে আকৃষ্ট করেছে।',
            'আমি একজন দ্বীনদার, শিক্ষিত ও উপার্জনশীল পাত্রী খুঁজছি। আপনার বায়োডাটা পড়ে মনে হয়েছে আপনি সেই মানের। পরিবারের সম্মতিতে এগিয়ে যেতে চাই।',
            'আপনার সরলতা ও ইসলামী মূল্যবোধ আমাকে অনুপ্রাণিত করেছে। জীবনসঙ্গী হিসেবে আপনাকে পাওয়া আমার জন্য সৌভাগ্যের হবে বলে মনে করি।',
            'আপনার শিক্ষা ও পেশাগত দক্ষতা দেখে প্রভাবিত হয়েছি। উভয়ের পরিবারের সম্মতি নিয়ে সামনে এগিয়ে যাওয়ার ইচ্ছে পোষণ করি।',
            'আপনার প্রোফাইল দেখে মনে হয়েছে আপনি সত্যিই একজন গুণবতী মানুষ। আমার পরিবার ও আমি এই সম্পর্ক নিয়ে আশাবাদী।',
        ];

        $kabinExpectations = [
            'পারিবারিক সম্মতিতে নির্ধারণ করা হবে', '৩ লক্ষ টাকা', '৫ লক্ষ টাকা',
            '৭ লক্ষ টাকা', '১০ লক্ষ টাকা', 'শরীয়াহ অনুসারে', 'আলোচনা সাপেক্ষে',
            'পারস্পরিক সম্মতিতে', '২ লক্ষ টাকা', '১৫ লক্ষ টাকা',
        ];

        $goldExpectations = [
            'ন্যূনতম ৫ ভরি স্বর্ণ', 'পারস্পরিক আলোচনা সাপেক্ষে', '৮ ভরি স্বর্ণ',
            'সামর্থ্য অনুযায়ী', 'পরিবারের সিদ্ধান্ত অনুযায়ী', '১০ ভরি স্বর্ণ',
            '৩ ভরি স্বর্ণ', 'স্বর্ণ প্রযোজ্য নয়', '৬ ভরি স্বর্ণ', 'আলোচনা সাপেক্ষে',
        ];

        $proposalStatuses = ['pending', 'pending', 'approved', 'approved', 'rejected', 'chat_allowed'];

        $aboutMeGroom = [
            'আমি একজন পেশাদার মানুষ। নিজের কাজে নিষ্ঠাবান। ইসলামী জীবনযাপনে অভ্যস্ত। পরিবারকে সর্বোচ্চ গুরুত্ব দিই।',
            'নিয়মিত নামাজ আদায় করি। সৎ ও পরিশ্রমী হিসেবে পরিচিত। ভ্রমণ ও বই পড়া আমার শখ। পরিবার ও সমাজের প্রতি দায়িত্ববান।',
            'আমি একজন ধর্মপরায়ণ মানুষ। পেশাগত জীবনে সফল। পরিবারের সবার সাথে ভালো সম্পর্ক বজায় রাখি।',
            'শান্তিপূর্ণ পারিবারিক জীবনে বিশ্বাসী। আমার স্ত্রীকে সর্বোচ্চ সম্মান দেওয়ার চেষ্টা করব। নিজেকে সর্বদা উন্নত করার চেষ্টা করি।',
            'কর্মঠ ও দায়িত্বশীল। পারিবারিক সুখে বিশ্বাসী। একটি সুন্দর ইসলামী পরিবার গড়ে তুলতে চাই।',
        ];

        $aboutMeBride = [
            'আমি একজন শিক্ষিত ও ধর্মপরায়ণ নারী। পরিবারের প্রতি দায়িত্বশীল। রান্নাবান্না ও সেলাই পছন্দ করি।',
            'ইসলামী জীবনযাপনে অভ্যস্ত। নিজেকে সর্বদা উন্নত করার চেষ্টা করি। পরিবারকে সর্বোচ্চ গুরুত্ব দিই।',
            'শান্তিপূর্ণ পারিবারিক জীবনে বিশ্বাসী। একটি সুখী পরিবার গড়ে তোলাই আমার লক্ষ্য।',
            'নম্র ও বিনয়ী। পরিবার ও সমাজের প্রতি দায়িত্ববান। কুরআন তেলাওয়াত করি নিয়মিত।',
            'শিক্ষিত ও স্বাবলম্বী। নিজের পেশায় নিষ্ঠাবান। সংসারজীবনে সম্পূর্ণ নিবেদিত হতে প্রস্তুত।',
        ];

        // ─── Create 50 Grooms ───────────────────────────────────────────

        $groomUsers = [];
        foreach ($groomNames as $i => $name) {
            $division = $divisions[array_rand($divisions)];
            $district = $districtsByDivision[$division][array_rand($districtsByDivision[$division])];
            $permDivision = $divisions[array_rand($divisions)];
            $permDistrict = $districtsByDivision[$permDivision][array_rand($districtsByDivision[$permDivision])];

            $user = User::create([
                'name'             => $name,
                'email'            => 'groom' . ($i + 1) . '@demo.com',
                'phone'            => '017' . str_pad(rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),
                'password'         => bcrypt('password'),
                'role'             => 'user',
                'status'           => $i < 45 ? 'approved' : 'pending',
                'email_verified_at' => now(),
            ]);

            $fatherName = $fatherProfessions[array_rand($fatherProfessions)];
            $year = rand(1990, 2000);
            $month = rand(1, 12);
            $day = rand(1, 28);

            Biodata::create([
                'user_id'              => $user->id,
                'biodata_type'         => 'groom',
                'date_of_birth'        => sprintf('%04d-%02d-%02d', $year, $month, $day),
                'marital_status'       => $maritalStatuses[array_rand($maritalStatuses)],
                'religion'             => $religions[array_rand($religions)],
                'height'               => $groomHeights[array_rand($groomHeights)],
                'weight'               => $groomWeights[array_rand($groomWeights)],
                'complexion'           => $complexions[array_rand($complexions)],
                'blood_group'          => $bloodGroups[array_rand($bloodGroups)],
                'division'             => $division,
                'district'             => $district,
                'upazila'              => $district . ' ' . $upazilas[array_rand($upazilas)],
                'full_address'         => $district . ', ' . $division,
                'permanent_division'   => $permDivision,
                'permanent_district'   => $permDistrict,
                'permanent_upazila'    => $permDistrict . ' সদর',
                'permanent_address'    => $permDistrict . ', ' . $permDivision,
                'education_level'      => $educationLevels[array_rand($educationLevels)],
                'education_detail'     => $educationDetails[array_rand($educationDetails)],
                'profession'           => $groomProfessions[array_rand($groomProfessions)],
                'monthly_income'       => $incomes[array_rand($incomes)],
                'father_name'          => 'মোঃ ' . explode(' ', $name)[1] . ' সাহেব',
                'father_profession'    => $fatherProfessions[array_rand($fatherProfessions)],
                'mother_name'          => 'বেগম ' . explode(' ', $name)[1],
                'mother_profession'    => $motherProfessions[array_rand($motherProfessions)],
                'brothers'             => rand(0, 3),
                'sisters'              => rand(0, 3),
                'about_me'             => $aboutMeGroom[array_rand($aboutMeGroom)],
                'contact_person'       => 'মোঃ ' . explode(' ', $name)[1] . ' সাহেব',
                'contact_relation'     => $contactRelations[array_rand($contactRelations)],
                'partner_age_range'    => rand(18, 22) . '-' . rand(25, 28) . ' বছর',
                'partner_complexion'   => $complexions[array_rand($complexions)],
                'partner_height'       => $brideHeights[array_rand($brideHeights)] . ' বা বেশি',
                'partner_district'     => $district . ' বা যেকোনো',
                'partner_education'    => 'ন্যূনতম ' . $educationLevels[array_rand($educationLevels)],
                'partner_profession'   => 'যেকোনো',
                'qualities'            => 'দ্বীনদার, শিক্ষিত, পরিবারপ্রিয়',
                'is_published'         => $i < 45,
            ]);

            $groomUsers[] = $user;
        }

        // ─── Create 50 Brides ───────────────────────────────────────────

        $brideUsers = [];
        foreach ($brideNames as $i => $name) {
            $division = $divisions[array_rand($divisions)];
            $district = $districtsByDivision[$division][array_rand($districtsByDivision[$division])];
            $permDivision = $divisions[array_rand($divisions)];
            $permDistrict = $districtsByDivision[$permDivision][array_rand($districtsByDivision[$permDivision])];

            $user = User::create([
                'name'             => $name,
                'email'            => 'bride' . ($i + 1) . '@demo.com',
                'phone'            => '018' . str_pad(rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),
                'password'         => bcrypt('password'),
                'role'             => 'user',
                'status'           => $i < 45 ? 'approved' : 'pending',
                'email_verified_at' => now(),
            ]);

            $year = rand(1995, 2004);
            $month = rand(1, 12);
            $day = rand(1, 28);

            Biodata::create([
                'user_id'              => $user->id,
                'biodata_type'         => 'bride',
                'date_of_birth'        => sprintf('%04d-%02d-%02d', $year, $month, $day),
                'marital_status'       => $maritalStatuses[array_rand($maritalStatuses)],
                'religion'             => $religions[array_rand($religions)],
                'height'               => $brideHeights[array_rand($brideHeights)],
                'weight'               => $brideWeights[array_rand($brideWeights)],
                'complexion'           => $complexions[array_rand($complexions)],
                'blood_group'          => $bloodGroups[array_rand($bloodGroups)],
                'division'             => $division,
                'district'             => $district,
                'upazila'              => $district . ' ' . $upazilas[array_rand($upazilas)],
                'full_address'         => $district . ', ' . $division,
                'permanent_division'   => $permDivision,
                'permanent_district'   => $permDistrict,
                'permanent_upazila'    => $permDistrict . ' সদর',
                'permanent_address'    => $permDistrict . ', ' . $permDivision,
                'education_level'      => $educationLevels[array_rand($educationLevels)],
                'education_detail'     => $educationDetails[array_rand($educationDetails)],
                'profession'           => $brideProfessions[array_rand($brideProfessions)],
                'monthly_income'       => $incomes[array_rand($incomes)],
                'father_name'          => 'মোঃ ' . explode(' ', $name)[count(explode(' ', $name)) - 1] . ' সাহেব',
                'father_profession'    => $fatherProfessions[array_rand($fatherProfessions)],
                'mother_name'          => 'বেগম ' . explode(' ', $name)[count(explode(' ', $name)) - 1],
                'mother_profession'    => $motherProfessions[array_rand($motherProfessions)],
                'brothers'             => rand(0, 3),
                'sisters'              => rand(0, 3),
                'about_me'             => $aboutMeBride[array_rand($aboutMeBride)],
                'contact_person'       => 'মোঃ ' . explode(' ', $name)[count(explode(' ', $name)) - 1] . ' সাহেব',
                'contact_relation'     => $contactRelations[array_rand($contactRelations)],
                'partner_age_range'    => rand(24, 28) . '-' . rand(30, 35) . ' বছর',
                'partner_complexion'   => $complexions[array_rand($complexions)],
                'partner_height'       => $groomHeights[array_rand($groomHeights)] . ' বা বেশি',
                'partner_district'     => $district . ' বা যেকোনো',
                'partner_education'    => 'ন্যূনতম ' . $educationLevels[array_rand($educationLevels)],
                'partner_profession'   => 'যেকোনো',
                'qualities'            => 'নামাজি, সৎ, দায়িত্বশীল, পরিবারপ্রিয়',
                'is_published'         => $i < 45,
            ]);

            $brideUsers[] = $user;
        }

        // ─── Create 100 Proposals ────────────────────────────────────────
        // Each groom sends 2 proposals to different brides

        $proposalCount = 0;
        $usedPairs = [];

        foreach ($groomUsers as $groomIndex => $groom) {
            if ($proposalCount >= 100) break;

            $brideBiodata = $groom->biodata ?? null;
            if (! $brideBiodata) continue;

            // Each groom sends proposals to 2 different brides
            $targets = array_rand(array_keys($brideUsers), min(2, count($brideUsers)));
            if (! is_array($targets)) $targets = [$targets];

            foreach ($targets as $brideIndex) {
                if ($proposalCount >= 100) break;

                $bride = $brideUsers[$brideIndex];
                $pairKey = $groom->id . '-' . $bride->id;

                if (isset($usedPairs[$pairKey])) continue;
                $usedPairs[$pairKey] = true;

                $brideBiodataModel = $bride->biodata ?? null;
                if (! $brideBiodataModel) continue;

                $status = $proposalStatuses[array_rand($proposalStatuses)];

                Proposal::create([
                    'sender_id'                => $groom->id,
                    'receiver_id'              => $bride->id,
                    'biodata_id'               => $brideBiodataModel->id,
                    'why_prefer'               => $whyPreferTexts[array_rand($whyPreferTexts)],
                    'kabin_nama_expectations'  => $kabinExpectations[array_rand($kabinExpectations)],
                    'gold_jewelry_expectations' => $goldExpectations[array_rand($goldExpectations)],
                    'status'                   => $status,
                    'admin_note'               => $status === 'rejected'
                        ? 'পাত্রীর পরিবার এই মুহূর্তে সম্মত নন।'
                        : null,
                ]);

                $proposalCount++;
            }
        }

        // If still under 100, fill remaining proposals
        if ($proposalCount < 100) {
            shuffle($groomUsers);
            shuffle($brideUsers);
            foreach ($groomUsers as $groom) {
                if ($proposalCount >= 100) break;
                foreach ($brideUsers as $bride) {
                    if ($proposalCount >= 100) break;
                    $pairKey = $groom->id . '-' . $bride->id;
                    if (isset($usedPairs[$pairKey])) continue;
                    $usedPairs[$pairKey] = true;

                    $brideBiodataModel = $bride->biodata ?? null;
                    if (! $brideBiodataModel) continue;

                    $status = $proposalStatuses[array_rand($proposalStatuses)];

                    Proposal::create([
                        'sender_id'                => $groom->id,
                        'receiver_id'              => $bride->id,
                        'biodata_id'               => $brideBiodataModel->id,
                        'why_prefer'               => $whyPreferTexts[array_rand($whyPreferTexts)],
                        'kabin_nama_expectations'  => $kabinExpectations[array_rand($kabinExpectations)],
                        'gold_jewelry_expectations' => $goldExpectations[array_rand($goldExpectations)],
                        'status'                   => $status,
                        'admin_note'               => $status === 'rejected'
                            ? 'পাত্রীর পরিবার এই মুহূর্তে সম্মত নন।'
                            : null,
                    ]);

                    $proposalCount++;
                }
            }
        }

        // ─── Chat rooms for chat_allowed proposals ─────────────────────

        $chatAllowedProposals = \App\Models\Proposal::where('status', 'chat_allowed')->get();
        foreach ($chatAllowedProposals as $proposal) {
            $existing = ChatRoom::where('proposal_id', $proposal->id)->first();
            if ($existing) continue;

            $chatRoom = ChatRoom::create([
                'proposal_id' => $proposal->id,
                'user_one_id' => $proposal->sender_id,
                'user_two_id' => $proposal->receiver_id,
                'is_active'   => true,
            ]);

            Message::create([
                'chat_room_id' => $chatRoom->id,
                'sender_id'    => $proposal->sender_id,
                'body'         => 'আসসালামু আলাইকুম, কেমন আছেন?',
                'is_read'      => true,
                'created_at'   => now()->subHours(rand(2, 10)),
            ]);

            Message::create([
                'chat_room_id' => $chatRoom->id,
                'sender_id'    => $proposal->receiver_id,
                'body'         => 'ওয়ালাইকুম আসসালাম, আলহামদুলিল্লাহ ভালো আছি। আপনি কেমন আছেন?',
                'is_read'      => rand(0, 1) === 1,
                'created_at'   => now()->subHours(rand(1, 5)),
            ]);
        }

        $this->command->info('✅ ডেমো ডাটা সফলভাবে যোগ করা হয়েছে!');
        $this->command->info('');
        $this->command->info('📋 সারসংক্ষেপ:');
        $this->command->info('   পাত্র: ' . count($groomUsers) . ' জন (groom1@demo.com ... groom50@demo.com)');
        $this->command->info('   পাত্রী: ' . count($brideUsers) . ' জন (bride1@demo.com ... bride50@demo.com)');
        $this->command->info('   মোট বায়োডাটা: ' . \App\Models\Biodata::count());
        $this->command->info('   মোট প্রস্তাব: ' . \App\Models\Proposal::count());
        $this->command->info('   পাসওয়ার্ড সকলের: password');
        $this->command->info('   অ্যাডমিন: nayakemily50@gmail.com / nayakemily50@gmail.com');
    }
}

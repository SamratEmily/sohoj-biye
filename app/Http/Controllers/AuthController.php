<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\NewRegistrationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function checkPhone(Request $request)
    {
        $exists = User::where('phone', $request->phone)->exists();
        return response()->json(['exists' => $exists]);
    }

    public function checkEmail(Request $request)
    {
        $exists = User::where('email', $request->email)->exists();
        return response()->json(['exists' => $exists]);
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'password' => ['required', 'confirmed', Password::min(8)],
            'profile_photo' => 'required|image|max:2048',
            'nid_document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'testimonial_document' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'birth_certificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'transcript_document' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ], [
            'name.required' => 'নাম আবশ্যক',
            'email.required' => 'ইমেইল আবশ্যক',
            'email.unique' => 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে',
            'phone.required' => 'ফোন নম্বর আবশ্যক',
            'phone.unique' => 'এই ফোন নম্বর ইতিমধ্যে ব্যবহৃত হয়েছে',
            'password.required' => 'পাসওয়ার্ড আবশ্যক',
            'password.confirmed' => 'পাসওয়ার্ড মিলছে না',
            'profile_photo.required' => 'প্রোফাইল ছবি আবশ্যক',
            'nid_document.required' => 'জাতীয় পরিচয়পত্র আবশ্যক',
        ]);

        // Handle file uploads
        $profilePath = $request->file('profile_photo')->store('profiles', 'public');
        $nidPath = $request->file('nid_document')->store('documents/nid', 'public');

        $testimonialPath = $request->hasFile('testimonial_document')
            ? $request->file('testimonial_document')->store('documents/testimonials', 'public')
            : null;

        $birthCertPath = $request->hasFile('birth_certificate')
            ? $request->file('birth_certificate')->store('documents/birth-certificates', 'public')
            : null;

        $transcriptPath = $request->hasFile('transcript_document')
            ? $request->file('transcript_document')->store('documents/transcripts', 'public')
            : null;

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => $validated['password'],
            'status' => 'pending',
            'profile_photo' => $profilePath,
            'nid_document' => $nidPath,
            'testimonial_document' => $testimonialPath,
            'birth_certificate' => $birthCertPath,
            'transcript_document' => $transcriptPath,
        ]);

        // Notify admin
        $admin = User::where('role', 'admin')->first();
        if ($admin) {
            try {
                Mail::to($admin->email)->send(new NewRegistrationNotification($user));
            } catch (\Exception $e) {
                // Log but don't fail
                \Log::error('Failed to send admin notification: ' . $e->getMessage());
            }
        }

        return redirect()->route('login')->with('success', 'নিবন্ধন সফল হয়েছে! অনুমোদনের জন্য অপেক্ষা করুন।');
    }

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'ইমেইল আবশ্যক',
            'password.required' => 'পাসওয়ার্ড আবশ্যক',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return back()->withErrors(['email' => 'এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি']);
        }

        if ($user->status === 'pending') {
            return back()->withErrors(['email' => 'আপনার অ্যাকাউন্ট এখনও অনুমোদিত হয়নি। অনুগ্রহ করে অপেক্ষা করুন।']);
        }

        if ($user->status === 'rejected') {
            return back()->withErrors(['email' => 'আপনার আবেদন প্রত্যাখ্যান করা হয়েছে। কারণ: ' . ($user->rejection_reason ?? 'নির্দিষ্ট করা হয়নি')]);
        }

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            if ($user->isAdmin()) {
                return redirect()->intended(route('admin.dashboard'));
            }

            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors(['email' => 'ইমেইল অথবা পাসওয়ার্ড ভুল']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}

import { Link, usePage } from '@inertiajs/react';
import { Heart, Home, Search, MessageCircle, User, LogOut, Menu, X, Shield, FileText, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const { auth, flash } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const isAdmin = auth?.user?.role === 'admin';

    const userNav = [
        { name: 'ড্যাশবোর্ড', href: '/dashboard', icon: Home },
        { name: 'বায়োডাটা ফিড', href: '/feed', icon: Search },
        { name: 'আমার প্রস্তাব', href: '/proposals', icon: Send },
        { name: 'চ্যাট', href: '/chat', icon: MessageCircle },
    ];

    const adminNav = [
        { name: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: Home },
        { name: 'বায়োডাটা ফিড', href: '/feed', icon: Search },
        { name: 'অপেক্ষমাণ ব্যবহারকারী', href: '/admin/pending-users', icon: User },
        { name: 'সকল ব্যবহারকারী', href: '/admin/users', icon: FileText },
        { name: 'প্রস্তাবসমূহ', href: '/admin/proposals', icon: Send },
    ];

    const navItems = isAdmin ? adminNav : userNav;

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Flash Messages */}
            {showFlash && (flash?.success || flash?.error) && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl slide-up ${flash?.success
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    }`}>
                    <p>{flash?.success || flash?.error}</p>
                </div>
            )}

            {/* Navbar */}
            <nav className="sticky top-0 z-40 glass-card border-b border-dark-700/30 backdrop-blur-xl bg-dark-950/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold gradient-text hidden sm:block">সহজ বিয়ে</span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-1">
                            {auth?.user && navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all duration-300"
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-3">
                            {auth?.user ? (
                                <>
                                    <div className="hidden md:flex items-center space-x-3">
                                        <div className="flex items-center space-x-2">
                                            {auth.user.profile_photo ? (
                                                <img src={auth.user.profile_photo} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500/30" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            <span className="text-sm text-dark-200">{auth.user.name}</span>
                                            {isAdmin && (
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                                                    <Shield className="w-3 h-3 inline mr-1" />
                                                    অ্যাডমিন
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {/* Mobile Menu Toggle */}
                                    <button
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        className="md:hidden p-2 text-dark-300 hover:text-primary-400"
                                    >
                                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login" className="btn-secondary text-sm py-2 px-4">লগইন</Link>
                                    <Link href="/register" className="btn-primary text-sm py-2 px-4">নিবন্ধন</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && auth?.user && (
                    <div className="md:hidden border-t border-dark-700/30">
                        <div className="px-4 py-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>লগআউট</span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-dark-800/50 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <Heart className="w-5 h-5 text-primary-500" />
                            <span className="text-dark-400">সহজ বিয়ে - বিশ্বস্ত বিবাহ সেবা</span>
                        </div>
                        <p className="text-dark-500 text-sm">© ২০২৪ সহজ বিয়ে। সর্বস্বত্ব সংরক্ষিত।</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

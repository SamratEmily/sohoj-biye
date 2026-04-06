import { Link } from '@inertiajs/react';

export default function Pagination({ links, className = '' }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className={`flex justify-center flex-wrap gap-2 ${className}`}>
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || '#'}
                    preserveScroll
                    className={`px-4 py-2 rounded-xl text-sm transition-all ${link.active
                        ? 'bg-primary-500/10 text-primary-600 border border-primary-500/30 dark:bg-primary-500/20 dark:text-primary-300'
                        : link.url
                            ? 'bg-white text-slate-600 border border-slate-200 hover:border-primary-500/30 dark:bg-dark-800/50 dark:text-dark-400 dark:border-dark-700/30 dark:hover:border-dark-600'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-dark-800/30 dark:text-dark-600'
                        }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

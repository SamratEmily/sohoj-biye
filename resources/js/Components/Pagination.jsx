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
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : link.url
                            ? 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600'
                            : 'bg-dark-800/30 text-dark-600 cursor-not-allowed'
                        }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

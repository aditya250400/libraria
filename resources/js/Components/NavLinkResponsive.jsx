import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function NavLinkResponsive({ active = false, url = '#', title, icon: Icon, ...props }) {
    return (
        <Link
            className={cn(
                active
                    ? 'from--400 bg-gradient-to-r via-blue-600 to-blue-500 font-semibold text-white hover:text-white'
                    : 'text-muted-foreground hover:text-blue-500',
                'flex items-center gap-3 rounded-lg p-2 font-medium transition-all',
            )}
            {...props}
        >
            <Icon className="h-4 w-4" />
            {title}
        </Link>
    );
}

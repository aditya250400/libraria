import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function NavLinkResponsive({
    active = false,
    url = "#",
    title,
    icon: Icon,
    ...props
}) {
    return (
        <Link
            className={cn(
                active
                    ? "bg-gradient-to-r from--400 via-orange-600 to-orange-500 font-semibold hover:text-white text-white"
                    : "text-muted-foreground hover:text-orange-500",
                "flex items-center gap-3 rounded-lg p-2 font-medium transition-all"
            )}
            {...props}
        >
            <Icon className="w-4 h-4" />
            {title}
        </Link>
    );
}

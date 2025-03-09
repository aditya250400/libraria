import ApplicationLogo from '@/components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Link } from '@inertiajs/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
    IconAlertCircle,
    IconBook,
    IconBuildingCommunity,
    IconCategory,
    IconChartDots2,
    IconCircleKey,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconKeyframe,
    IconLayoutKanban,
    IconLayoutSidebar,
    IconLogout,
    IconMoneybag,
    IconRoute,
    IconSettingsExclamation,
    IconStack,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';

export default function SidebarResponsive() {
    return (
        <>
            <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:justify-end lg:px-6">
                {/* sidebar responseive */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                            <IconLayoutSidebar className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex max-h-screen flex-col overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>
                                <VisuallyHidden.Root>Sidebar Responsive</VisuallyHidden.Root>
                            </SheetTitle>
                            <SheetDescription>
                                <VisuallyHidden.Root>Sidebar Responsive</VisuallyHidden.Root>
                            </SheetDescription>
                        </SheetHeader>
                        {/* sidebar */}
                        <nav className="grid gap-6 text-lg font-medium">
                            <ApplicationLogo />

                            <nav className="grid items-start text-sm font-semibold">
                                {/* dashboard */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                                <NavLinkResponsive url="#" title="Dashboard" icon={IconDashboard} />

                                {/* statistik */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
                                <NavLinkResponsive url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                                <NavLinkResponsive url="#" title="Laporan Denda" icon={IconMoneybag} />
                                <NavLinkResponsive url="#" title="Laporan Stok Buku" icon={IconStack} />

                                {/* Master */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                                <NavLinkResponsive url="#" title="Kategori" icon={IconCategory} />
                                <NavLinkResponsive url="#" title="Penerbit" icon={IconBuildingCommunity} />
                                <NavLinkResponsive url="#" title="Buku" icon={IconBook} />
                                <NavLinkResponsive url="#" title="Pengguna" icon={IconUsersGroup} />
                                <NavLinkResponsive url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />

                                {/* Peran dan Izin */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
                                <NavLinkResponsive url="#" title="Izin" icon={IconCircleKey} />
                                <NavLinkResponsive url="#" title="Peran" icon={IconVersions} />
                                <NavLinkResponsive url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                                <NavLinkResponsive url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                                <NavLinkResponsive url="#" title="Akses Rute" icon={IconRoute} />

                                {/* Transaksi */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                                <NavLinkResponsive url="#" title="Peminjaman" icon={IconCreditCardPay} />
                                <NavLinkResponsive url="#" title="Pengembalian" icon={IconCreditCardRefund} />

                                {/* Lainnya */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                                <NavLinkResponsive url="#" title="Pengumuman" icon={IconAlertCircle} />
                                <NavLinkResponsive url={route('profile.edit')} title="Profile" icon={IconUser} />
                                <NavLinkResponsive url={route('logout')} title="Logout" icon={IconLogout} />
                            </nav>
                        </nav>
                    </SheetContent>
                </Sheet>
                {/* dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex gap-x-2">
                            <span>Hi, Luffy</span>
                            <Avatar>
                                <AvatarFallback>L</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="#">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* dropdown end */}
            </header>
        </>
    );
}

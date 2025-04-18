import ApplicationLogo from '@/components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
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

export default function SidebarResponsive({ url, user }) {
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
                    <SheetContent side="left" className="flex flex-col max-h-screen overflow-y-auto">
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

                                <NavLinkResponsive
                                    active={url.startsWith('/dashboard')}
                                    url={route('dashboard')}
                                    title="Dashboard"
                                    icon={IconDashboard}
                                />
                                {/* statistik */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
                                <NavLinkResponsive url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                                <NavLinkResponsive url="#" title="Laporan Denda" icon={IconMoneybag} />
                                <NavLinkResponsive url="#" title="Laporan Stok Buku" icon={IconStack} />
                                {/* Master */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                                <NavLinkResponsive
                                    active={url.startsWith('/admin/categories')}
                                    url={route('admin.categories.index')}
                                    title="Kategori"
                                    icon={IconCategory}
                                />
                                <NavLinkResponsive
                                    url={route('admin.publishers.index')}
                                    active={url.startsWith('/admin/publishers')}
                                    title="Penerbit"
                                    icon={IconBuildingCommunity}
                                />
                                <NavLinkResponsive
                                    url={route('admin.books.index')}
                                    active={url.startsWith('/admin/books')}
                                    title="Buku"
                                    icon={IconBook}
                                />
                                <NavLinkResponsive
                                    url={route('admin.users.index')}
                                    active={url.startsWith('/admin/users')}
                                    title="Pengguna"
                                    icon={IconUsersGroup}
                                />
                                <NavLinkResponsive
                                    url={route('admin.fine-settings.create')}
                                    active={url.startsWith('/admin/fine-settings')}
                                    title="Pengaturan Denda"
                                    icon={IconSettingsExclamation}
                                />
                                {/* Peran dan Izin */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
                                <NavLinkResponsive
                                    url={route('admin.roles.index')}
                                    active={url.startsWith('/admin/roles')}
                                    title="Peran"
                                    icon={IconVersions}
                                />
                                <NavLinkResponsive
                                    url={route('admin.permissions.index')}
                                    active={url.startsWith('/admin/permissions')}
                                    title="Izin"
                                    icon={IconCircleKey}
                                />
                                <NavLinkResponsive
                                    url={route('admin.assign-permissions.index')}
                                    active={url.startsWith('/admin/assign-permissions')}
                                    title="Tetapkan Izin"
                                    icon={IconKeyframe}
                                />
                                <NavLinkResponsive
                                    url={route('admin.assign-users.index')}
                                    active={url.startsWith('/admin/assign-users')}
                                    title="Tetapkan Peran"
                                    icon={IconLayoutKanban}
                                />
                                <NavLinkResponsive url="#" title="Akses Rute" icon={IconRoute} />
                                {/* Transaksi */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                                <NavLinkResponsive
                                    url={route('admin.loans.index')}
                                    active={url.startsWith('/admin/loans')}
                                    title="Peminjaman"
                                    icon={IconCreditCardPay}
                                />
                                <NavLinkResponsive
                                    url={route('admin.return-books.index')}
                                    active={url.startsWith('/admin/return-books')}
                                    title="Pengembalian"
                                    icon={IconCreditCardRefund}
                                />
                                {/* Lainnya */}
                                <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                                <NavLinkResponsive
                                    url={route('admin.announcements.index')}
                                    active={url.startsWith('/admin/announcements')}
                                    title="Pengumuman"
                                    icon={IconAlertCircle}
                                />
                                <NavLinkResponsive
                                    url={route('profile.edit')}
                                    active={url.startsWith('/admin/profile')}
                                    title="Profile"
                                    icon={IconUser}
                                />
                                <NavLinkResponsive
                                    url={route('logout')}
                                    method="post"
                                    as="button"
                                    title="Logout"
                                    icon={IconLogout}
                                />
                            </nav>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}

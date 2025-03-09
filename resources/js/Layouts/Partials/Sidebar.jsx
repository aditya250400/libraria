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
    IconLogout,
    IconMoneybag,
    IconRoute,
    IconSettingsExclamation,
    IconStack,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';
import NavLink from '../../Components/NavLink';

export default function Sidebar({ url, user }) {
    return (
        <>
            <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
                {/* dashboard */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                <NavLink
                    active={url.startsWith('/dashboard')}
                    url={route('dashboard')}
                    title="Dashboard"
                    icon={IconDashboard}
                />

                {/* statistik */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
                <NavLink url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                <NavLink url="#" title="Laporan Denda" icon={IconMoneybag} />
                <NavLink url="#" title="Laporan Stok Buku" icon={IconStack} />

                {/* Master */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                <NavLink url="#" title="Kategori" icon={IconCategory} />
                <NavLink url="#" title="Penerbit" icon={IconBuildingCommunity} />
                <NavLink url="#" title="Buku" icon={IconBook} />
                <NavLink url="#" title="Pengguna" icon={IconUsersGroup} />
                <NavLink url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />

                {/* Peran dan Izin */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
                <NavLink url="#" title="Izin" icon={IconCircleKey} />
                <NavLink url="#" title="Peran" icon={IconVersions} />
                <NavLink url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                <NavLink url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                <NavLink url="#" title="Akses Rute" icon={IconRoute} />

                {/* Transaksi */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                <NavLink url="#" title="Peminjaman" icon={IconCreditCardPay} />
                <NavLink url="#" title="Pengembalian" icon={IconCreditCardRefund} />

                {/* Lainnya */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                <NavLink url="#" title="Pengumuman" icon={IconAlertCircle} />
                <NavLink url={route('profile.edit')} title="Profile" icon={IconUser} />
                <NavLink url="#" title="Logout" icon={IconLogout} />
            </nav>
        </>
    );
}

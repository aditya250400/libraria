import CardStat from '@/Components/CardStat';
import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import {
    IconCalendar,
    IconCalendarMonth,
    IconCalendarRepeat,
    IconCalendarWeek,
    IconChartDots2,
} from '@tabler/icons-react';

export default function Index(props) {
    return (
        <>
            <div className="flex w-full flex-col space-y-4 pb-32">
                <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_setting.title}
                        subtitle={props.page_setting.subtitle}
                        icon={IconChartDots2}
                    />
                </div>

                <h2 className="font-semibold leading-relaxed text-foreground">Total Peminjaman</h2>

                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <CardStat
                        data={{
                            title: 'Harian',
                            icon: IconCalendar,
                            background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">0</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Mingguan',
                            icon: IconCalendarWeek,
                            background: 'text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">0</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Bulanan',
                            icon: IconCalendarMonth,
                            background: 'text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">0</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Tahunan',
                            icon: IconCalendarRepeat,
                            background: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">0</div>
                    </CardStat>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

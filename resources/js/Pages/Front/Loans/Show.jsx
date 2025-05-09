import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconCircleCheck, IconCreditCardPay, IconExclamationCircle } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Show(props) {
    return (
        <>
            <div className="flex w-full flex-col pb-32">
                <div className="item-start mb-8 flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_setting.title}
                        subtitle={props.page_setting.subtitle}
                        icon={IconCreditCardPay}
                    />
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-6 border-b border-muted text-sm lg:flex-row lg:items-center lg:justify-between lg:px-6">
                        <div>
                            <dt className="font-medium text-foreground">Kode Peminjaman</dt>
                            <dd className="mt-1 text-muted-foreground">{props.loan.loan_code}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Peminjam</dt>
                            <dd className="mt-1 text-muted-foreground">{props.loan.user.name}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Tanggal Peminjam</dt>
                            <dd className="mt-1 text-muted-foreground">{props.loan.loan_date}</dd>
                        </div>
                    </CardHeader>
                    <CardContent className="divide-y divide-gray-200 py-6">
                        <div className="flex flex-wrap justify-center lg:flex-nowrap lg:items-start">
                            <div className="overfow-hidden h-40 w-40 flex-shrink-0 rounded-lg bg-gray-200">
                                <img
                                    src={props.loan.book.cover}
                                    alt={props.loan.book.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                                <h5 className="text-lg font-bold leading-relaxed">{props.loan.book.title}</h5>
                                <p className="hidden whitespace-pre-wrap text-muted-foreground lg:mt-2 lg:block">
                                    {props.loan.book.synopsis}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center">
                            {!props.loan.return_book ? (
                                <IconExclamationCircle className="size-5 text-red-500" />
                            ) : (
                                <IconCircleCheck className="size-5 text-green-500" />
                            )}
                            <p className="ml-2 text-sm font-medium text-muted-foreground">
                                {!props.loan.return_book ? (
                                    <>
                                        Kembalikan sebelum tanggal{' '}
                                        <time className="font-extrabold" dateTime={props.loan.due_date}>
                                            {props.loan.due_date}
                                        </time>
                                    </>
                                ) : (
                                    'Anda sudah mengembalikan buku ini '
                                )}
                            </p>
                        </div>
                        <div className="flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0">
                            <div className="flex flex-1 justify-center">
                                <Button variant="link">
                                    <Link href={route('front.books.show', [props.loan.book.slug])}>Lihat Buku</Link>
                                </Button>

                                {!props.loan.return_book && (
                                    <Button
                                        variant="blue"
                                        onClick={() =>
                                            router.post(
                                                route('front.return-books.store', [
                                                    props.loan.book.slug,
                                                    props.loan.loan_code,
                                                ]),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                    onSuccess: (success) => {
                                                        const flash = flashMessage(success);
                                                        if (flash) toast[flash.type](flash.message);
                                                    },
                                                },
                                            )
                                        }
                                    >
                                        Kembalikan
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

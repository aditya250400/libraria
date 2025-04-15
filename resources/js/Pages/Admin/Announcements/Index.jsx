import HeaderTitle from '@/Components/HeaderTitle';
import { AlertDescription } from '@/Components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { AlertDialogCancel, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { IconAlertCircle, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
    const { data: announcements, meta } = props.announcements;
    const [params, setParams] = useState(props.state);

    return (
        <>
            <div className="flex flex-col w-full pb-32">
                <div className="flex flex-col justify-between mb-8 item-start gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_setting.title}
                        subtitle={props.page_setting.subtitle}
                        icon={IconAlertCircle}
                    />
                    <Button variant="blue" size="lg" asChild>
                        <Link href={route('admin.announcements.create')}>
                            <IconPlus size="4" />
                            Tambah
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Pesan</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Aktif</TableHead>
                                    <TableHead>Dibuat Pada</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {announcements.map((announcement, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                        <TableCell>{announcement.message}</TableCell>
                                        <TableCell>{announcement.url}</TableCell>
                                        <TableCell>{announcement.url}</TableCell>
                                        <TableCell>{announcement.created_at}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="slate" size="sm" asChild>
                                                    <Link href={route('admin.announcements.edit', [announcement])}>
                                                        <IconPencil size="4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="red" size="sm">
                                                            <IconTrash size="4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Apakah anda benar-benar yakin?
                                                            </AlertDialogTitle>
                                                            <AlertDescription>
                                                                Tindakan ini tidak dapat dibatalkan. Tindakan ini akan
                                                                menghapus kategori ini dan semua data yang memiliki
                                                                kategori ini secara permanen!
                                                            </AlertDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    router.delete(
                                                                        route('admin.announcements.destroy', [
                                                                            announcement,
                                                                        ]),
                                                                        {
                                                                            preserveScroll: true,
                                                                            preserveState: true,
                                                                            onSuccess: (success) => {
                                                                                const flash = flashMessage(success);
                                                                                if (flash)
                                                                                    toast[flash.type](flash.message);
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                        <p className="mb-2 text-sm text-muted-foreground">
                            Menampilkan{' '}
                            <span className="text-blue-500 font-meidum">
                                {meta.to ?? 0} dari {meta.total} Pengumuman
                            </span>
                        </p>
                        <div className="overflow-x-auto">
                            {meta.has_pages && (
                                <Pagination>
                                    <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                        {meta.links.map((link, index) => (
                                            <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                                                <PaginationLink href={link.url} isActive={link.active}>
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

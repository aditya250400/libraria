import BookCard from '@/Components/BookCard';
import HeaderTitle from '@/Components/HeaderTitle';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import AppLayout from '@/Layouts/AppLayout';
import { IconCategory } from '@tabler/icons-react';

export default function Index(props) {
    const { data: books, meta } = props.books;

    return (
        <>
            <div className="flex w-full flex-col space-y-6 pb-32">
                <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={`Kategori ${props.page_setting.title}`}
                        subtitle={props.page_setting.subtitle}
                        icon={IconCategory}
                    />
                </div>

                <div className="grid gap-4 py-10 md:gap-8 lg:grid-cols-4">
                    {books.map((book, index) => (
                        <BookCard key={index} item={book} />
                    ))}
                </div>
                {meta.has_pages && (
                    <Pagination className="pb-10">
                        <PaginationContent>
                            {meta.links.map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

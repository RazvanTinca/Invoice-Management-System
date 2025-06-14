import {Fragment} from "react";

export type TablePaginationProps = {
    render: (page: number, disabled: boolean) => React.ReactNode;
    numberOfPagesToShow: number;
    pageIndex: number;
    totalPageCount: number;
    alwaysKeepNumberOfPages?: boolean;
}


export default function TablePagination({render, numberOfPagesToShow, pageIndex, alwaysKeepNumberOfPages = false, totalPageCount}: TablePaginationProps) {
    if (pageIndex < 1) return <></>

    const pages = []

    const visiblePageCount = Math.min(totalPageCount, numberOfPagesToShow);

    if (alwaysKeepNumberOfPages) {
        const halfPages = Math.floor(visiblePageCount / 2);

        let startPage;
        if (pageIndex <= halfPages) {
            startPage = 1;
        } else if (pageIndex + halfPages >= totalPageCount) {
            startPage = totalPageCount - visiblePageCount + 1
        } else {
            startPage = pageIndex - halfPages;
        }

        const endPage = startPage + visiblePageCount -1;

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

    } else {
        const pagesToTheSides = Math.floor((numberOfPagesToShow - 1) / 2);

        const startPage = Math.max(1, pageIndex - pagesToTheSides);
        const endPage = Math.min(totalPageCount, pageIndex + pagesToTheSides);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    }


    return (
        <>
            {pages.map((page, i) => (
                <Fragment key={i}>
                    {render(page, pageIndex === page)}
                </Fragment>
            ))}
        </>
    )
}
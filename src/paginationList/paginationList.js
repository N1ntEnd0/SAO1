import React, {useEffect, useState} from 'react';
import {countPage} from "../Utils/countPage";
import style from "./paginationList.scss"

export const PaginationList = () => {
    const currentPage = useState(1);
    const perPage = useState(5);
    const totalCount = useState(10)
    const pagesCount = Math.ceil(totalCount/perPage)
    const pages = []

    countPage(pages, pagesCount, currentPage);

    useEffect(()=>{
    }, [currentPage])

    return (
        <div className="pages">
            {pages.map((page, index) => <span
                key={index}
                className={currentPage == page ? "current-page" : "page"}
                onClick={() => {}}>{page}</span>)}
        </div>
    );
};


import React, { useMemo } from 'react'; 

const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {

    const range = (start, end) => {
        let length = end - start + 1;

        return Array.from({ length }, (_, idx) => idx + start);
    };

    const paginationRange = useMemo(() => {
        //logic Implementation 

        const totalPage = Math.ceil(totalCount / pageSize);
        const pageCount = siblingCount + 5; //start , end , current , 2 dots  

        if (pageCount >= totalPage) {
            return range(1, totalPage);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPage
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPage - 2

        const firstPageIndex = 1;
        const lastPageIndex = totalPage

        /*
        Case 2: No left dots to show, but rights dots to be shown
    */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPage];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPage - rightItemCount + 1,
                totalPage
            );

            return [firstPageIndex, DOTS, ...rightRange];
        }



    }, [totalCount, pageSize, siblingCount, currentPage]) // this is called depedencyy array.. 

    return (
        <div>

        </div>
    )
}

export default usePagination

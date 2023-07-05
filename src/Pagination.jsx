export function Pagination({currentPage, itemsPerPage, totalItems, setCurrentPage}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePagechange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        setCurrentPage(pageNumber);
    };

    const renderPaginationNumbers = () => {
        const paginationNumbers = [];
        for(let i = 1; i < totalPages; i++){
            paginationNumbers.push(
                <li key={i} onClick={() => handlePagechange(i)}>{i}</li>
            );
        }
        return paginationNumbers;
    };

    return (
        <ul className="pagination">
            <li onClick={() => handlePagechange(currentPage - 1)}>Prev</li>
            {renderPaginationNumbers()}
            <li onClick={() => handlePagechange(currentPage + 1)}>Next</li>
        </ul>
    );
}
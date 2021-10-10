import _ from 'lodash';

function Pagination({ launchCount, pageSize, onPageChange, currentPage }) {
    const pageCount = Math.ceil(launchCount / pageSize);
    const pages = _.range(1, pageCount + 1);

    return (
        <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={page === currentPage ? 'page-item active' : 'page-item'}
                        key={page}
                    >
                        <button
                            className="page-link"
                            type="button"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;

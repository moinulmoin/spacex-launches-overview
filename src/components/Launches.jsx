import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunches } from '../store/launchesSlice';
import paginate from '../utils/paginate';
import ErrorAlert from './ErrorAlert';
import LaunchCard from './LaunchCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

function Launches() {
    const dispatch = useDispatch();
    const { launches, isError, isLoading } = useSelector((state) => state.launches);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);

    const filteredLaunches = searchInput
        ? launches.filter((launch) =>
              launch.rocket.rocket_name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : launches;

    const allLaunches = paginate(filteredLaunches, currentPage, 12);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="my-5 text-dark fw-bold">Launches Overview</h2>

            <SearchBar searchInput={searchInput} onSearchInputChange={handleSearchInput} />

            {isError && <ErrorAlert />}
            {isLoading && <Spinner />}

            {filteredLaunches.length > 0 && (
                <div className="row g-4">
                    {allLaunches.map((launch) => (
                        <LaunchCard launch={launch} key={launch.mission_name} />
                    ))}
                </div>
            )}

            {searchInput && filteredLaunches.length === 0 && (
                <ErrorAlert errorMessage={searchInput} searchError />
            )}

            {filteredLaunches.length > 12 && (
                <Pagination
                    launchCount={launches.length}
                    pageSize={12}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default Launches;

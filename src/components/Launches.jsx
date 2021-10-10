import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../common/ErrorAlert';
import Spinner from '../common/Spinner';
import Filters from '../features/Filters';
import { getLaunches } from '../store/launchesSlice';
import paginate from '../utils/paginate';
import LaunchCard from './LaunchCard';
import Pagination from './Pagination';

function Launches() {
    const dispatch = useDispatch();
    const { launches, isError, isLoading } = useSelector((state) => state.launches);
    const { searchInput, successCheckbox, failedCheckbox, upcomingCheckbox } = useSelector(
        (state) => state.filters
    );

    const [currentPage, setCurrentPage] = useState(1);

    // Fetch launches on component mount
    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);

    // set pageNumber one when failedCheckbox is checked to prevent unexpected behaviour
    useEffect(() => {
        if (failedCheckbox) {
            setCurrentPage(1);
        }
    }, [failedCheckbox]);

    // launches if searchInput is empty or if searchInput is not empty, show launches contains searchInput
    const searchedLaunches = searchInput
        ? launches.filter((launch) =>
              launch.rocket.rocket_name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : launches;

    // filter launches based on successCheckbox, failedCheckbox and upcomingCheckbox
    let filteredLaunches;
    if (successCheckbox && !failedCheckbox) {
        filteredLaunches = searchedLaunches.filter((launch) => launch.launch_success === true);
    } else if (failedCheckbox && !successCheckbox) {
        filteredLaunches = searchedLaunches.filter((launch) => launch.launch_success === false);
    } else if (successCheckbox && failedCheckbox) {
        filteredLaunches = searchedLaunches.filter((launch) => launch.upcoming === false);
    } else if (upcomingCheckbox && !successCheckbox && !failedCheckbox) {
        filteredLaunches = searchedLaunches.filter((launch) => launch.upcoming === true);
    } else {
        filteredLaunches = searchedLaunches;
    }

    // paginate filteredLaunches
    const allLaunches = paginate(filteredLaunches, currentPage, 12);

    // set currentPage whenever pageNumber changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="my-5 text-dark fw-bold">Launches Overview</h2>

            {/* All filter functionality */}
            <Filters />

            {/* will show if any error happens while fetching */}
            {isError && <ErrorAlert />}

            {/* will show if data is loading */}
            {isLoading && <Spinner />}

            {/* will show if data is loaded */}
            {filteredLaunches.length > 0 && (
                <div className="row g-4">
                    {allLaunches.map((launch) => (
                        <LaunchCard launch={launch} key={launch.mission_name} />
                    ))}
                </div>
            )}

            {/* will show if searched content is not available */}
            {searchInput && filteredLaunches.length === 0 && (
                <ErrorAlert searchError errorMessage={searchInput} />
            )}

            {/* will show all data in a decent way */}
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

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
    const [successCheckbox, setSuccessCheckbox] = useState(false);
    const [failedCheckbox, setFailedCheckbox] = useState(false);
    const [upcomingCheckbox, setUpcomingCheckbox] = useState(false);

    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);

    useEffect(() => {
        if (failedCheckbox) {
            setCurrentPage(1);
        }
    }, [failedCheckbox]);

    const searchedLaunches = searchInput
        ? launches.filter((launch) =>
              launch.rocket.rocket_name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : launches;

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

    const allLaunches = paginate(filteredLaunches, currentPage, 12);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSuccessCheckbox = () => {
        setSuccessCheckbox(!successCheckbox);
        setUpcomingCheckbox(false);
    };

    const handleFailedCheckbox = () => {
        setFailedCheckbox(!failedCheckbox);
        setUpcomingCheckbox(false);
    };

    const handleUpcomingCheckbox = () => {
        setUpcomingCheckbox(!upcomingCheckbox);
        setSuccessCheckbox(false);
        setFailedCheckbox(false);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="my-5 text-dark fw-bold">Launches Overview</h2>

            <div className="d-flex justify-content-between align-items-center mb-5 w-100">
                <div className="d-flex">
                    <span className="text-muted fw-bold me-2">Launch Status:</span>
                    <div className="form-check me-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={successCheckbox}
                            onChange={handleSuccessCheckbox}
                            id="successful"
                        />
                        <label className="form-check-label" htmlFor="successful">
                            Successful
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={failedCheckbox}
                            onChange={handleFailedCheckbox}
                            id="failed"
                        />
                        <label className="form-check-label" htmlFor="failed">
                            Failed
                        </label>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="upcoming-launched"
                        checked={upcomingCheckbox}
                        onChange={handleUpcomingCheckbox}
                    />
                    <label className="form-check-label" htmlFor="upcoming-launched">
                        Upcoming Launches
                    </label>
                </div>
                <SearchBar searchInput={searchInput} onSearchInputChange={handleSearchInput} />
            </div>

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

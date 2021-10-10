import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunches } from '../store/launchesSlice';
import paginate from '../utils/paginate';
import ErrorAlert from './ErrorAlert';
import LaunchCard from './LaunchCard';
import Pagination from './Pagination';
import Spinner from './Spinner';

function Launches() {
    const { launches, isError, isLoading } = useSelector((state) => state.launches);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const allLaunches = paginate(launches, currentPage, 12);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="my-5 text-dark fw-bold">Launches Overview</h2>
            {isError && <ErrorAlert />}
            {isLoading && <Spinner />}
            {launches && launches.length > 0 && (
                <div className="row g-4">
                    {allLaunches.map((launch) => (
                        <LaunchCard launch={launch} key={launch.mission_name} />
                    ))}
                </div>
            )}
            {launches && launches.length > 0 && (
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

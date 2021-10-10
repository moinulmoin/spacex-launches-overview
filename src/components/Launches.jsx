/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunches } from '../store/launchesSlice';
import ErrorAlert from './ErrorAlert';
import Spinner from './Spinner';

function Launches() {
    const { launches, isError, isLoading } = useSelector((state) => state.launches);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            {isError && <ErrorAlert />}
            {isLoading && <Spinner />}
            <div className="row g-4">
                {launches &&
                    launches.map((launch) => (
                        <div
                            className="col-12 col-sm-2 col-md-4 col-xl-3"
                            key={launch.mission_name}
                        >
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-3">
                                        <span className="text-muted">Year:</span>{' '}
                                        {launch.launch_year}
                                        {launch.upcoming && (
                                            <span className="badge bg-primary float-end">
                                                Upcoming
                                            </span>
                                        )}
                                        {launch.launch_success && (
                                            <span className="badge bg-success float-end">
                                                Successfully launched
                                            </span>
                                        )}
                                        {!launch.launch_success && !launch.upcoming && (
                                            <span className="badge bg-danger float-end">
                                                Failed to launch
                                            </span>
                                        )}
                                    </h6>
                                    <h5 className="card-title">
                                        <span className="text-muted">Mission name:</span>{' '}
                                        {launch.mission_name}
                                    </h5>
                                    <h5 className="card-title">
                                        <span className="text-muted">Rocket name:</span>{' '}
                                        {launch.rocket.rocket_name}
                                    </h5>
                                    <h5 className="card-title">
                                        <span className="text-muted">Rocket type:</span>{' '}
                                        {launch.rocket.rocket_type}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Launches;

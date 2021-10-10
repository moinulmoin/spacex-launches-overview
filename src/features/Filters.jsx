import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { filtersActions } from '../store/flitersSlice';

function Filters() {
    const dispatch = useDispatch();
    const { successCheckbox, failedCheckbox, upcomingCheckbox } = useSelector(
        (state) => state.filters
    );

    const { handleSuccessCheckbox, handleFailedCheckbox, handleUpcomingCheckbox } = filtersActions;
    return (
        <div className="d-flex justify-content-between align-items-center mb-5 w-100">
            <div className="d-flex">
                <span className="text-muted fw-bold me-2">Launch Status:</span>
                <div className="form-check me-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={successCheckbox}
                        onChange={() => dispatch(handleSuccessCheckbox())}
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
                        onChange={() => dispatch(handleFailedCheckbox())}
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
                    onChange={() => dispatch(handleUpcomingCheckbox())}
                />
                <label className="form-check-label" htmlFor="upcoming-launched">
                    Upcoming Launches
                </label>
            </div>
            <SearchBar />
        </div>
    );
}

export default Filters;

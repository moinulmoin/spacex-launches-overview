import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../store/flitersSlice';

function SearchBar() {
    const dispatch = useDispatch();
    const { searchInput } = useSelector((state) => state.filters);

    const { handleSearchInput } = filtersActions;

    return (
        <div className="input-group w-25">
            <span className="input-group-text" id="basic-searchbar">
                Search:
            </span>
            <input
                value={searchInput}
                onChange={(e) => dispatch(handleSearchInput(e.target.value))}
                type="text"
                className="form-control"
                placeholder="Enter Rocket Name"
                aria-label="Enter Rocket Name"
                aria-describedby="basic-searchbar"
            />
        </div>
    );
}

export default SearchBar;

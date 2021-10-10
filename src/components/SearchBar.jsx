function SearchBar({ searchInput, onSearchInputChange }) {
    return (
        <div className="input-group w-25">
            <span className="input-group-text" id="basic-searchbar">
                Search:
            </span>
            <input
                value={searchInput}
                onChange={onSearchInputChange}
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

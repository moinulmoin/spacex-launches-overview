function SearchBar({ searchInput, onSearchInputChange }) {
    return (
        <form className="mb-5 w-25 ms-auto">
            <input
                value={searchInput}
                onChange={onSearchInputChange}
                type="text"
                className="form-control"
                placeholder="Search by Rocket Name"
                aria-label="Search by Rocket Name"
                aria-describedby="basic-searchbar"
            />
        </form>
    );
}

export default SearchBar;

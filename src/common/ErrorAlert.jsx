function ErrorAlert({ searchError = false, errorMessage }) {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg
                className="me-2 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            {searchError ? (
                <div>
                    No results found for `<span className="fw-bold">{errorMessage}</span>`
                </div>
            ) : (
                <div> Oops, Something went wrong!</div>
            )}
        </div>
    );
}

export default ErrorAlert;

import Logo from '../assets/images/logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            <a className="navbar-brand mx-auto py-3" href="https://www.spacex.com/launches/">
                <img src={Logo} alt="Space X" height="50px" />
            </a>
        </nav>
    );
}

export default Navbar;

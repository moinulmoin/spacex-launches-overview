import Footer from './components/Footer';
import Launches from './components/Launches';
import Topbar from './components/Topbar';

function App() {
    return (
        <>
            <div className="container">
                {/* Site Top bar */}
                <Topbar />

                {/* Main Component with all essential functionality  */}
                <Launches />
            </div>
            {/* Site Footer */}
            <Footer />
        </>
    );
}

export default App;

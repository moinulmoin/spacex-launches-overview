import Footer from './components/Footer';
import Launches from './components/Launches';
import Topbar from './components/Topbar';

function App() {
    return (
        <>
            <div className="container">
                <Topbar />
                <Launches />
            </div>
            <Footer />
        </>
    );
}

export default App;

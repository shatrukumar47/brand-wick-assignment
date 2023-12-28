import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MainRoute from './routes/MainRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{minHeight: "calc(100vh - 104px)"}}>
        <MainRoute />
      </div>
      <Footer />
    </div>
  );
}

export default App;

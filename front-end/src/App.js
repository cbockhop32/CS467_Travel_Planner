import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar/NavBar';
import SearchBar from './SearchBar/SearchBar';
import MainContainer from './MainContainer/MainContainer';
import DashboardPage from './DashboardPage/DashboardPage';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { ExperiencesProvider } from './Context/ExperiencesContext';



function App() {
  return (
    <div className="App"  >
      <Router>
        <ExperiencesProvider>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route exact path ='/' element={<MainContainer />} />
            <Route exact path ='/dashboard' element={<DashboardPage />} />
          </Routes>
        </ExperiencesProvider>

      </Router>
    </div>
  );
}

export default App;

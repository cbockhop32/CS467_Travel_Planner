import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar/NavBar';
import SearchBar from './SearchBar/SearchBar';
import MainContainer from './MainContainer/MainContainer';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <SearchBar/>
      <MainContainer />
    </div>
  );
}

export default App;

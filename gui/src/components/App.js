import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFound from '../components/NotFound'
import Spacecrafts from '../components/Spacecrafts'
import Astronauts from '../components/Astronauts';

import "./App.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Spacecrafts/>}/>
        <Route path = '/spacecrafts/:id' element = {<Astronauts/>}/>
        <Route path = '*' element = {<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


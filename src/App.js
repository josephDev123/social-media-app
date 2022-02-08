import './App.css';
import Layout from './components/Layout';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import {Home} from './components/pages/Home';
import Explore from './components/pages/Explore';



function App() {
  return (
    <BrowserRouter> 
      <div className="App">
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element= {<Home/>}/>
              <Route path='expore' element= {<Explore/>}/>
            </Route>


          </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;

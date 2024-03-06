import './App.css';
import PokemonPageClass from "./components /page/pokemonPage/PokemonPageClass";
import PokemonPage from "./components /page/pokemonPage/PokemonPage";
import CountPageClass from "./components /page/countPageClass/CountPageClass";
import CountPage from "./components /page/countPage/CountPage";
import UserInfo from "./components /page/userInfo/UserInfo";
import Users from "./components /page/users/Users";
import FormPage from "./components /page/formPage/FormPage";
import Menu from "./components /menu/Menu";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PokemonInfoPage from "./components /page/pokemonInfoPage/PokemonInfoPage";
function App() {
     return(
         <BrowserRouter>
             <Menu/>
             <Routes>
                 <Route path='/' element={<PokemonPage/>}/>
                 <Route path='/pokemon-class' element={<PokemonPageClass/>}/>
                 <Route path='/count' element={<CountPage/>}/>
                 <Route path='/countClass' element={<CountPageClass/>}/>
                 <Route path='/users' element={<Users/>}/>
                 <Route path='/form' element={<FormPage/>}/>
                 <Route path='/users/:id' element={<UserInfo/>}/>
                 <Route path='/pokemon/:id' element={<PokemonInfoPage/>}/>
             </Routes>

         </BrowserRouter>
     )
}



export default App;

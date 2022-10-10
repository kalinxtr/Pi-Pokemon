import './App.css';
import Landing from './components/Landing/Landing';
import {Provider} from "react-redux"
import store from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NewPokemon from './components/newPokemon/NewPokemon';
import Detail from './components/Detail/Detail';

function App() {
  return(
    <BrowserRouter>
    <Switch>
      <Provider store = {store}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/newPokemon" component={NewPokemon} />
        <Route exact path="/home/:id" component={Detail}/>
      </Provider>
    </Switch>
    </BrowserRouter>
  )
}

export default App;

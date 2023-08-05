// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route, BrowserRouter, Switch} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LangingPage';
import Detail from './components/Detail';
import Create from './components/Create';
import Page404 from './components/Page404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
    <Switch >
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/detail/:id' component={Detail } />
      <Route exact path='/create' component={Create } />
      <Route path='*' component={Page404} />
    </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;

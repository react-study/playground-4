import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import { Home, About, Name, Portfolio } from './Components';

const RouterMain = () => (
  <Router>
  <div> {/* Router 컴포넌트의 자식요소에는 오직 하나의 컴포넌트만 올 수 있다. */}
    <header>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about/name">About - Name</Link></li>
        <li><Link to="/about/redirect">About - RedirectTo: Portfolio #1</Link></li>
        <li><Link to="/portfolio">Portfolio - All</Link></li>
        <li><Link to="/portfolio/0">Portfoilo - #0</Link></li>
        <li><Link to="/portfolio/1">Portfoilo - #1</Link></li>
      </ul>
    </header>

    <Route exact path="/" component={Home} /> 
    <Route path="/about" component={About} />
    <Route path="/about/name" component={Name} />
    <Switch>
      <Redirect from="/about/redirect" to="/portfolio/1" />
      <Route exact path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:id" component={Portfolio} />
    </Switch>
  </div>
  </Router>
);
export default RouterMain

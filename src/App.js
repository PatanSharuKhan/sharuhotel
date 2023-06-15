import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import DetailedRestaurant from './pages/DetailedRestaurant'
import Register from './pages/Register'
import Cart from './pages/Cart'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={DetailedRestaurant}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App

import {Component} from 'react'
import './index.css'
import '../../App.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

class Register extends Component {
  renderUserInputForm = () => {
    const x = 10
    return (
      <form className="register-form w-100 d-flex flex-column">
        <label htmlFor="name">Restaurant Name</label>
        <input type="text" placeholder="Enter name" />
        <input type="number" placeholder="Enter Price" />
        <input type="Rating" placeholder="Enter Rating" />
      </form>
    )
  }

  renderHeader = () => (
    <h1 className="register-title text-center">Register New Restaurant</h1>
  )

  render() {
    return (
      <div className="register-box">
        <Navbar />
        {this.renderHeader()}
        {this.renderUserInputForm()}
        <Footer />
      </div>
    )
  }
}

export default Register

import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, message: ''}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value, isError: false})
  }

  changePassword = event => {
    this.setState({password: event.target.value, isError: false})
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '') {
      this.setState({isError: true, message: 'enter valid username'})
    } else if (password === '') {
      this.setState({isError: true, message: 'enter valid password'})
    } else {
      const userDetails = {username, password}
      this.verifyDetails(userDetails)
    }
  }

  verifyDetails = async userDetails => {
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 5})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        isError: true,
        message: 'Please enter a valid Username & Password',
      })
    }
  }

  //   -----------[ sub blocks ]--------------

  renderImage = () => (
    <img
      className="login-image"
      src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675574008/Rectangle_1457_ckbxkv.png"
      alt="website login"
    />
  )

  renderIconContainer = () => (
    <div className="login-icon-container">
      <img
        src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675511877/Frame_274_u2ev4l.png"
        alt="website logo"
      />
      <h1>Tasty Kitchens</h1>
    </div>
  )

  renderLoginTitle = title => <h1 className="login-title">{title}</h1>

  renderInputField = (label, input, placeholder, id, event) => (
    <>
      <label className="login-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={input}
        placeholder={placeholder}
        className="login-input"
        id={id}
        onChange={event}
      />
    </>
  )

  renderButton = text => (
    <button type="submit" className="login-btn">
      {text}
    </button>
  )

  renderError = text => <p className="login-error-msg">{text}</p>

  render() {
    const {isError, message} = this.state
    return (
      <div className="login-container">
        <div className="left-container">
          <form className="form-container" onSubmit={this.onSubmitDetails}>
            {this.renderImage()}
            {this.renderIconContainer()}
            {this.renderLoginTitle('Login')}
            {this.renderInputField(
              'USERNAME',
              'text',
              '',
              'username',
              this.changeUsername,
            )}
            {this.renderInputField(
              'PASSWORD',
              'password',
              '',
              'password',
              this.changePassword,
            )}
            {isError && this.renderError(message)}
            {this.renderButton('Login')}
          </form>
        </div>
        <div className="right-container">
          <img
            className="eggs-fry"
            src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675578533/Rectangle_1456_pokwbg.png"
            alt="eggs fry"
          />
        </div>
      </div>
    )
  }
}

export default Login

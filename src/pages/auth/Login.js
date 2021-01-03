import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux'

const Login = ({ history }) => {
  const [email, setEmail] = useState("daikadai96@gmail.com");
  const [password, setPassword] = useState("123123");
  const [loading, setLoading] = useState(false)

  let dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      //  console.log(result);
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: user.email,
          token: idTokenResult.token
        }
      })

      history.push('/')
    } catch (error) { 
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <br />
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;

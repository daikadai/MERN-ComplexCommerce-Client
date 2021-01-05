import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";


const Login = ({ history }) => {
  const [email, setEmail] = useState("daikadai96@gmail.com");
  const [password, setPassword] = useState("123123");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state)

  useEffect(() => {
    if(user && user.token) {
      history.push('/')
    }
  }, [user])

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //  console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then(
          res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                role: res.data.role,
                email: res.data.email,
                token: idTokenResult.token,
                _id: res.data._id
              },
            });
          }
        )
        .catch()

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
        .then(
          res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                role: res.data.role,
                email: res.data.email,
                token: idTokenResult.token,
                _id: res.data._id
              },
            });
          }
        )
        .catch()
        history.push("/");
      })
      .catch(err => {
        console.log(err)
        toast.error(err.message)
      })
  }

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
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          <br />
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to='/forgot/password' className='float-right text-danger'>Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

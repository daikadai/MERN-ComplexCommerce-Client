import { useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import { auth } from "./firebase";
import { useDispatch } from 'react-redux'
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user);

        currentUser(idTokenResult.token)
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
        .catch(err => console.log(err))
      }
    })

    //cleanup
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </>
  );
}

export default App;

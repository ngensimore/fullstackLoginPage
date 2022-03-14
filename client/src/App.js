import React, {useState, useEffect} from 'react';
import './styles.css'
function App() {
  const userNameRef = React.useRef();
  const passwordRef = React.useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(()=>console.log(loggedInUser), [loggedInUser]);

  function checkSignIn(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/user?username=${userNameRef.current.value}&password=${passwordRef.current.value}`,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        setLoggedIn(true);
        setLoggedInUser({username:data[0].username, password: data[0].password});
      });
  }

  function checkSignUp(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/user`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username : userNameRef.current.value, password: passwordRef.current.value})
    })
      .then(response => response.json())
      .then(data => {
        setLoggedIn(true);
        setShowSignUp(false);
      });
  }

  function logOut(){
    setLoggedInUser([]);
    setLoggedIn(false);
  }

  function setSignUpHandler(){
    setShowSignUp(true);
  }

  if(!loggedIn && !showSignUp){
    return (
      <>
        <form className = "form" onSubmit={checkSignIn}>
            <label>
                Username:
                <input type="text" name="name" ref = {userNameRef}/>
            </label>
            <br />
            <label>
                Password:
                <input type="text" name="name" ref = {passwordRef}/>
            </label>
            <input type="submit" value="Login" />
            <button onClick={setSignUpHandler}>Sign Up</button>
        </form>
      </>
  );
  }
  else if(showSignUp){
    return (
      <form className = "form" onSubmit={checkSignUp}>
          <label>
              Username:
              <input type="text" name="name" ref = {userNameRef}/>
          </label>
          <br />
          <label>
              Password:
              <input type="text" name="name" ref = {passwordRef}/>
          </label>
          <input type="submit" value="Sign Up" />
      </form>
  );
  }
  else{
    return(
      <div className='LoggedInPage'>
        <h2>Your Logged In!</h2>
        <button onClick={logOut}>Log Out!</button>
      </div>
    )
  }
}
export default App;
import { useState } from "react";

const Attendance = () => {
    const [loginTime, setLoginTime] = useState(null);
    const [logoutTime, setLogoutTime] = useState(null);
  
    function login() {
      const currentTime = new Date();
      setLoginTime(currentTime);
    }
  
    function logout() {
      const currentTime = new Date();
      setLogoutTime(currentTime);
    }
  
    return (
      <div>
        <button onClick={login}>Log In</button>
        <button onClick={logout}>Log Out</button>
        <div>
          {loginTime && <p>Login Time: {loginTime.toLocaleString()}</p>}
          {logoutTime && <p>Logout Time: {logoutTime.toLocaleString()}</p>}
        </div>
      </div>
    );
  
}

export default Attendance
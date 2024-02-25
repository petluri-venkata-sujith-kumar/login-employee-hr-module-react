// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get('http://106.51.76.167:8080/user/all');
//       const userData = response.data.body;

//       if (userData) {
//         if (userData.password === password && userData.email) {
//           navigate('/dashboard', { state: { userData } });
//         } else {
//           setError('Invalid password. Please try again.');
//         }
//       } else {
//         setError('User not found. Please check your email.');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>

//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default LoginForm;















import {v1 as uuid} from 'uuid';
import {useState} from "react";
import LoginForm from './LoginForm';


const Login = () => {
    let[state ,setState]=useState(
        {
         items:[],
         id:uuid(),
         email:"",
         password:"",
        }
    );
   
        const [isFocused,setFocused]=useState(false);
          const handleFocus=()=>setFocused(true);
          const handleBlur =()=>setFocused(false);
    

    let handleChange=(e) =>{
        let{name,value}=e.target;
        setState({...state,[name]:value});
    };
    let handleSubmit = () => {
        try {
          let newItem = {
            id: state.id,
            email: state.email,
            password: state.password,
          };
          let updatedItem = [...state.items, newItem];
          console.log(updatedItem);
          setState({
            items: updatedItem,
            id: uuid(),
            email: "",
            password: "",
          });
          console.log(state);
        } catch (error) {
          console.log(error);
        }
      };
      
   
  return (
    <section id="mainBlock">
        <article>
            <main>
               <LoginForm email={state.email} password={state.password} handleChange={handleChange} handleSubmit={handleSubmit}  onFocus={handleFocus} onBlur={handleBlur} isFocused={isFocused}/>    
            </main>
        </article>
    </section>
  )
}

export default Login
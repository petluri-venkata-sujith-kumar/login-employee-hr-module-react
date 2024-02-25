/* eslint-disable react/prop-types  */

import { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Section = Styled.section`
width:100%;
height:100vh;
background:#fff;
`;
const Article = Styled.article`
width:90%;
height:inherit;
margin:0 auto;
display:flex;
align-items:center;
justify-content:center;
gap:30px;
`;
const H1 = Styled.h1`
padding:10px 40px;
color:black;
font-size: 3.5rem;
font-style:revert-layer;
font-weight:700;
letter-spacing:1.6px;`;
const Main = Styled.form`
background:#fff;
width: 380px;
height: 450px;
padding: 25px;
border: 1px solid grey;
border-radius:5px;
box-shadow:0 5px 10px #CC5500;
border:none;
`;
const Div = Styled.div`
margin:25px 0;
position:relative;
`;
const Button = Styled.button`
border:1px solid #CC5500;;
width:95%;
padding:10px;
border-radius:5px;
color:#fff;
background:#CC5500;
font-size:16px;
text-transform:uppercase;
font-weight:500;
margin:10px 0
cursor:pointer;
&:hover{
     background:#111
}`;

const Div1 = Styled.div`
height:450px;
background-color:#fff;
flex-basis:60%`;

const P = Styled.p`
margin:30px;
font-size: 1rem;`;

const Div2 = Styled.div`
display:flex;
justify-content:space-evenly;
padding:20px;`;

const Span = Styled.span`
color:#CC5500;
`;

const Span1 = Styled.span`
margin-left:100px;

`;
const Head1 = Styled.h1`
padding:10px 40px;
color:#CC5500;;
font-size: 3.5rem;
letter-spacing:1.6px;`;

const Input = Styled.input`
width: 95%;
padding: 10px;
margin: 10px 0;
border: 1px solid #CC5500;;
border-radius: 5px;


&:focus + label,
input:not(:placeholder-shown) + label {
  opacity: 1;
  transform: scale(0.75) translateY(-60%) translateX(-8px);
  top:${({ isFocused, hasContent }) =>
    isFocused || hasContent ? "-23px" : "0"};
}
`;

const Label = Styled.label`
padding: 18px 15px;
pointer-events: none;
color:#CC5500;
marigin-top:2px;
margin-left:2px;
position: absolute;
left: 0;
top:${({ isFocused, hasContent }) => (isFocused || hasContent ? "-27px" : "0")};
transition: 0.2s;
transition-timing-function: ease;
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
// opacity: 0.5;
transform:scale(${({ isFocused, hasContent }) =>
  isFocused || hasContent ? "0.8" : "1"});
color:${({ isFocused, hasContent }) =>
  isFocused || hasContent ? "#ed940d" : "rgba(225,137,66,0.54)"}
background: #ffffff;
`;

const ToggleIcon = Styled.span`
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const LoginForm = ({
  email,
  password,
  handleSubmit,
  handleChange,
  handleFocus,
  handleBlur,
  isFocused,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [userId,setUserId]=useState()
  const [role, setRole] = useState("");
  const [validateUser, setValidateUser] = useState(null);
  let navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://106.51.76.167:8080/user/all");
        setApiData(response.data.body);
      } catch (error) {
        toast.error("An error occurred while logging in");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let userData = apiData.filter(
      (item) => item.email === email && item.password === password
    );

    if (userData.length > 0) {
      setValidateUser(true);
      console.log(userData);
      setUserId(userData[0].userId)
      setRole(userData[0].userRole);
      /* console.log(userData); */
      console.log(userData[0].userId);
    } else {
      setValidateUser(false);
    }
  }, [email, password, apiData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateUser === true) {
      if (role === "TRAINER") {
        toast.success("Logged in successfully", {
          duration: 5000,
          position: "top-center",
        });
        navigate("/dashboard", { state: { userId ,validateUser } });
      } else if (role === "HR") {
        toast.success("Logged in successfully", {
          duration: 5000,
          position: "top-center",
        });
      window.localStorage.setItem("userId", userId);
        navigate("/hrdashboard", { state: { userId ,validateUser} });
      }
    } else {
      toast.error("Invalid username or password");
    }
    handleSubmit();
  };

  return (
    <Section>
      <Toaster />
      <Article>
        <Div1>
          <H1>Welcome To</H1>
          <Head1>Alpha</Head1>
          <Head1>Login Page</Head1>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
        </Div1>

        <Main onSubmit={(e) => handleFormSubmit(e)}>
          <Div className="form-group">
            <Input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isFocused={isFocused}
            />
            <Label htmlFor="email" hasContent={email.length > 0}>
              Email
            </Label>
          </Div>
          <Div className="form-group">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isFocused={isFocused}
            />
            <Label htmlFor="password" hasContent={password.length > 0}>
              Password
            </Label>
            <ToggleIcon onClick={handleTogglePassword}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </ToggleIcon>
          </Div>

          <Div className="form-group">
            <Button background="#111" type="submit">
              Login
            </Button>
          </Div>
        </Main>
      </Article>
    </Section>
  );
};

export default LoginForm;

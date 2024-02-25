import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  height: 31.25em;
  width:27em;
  background-color:#fff;
  border-radius:0.375rem;
  display:flex;
  align-items:center;
  flex-wrap: wrap;
  box-shadow: 0px 1px 5px 1px #cc5500;
`;
const Form = styled.form`
  padding:1.2em;
  /* width: 2rem; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Div= styled.div`
  width: 90%;
  margin: 1.25em auto;
  position: relative;
`;
const Div1=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 1.25em auto;
  position: relative;
  gap:15px;

`
const Input = styled.input`
  width: 100%;
  padding: 0.938em;
  border: 2px solid #e0e0e0;
  border-radius:0.313em;
    font-size:15px;
  &:focus + label,
  input:not(:placeholder-shown) + label {
    opacity: 1;
    transform: scale(0.75) translateY(-100%) translateX(-8px);
    color:#CC5500;
    font-size:15px;
  }
  &:focus {
    outline: none;
    border-color:#CC5500 ;
    color:#CC5500;
    font-size:15px;
    font-weight:700;
  }
`;

const Label = styled.label`
  padding: 0.875em;
  pointer-events: none;
  color:#CC5500;
  margin-top: 2px;
  margin-left:2px;
  position: absolute;
  height:10px;
  /* padding-left:0.725rem; */
  left: 0;
  top: ${({ isFocused, hasContent }) => (isFocused || hasContent ? '-23px' : '0')};
  font-weight:600;
  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  /* opacity: 0.3; */
  transform: scale(${({ isFocused, hasContent }) => (isFocused || hasContent ? '0.8' : '1')});
  color: ${({ isFocused, hasContent }) => (isFocused || hasContent ? '#ed940d' : 'rgba(225, 137, 66, 0.54)')};
  background: #ffffff;
`;

const Button=styled.button`
  width:100%;
  height:2.813em;
  background-color:#CC5500;
  border:1px solid #CC5500;
  color:#fff;
  font-weight:500;
  font-size:0.938em;
  border-radius:0.375em;
  text-transform:uppercase;
`
export const FormDiv = () => {
  let [state,setState]=useState({
    course:"",
    trainer:"",
    batch_code:"", 
    date:"",
    time:""
  })
  let {course,trainer,batch_code,date,time}=state
  console.log(course);
  console.log(trainer);
  console.log(batch_code)

  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleChange = (e) =>
  {let {name,value}=e.target
   setState({...state,[name]:value})};

   const handleSubmit=e=>{
    e.preventDefault()
   console.log({...state})
   }
  return (
    <div id="formDiv">
      <Section>
        <Form  onSubmit={handleSubmit}>
          <Div1>
            <div>
            <Input
              type="text"
              name="course"
              id="course"
              placeholder=""
              value={course}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Label htmlFor="course" hasContent={course.length > 0}>Course</Label>
            </div>
           <div style={{position:"relative"}}>
           <Input
              type="text"
              name="trainer"
              id="trainer"
              placeholder=""
              value={trainer}
              onChange={handleChange}
              // onFocus={valChange}
            />
            <Label htmlFor="trainer" hasContent={trainer.length > 0}>trainer</Label>
           </div>
          </Div1>
          <Div>
            <Input
              type="text"
              name="batch_code"
              id="batch_code"
              placeholder=""
              value={batch_code}
              onChange={handleChange}
            />
            <Label htmlFor="trainer" hasContent={batch_code.length > 0}>Batch code</Label>
          </Div>
          <Div>
            <Input type="date"  id="Date" name="date" placeholder=""  value={date} onChange={handleChange} />
            {/* <Label htmlFor="date">Date</Label> */}
          </Div>
          <Div>
            <Input type="time" name="time" id="time" placeholder="" value={time}  onChange={handleChange}/>
            {/* <Label htmlFor="time">Time</Label> */}
          </Div>
          <Div>
           <Button>assign</Button>
          </Div>
        </Form>
      </Section>
    </div>
  );
};



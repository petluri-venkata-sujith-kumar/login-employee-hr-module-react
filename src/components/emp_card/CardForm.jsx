import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";
import "./empcard.css"
import { GoDotFill } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
const CardForm = () => {
  const [state, setState] = useState(null);
  let fun = async () => {
    let {
      data: { body },
    } = await axios.get("http://106.51.76.167:8080/user/all");
    console.log(body[0].userRole);
    setState(body);
  };
  useEffect(() => {
    fun();
  }, []);

  const [flipped, setFlipped] = useState();

  return (
    <div id="emp_container">
      {/* <h1>employee details</h1> */}
      {state === null
        ? "loading...."
        : state.map((state) => {
            // console.log(state.phone);
            return (
              state.userRole === "TRAINER" && (
                
                  <div className={state.userStatus ==="ACTIVE"?"wrapper":"dull_wrapper"} onClick={()=>setFlipped(state.empId)} onDoubleClick={()=>setFlipped()} >
                    <ReactCardFlip  isFlipped={flipped === state.empId} flipDirection="horizontal">
                      <div className="front">
                        <section>
                          <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-2180848911.jpg" />
                        </section>
                        <div className="info">
                        <div className="name">{state.name}
                        <div className="edit_icon">
                            <FaUserEdit/>
                          </div>
                        </div>
                        <hr />
                        <div>{state.email}</div>
                          <div><span>EmpId:</span> {state.empId}</div>
                          {/* <div><span>Password:</span> {state.password}</div> */}
                          
                          <div className="status">
                            {state.userStatus === "IN_ACTIVE" ?<GoDotFill color="red"/>:<GoDotFill color="green" /> }
                          </div>
                        </div> 
                      </div>
                      <div  className="back">
                          {/* <input type="text" /> */}
                          <br />
                          {state.phone && (
                            <QRCode
                              value={state.phone.toString()}
                              bgColor="#fff"
                              fgColor="#111"
                              size="180"
                            />
                          )}
                        </div>
                    </ReactCardFlip>
                  </div>
                
              )
            );
          })}
    </div>
  );
};

export default CardForm;

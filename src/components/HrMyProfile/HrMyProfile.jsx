import React, { useEffect, useState } from "react";
import axios from "axios";
import "./hrMyProfile.css";
import { useParams } from 'react-router-dom';

const HrMyProfile = () => {
  const [hrData, setHrData] = useState(null);
  // const { userId } = useParams();
  // console.log(userId)
  const userId=window.localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://106.51.76.167:8080/user/${userId}`
          );
          setHrData(response.data.body);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [userId]);
  
  
  if (!hrData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cardContainer">
      <div className="card">
        <div className="left-container">
          <img
            src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__480.jpg"
            alt="Profile"
          />
          <h2 className="gradienttext">{hrData.name}</h2>
          <p className="eid">EMP ID: {hrData.empId}</p>
        </div>
        <div className="right-container">
          <h1 className="gradienttext">Profile Details</h1>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{hrData.name}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>+91 {hrData.phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{hrData.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrMyProfile;

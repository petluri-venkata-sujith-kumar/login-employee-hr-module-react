/* eslint-disable react/prop-types */
import { useState, useEffect, useId } from "react";
import axios from "axios";
import "./ProfileDetail.css";
import TaskDetails from "./TaskDetails";
import Greet from "./Greet";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const ProfileDetail = ({userId}) => {
  console.log(useId)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://106.51.76.167:8080/user/${userId}`);
        setUserData(response.data.body);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return toast.loading("Waiting...");
  }

  const tasksToBeCompleted = [
    "Complete Project X",
    "Prepare for Meeting",
    "Review Code Changes",
  ];
  return (
    <>
      <Greet userName={userData.name} />
      <div className="profile-details-section">
        <div className="profile-picture-container">
          <img
            className="profile-picture"
            src="https://i0.wp.com/studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg?fit=1200%2C1200&ssl=1"
            alt="Profile"
          />
          <div className="profile-picture-overlay"></div>
        </div>

        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p>EmpId: {userData.empId}</p>
          <p>Email: {userData.email}</p>

          <div className="contact">
            <div className="contact-info">
              <img src="/src/images/telephone.png" alt="Phone"/>
              <p>{userData.phone}</p>
            </div>
            <div className="contact-info">
              <img src="/src/images/pin.png" alt="Location" />
              <p>{userData.location}</p>
            </div>
          </div>
        </div>
        <div className="assigned-task">
          <TaskDetails tasks={tasksToBeCompleted} />
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;

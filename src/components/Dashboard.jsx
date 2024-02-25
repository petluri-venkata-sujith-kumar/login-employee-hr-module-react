import DashboardSidebar from "./DashboardSidebar";
import ProfileDetail from "./ProfileDetail";
import AttendanceLog from "./AttendanceLog";
import GraphAndBatches from "./GraphAndBatches";
import "./dashboard.css";
import {useLocation} from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const validateUser = location.state?.validateUser;
  console.log(validateUser)

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <div>
          <GraphAndBatches />
        </div>
        <div className="profile-detail">
          <ProfileDetail userId={userId}/>
        </div>
        <div className="attendance-log">
          <AttendanceLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

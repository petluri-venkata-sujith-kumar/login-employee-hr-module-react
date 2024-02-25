// import "./dashboardSidebar.css";
// // import { CgProfile } from "react-icons/cg";
// // import { IoSettingsOutline } from "react-icons/io5";
// // import { IoIosLogOut } from "react-icons/io";

// const DashboardSidebar = () => {
//   return (
//     <div className="dashboard-sidebar">
//       <div className="top-items">
//         <div className="sidebar-item">
//           <span role="img" aria-label="Profile">
//             {/* 👤< */}
//             <img src="/src/images/user.png" alt="" />
//             {/* <CgProfile /> */}
//           </span>
//         </div>
//         <div className="sidebar-item">
//           <span role="img" aria-label="Settings">
//             {/* ⚙️ */}
//             <img src="/src/images/setting.png" alt="" />
//             {/* <IoSettingsOutline /> */}
//           </span>
//         </div>
//       </div>
//       <div className="bottom-items">
//         <div className="sidebar-item">
//           <span role="img" aria-label="Logout">
//             {/* 🚪 */}
//             <img src="/src/images/logout.png" alt="" />
//             {/* <IoIosLogOut /> */}
//           </span>
//         </div>
//         <div className="sidebar-item">
//             <img
//               className="profile-pic"
//               src="https://i0.wp.com/studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg?fit=1200%2C1200&ssl=1"
//               alt="Profile"
//             />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSidebar;

//! =====================================================================
// DashboardSidebar.jsx

import { Link, useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import "./dashboardSidebar.css";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="dashboard-sidebar">
      <div className="top-items">
        <Link to="/dashboard/profile">
          <div
            className={`sidebar-item ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            <span role="img" aria-label="Profile">
              <img src="/src/images/user.png" alt="" />
            </span>
          </div>
        </Link>
        <Link to="/dashboard/settings">
          <div
            className={`sidebar-item ${
              activeTab === "settings" ? "active" : ""
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <span role="img" aria-label="Settings">
              <img src="/src/images/setting.png" alt="" />
            </span>
          </div>
        </Link>
      </div>

      <div className="bottom-items">
        <Link to="/">
          <div
            className={`sidebar-item ${activeTab === "logout" ? "active" : ""}`}
            onClick={() => handleTabClick("logout")}
          >
            <span role="img" aria-label="logout">
              <img src="/src/images/logout.png" alt="" />
            </span>
          </div>
        </Link>
      </div>
      <div className="sidebar-item">
        <img
          className="profile-pic"
          src="https://i0.wp.com/studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg?fit=1200%2C1200&ssl=1"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;

/* eslint-disable react/prop-types */
import "./greet.css";

const Greet = ({userName}) => {
  const getGreeting = () => {
        const currentTime = new Date().getHours();
    
        if (currentTime >= 5 && currentTime < 12) {
          return "☀️ Good Morning";
        } else if (currentTime >= 12 && currentTime < 17) {
          return "🕑 Good Afternoon";
        } else if (currentTime >= 17 && currentTime < 20) {
          return "🌆 Good Evening";
        } else {
          return "💤 Good Night";
        }
      };
    

  return (
    <div className="greet-section">
      <div className="header">
        <div>
          <h2>{getGreeting()}, {userName}!</h2>
          <p>Let`s see how you doing</p>
        </div>

        <div className="notification-bell">
          <span role="img" aria-label="Notification Bell">
            🔔 <sup>1</sup>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Greet;

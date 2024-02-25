/* eslint-disable react/prop-types */
import './taskDetails.css'
const TaskDetails = ({ tasks }) => {
  return (
    <div className="task-details">
      <h3>Tasks to be Completed</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDetails;

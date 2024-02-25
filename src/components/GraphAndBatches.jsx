import Attendance from './Attendance';
import './graphAndBatches.css'

const GraphAndBatches = () => {
//   const graphData = /* ... */;
  const assignedBatches = [
    { code: 'B001', time: '10:00 AM - 12:00 PM', date: '2024-01-15', technology: 'React' },
    { code: 'B002', time: '02:00 PM - 04:00 PM', date: '2024-01-16', technology: 'Node.js' },
  ];

  return (
    <div className="graph-and-batches">
      <div className="graph">
        <p>Graph Placeholder</p>
        <Attendance/>
      </div>
      <div className="assigned-batches">
        <h2>Assigned Batches</h2>
        {assignedBatches.map((batch, index) => (
          <div key={index} className="batch-entry">
            <div className="batch-details">
              <h3>{batch.code}</h3>
              <p>{batch.time}</p>
              <p>{`Date: ${batch.date}`}</p>
              <p>{`Technology: ${batch.technology}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphAndBatches;

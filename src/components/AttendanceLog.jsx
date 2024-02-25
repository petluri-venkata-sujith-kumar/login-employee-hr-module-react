//! to change date format -> npm install date-fns
// const today = new Date();
// const month = today.getMonth() + 1;
// const year = today.getFullYear();
// const date = today.getDate();
// console.log(`${date}-${month}-${year}`);

//? to capture date
// import {format} from 'date-fns';
// let today =  new Date();
// let date = format(today, 'dd-MM-yyyy')
// document.write(date)

import { useState, useEffect } from "react";
import "./attendanceLog.css";

const AttendanceLog = () => {
  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();
    return `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  };

  const apiData = {
    timesheetId: 0,
    start_date: "2024-01-15",
    end_date: "2024-01-15",
    attendances: [
      {
        attendanceId: 1,
        date: "2024-01-15",
        loginTime: {
          hour: "09",
          minute: 0,
          second: 0,
          nano: 0,
        },
        logoutTime: {
          hour: 18,
          minute: 12,
          second: 0,
          nano: 0,
        },
        attendanceStatus: "PRESENT",
        totalWorkingHours: 0,
      },
      {
        attendanceId: 2,
        date: "2024-01-14",
        loginTime: {
          hour: "09",
          minute: 30,
          second: 0,
          nano: 0,
        },
        logoutTime: {
          hour: 18,
          minute: 15,
          second: 0,
          nano: 0,
        },
        attendanceStatus: "ABSENT",
        totalWorkingHours: 0,
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [attendanceData, setAttendanceData] = useState([]);

  const filterDataByMonth = (data, month) => {
    return data.filter((entry) => entry.date.slice(0, 7) === month);
  };

  useEffect(() => {
    const formattedData = apiData.attendances.map((entry) => ({
      date: entry.date,
      loginTime: `${entry.loginTime.hour}:${entry.loginTime.minute}`,
      logoutTime: `${entry.logoutTime.hour}:${entry.logoutTime.minute}`,
      status: entry.attendanceStatus,
    }));

    setAttendanceData(filterDataByMonth(formattedData, selectedMonth));
  }, [selectedMonth]);

  const calculateDuration = (loginTime, logoutTime) => {
    const login = new Date(`2024-01-01 ${loginTime}`);
    const logout = new Date(`2024-01-01 ${logoutTime}`);
    const diff = Math.abs(logout - login);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}min`;
  };

  const calculateLagExtraTime = (loginTime, logoutTime) => {
    const lagExtraTime =
      new Date(`2024-01-01 ${logoutTime}`) -
      new Date(`2024-01-01 ${loginTime}`);
    const hours = Math.floor(lagExtraTime / 3600000);
    const minutes = Math.floor((lagExtraTime % 3600000) / 60000);
    const totalMinutes = hours * 60 + minutes;

    return {
      totalMinutes,
      status:
        totalMinutes > 540 ? "EXTRA" : totalMinutes < 540 ? "LAG" : "ON TIME",
    };
  };

  const handleSort = (sortBy) => {
    const sortedData = [...attendanceData].sort((a, b) => {
      let comparison = 0;
      if (
        sortBy === "date" ||
        sortBy === "loginTime" ||
        sortBy === "logoutTime" ||
        sortBy === "status"
      ) {
        const keyA = a[sortBy];
        const keyB = b[sortBy];
        comparison = keyA.localeCompare(keyB);
      } else if (sortBy === "duration") {
        const durationA = calculateDuration(a.loginTime, a.logoutTime);
        const durationB = calculateDuration(b.loginTime, b.logoutTime);
        comparison = durationA.localeCompare(durationB);
      } else if (sortBy === "timeLag") {
        const lagA = calculateLagExtraTime(a.loginTime, a.logoutTime);
        const lagB = calculateLagExtraTime(b.loginTime, b.logoutTime);
        comparison =
          lagA.status === lagB.status ? 0 : lagA.status === "EXTRA" ? 1 : -1;
      }
      return comparison;
    });

    setAttendanceData(sortedData);
  };

  return (
    <div className="attendance-log-section">
      <div className="attendance-header">
        <h2>Attendance Log</h2>
        <select
          className="sort"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="2023-11">February 2023</option>
          <option value="2023-12">December 2023</option>
          <option value={getCurrentMonthYear()}>Current Month</option>
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>Date</th>
              <th onClick={() => handleSort("loginTime")}>Login Time</th>
              <th onClick={() => handleSort("logoutTime")}>Logout Time</th>
              <th onClick={() => handleSort("duration")}>Duration</th>
              <th onClick={() => handleSort("timeLag")}>Lag/Extra Time</th>
              <th onClick={() => handleSort("status")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.loginTime}</td>
                <td>{entry.logoutTime}</td>
                <td>{calculateDuration(entry.loginTime, entry.logoutTime)}</td>
                <td>
                  {calculateLagExtraTime(entry.loginTime, entry.logoutTime)
                    .status === "EXTRA" ? (
                    <span style={{ color: "green" }}>
                      +
                      {calculateLagExtraTime(entry.loginTime, entry.logoutTime)
                        .totalMinutes - 540}
                      min
                    </span>
                  ) : calculateLagExtraTime(entry.loginTime, entry.logoutTime)
                      .status === "LAG" ? (
                    <span style={{ color: "red" }}>
                      -
                      {540 -
                        calculateLagExtraTime(entry.loginTime, entry.logoutTime)
                          .totalMinutes}
                      min
                    </span>
                  ) : (
                    "ON TIME"
                  )}
                </td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceLog;

//! =============================================================================

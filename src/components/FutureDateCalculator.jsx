import React, { useState, useEffect, useRef } from 'react';

/* ====================================================
   Future Date Calculator Component
   ==================================================== 
   This tool takes a start date and a duration (in days, weeks, or months)
   and calculates the target date by adding the appropriate interval.
*/
function FutureDateCalculator() {
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState('');
    const [unit, setUnit] = useState('days'); // options: days, weeks, months
    const [result, setResult] = useState('');
  
    const handleCalculate = () => {
      if (!startDate || !duration) {
        setResult("Please enter both start date and duration.");
        return;
      }
      const start = new Date(startDate);
      let target = new Date(start);
      const dur = parseInt(duration);
      if (unit === 'days') {
        target.setDate(target.getDate() + dur);
      } else if (unit === 'weeks') {
        target.setDate(target.getDate() + dur * 7);
      } else if (unit === 'months') {
        target.setMonth(target.getMonth() + dur);
      }
      setResult(`Target date: ${target.toLocaleDateString()} (Start date: ${start.toLocaleDateString()}, Interval: ${duration} ${unit})`);
    };
  
    return (
      <div className="tool">
        <h2>Future Date Calculator</h2>
        <div className="input-group">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Duration:
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </label>
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>
        <button onClick={handleCalculate}>Calculate Future Date</button>
        {result && <p className="result">{result}</p>}
      </div>
    );
  }export default FutureDateCalculator
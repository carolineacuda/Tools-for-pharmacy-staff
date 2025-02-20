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
  const [unit, setUnit] = useState('days'); // 'days', 'weeks', or 'months'

  // Helper to format Date as DD/MM/YYYY
  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  // Check if we have enough valid data to calculate
  const parsedDuration = parseInt(duration, 10);
  const canCalculate = startDate && !isNaN(parsedDuration) && parsedDuration > 0;

  let result = '';
  if (canCalculate) {
    const start = new Date(startDate);
    const target = new Date(start);

    if (unit === 'days') {
      target.setDate(target.getDate() + parsedDuration);
    } else if (unit === 'weeks') {
      target.setDate(target.getDate() + parsedDuration * 7);
    } else if (unit === 'months') {
      target.setMonth(target.getMonth() + parsedDuration);
    }

    result = `Target date: ${formatDate(target)} (Start date: ${formatDate(start)}, Interval: ${duration} ${unit})`;
  }

  // Reset all fields
  const handleReset = () => {
    setStartDate('');
    setDuration('');
    setUnit('days');
  };

  return (
    <div className="tool">
      <h2>Future Date Calculator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'inline-block', width: '100px' }}>
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '150px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'inline-block', width: '100px' }}>
          Duration:
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '60px' }}
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>

      {/* Show the result if all inputs are valid */}
      {result && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          {result}
        </p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default FutureDateCalculator;

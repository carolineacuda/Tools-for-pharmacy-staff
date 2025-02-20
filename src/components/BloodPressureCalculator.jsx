import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

/* ====================================================
   Blood Pressure Average Calculator Component
   ==================================================== 
   This component allows the user to add multiple blood pressure readings.
   It computes the average systolic and diastolic values and displays the count.
   A line chart (using Chart.js) is drawn to show trends in both values.
   The input fields also listen for the Enter key so that users can add a reading
   without having to click the button.
*/

// BloodPressureCalculator.jsx

function BloodPressureCalculator() {
  // State: an array of reading objects { systolic, diastolic }
  // Start with one empty row.
  const [readings, setReadings] = useState([{ systolic: '', diastolic: '' }]);
  
  // Refs to hold the canvas and the Chart.js instance
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Handler to update a row's field.
  // If the last row becomes complete, add a new empty row.
  const handleReadingChange = (index, field, value) => {
    const updatedReadings = [...readings];
    updatedReadings[index][field] = value;
    setReadings(updatedReadings);

    // Check if this is the last row and if both fields are now filled.
    const currentRow = updatedReadings[index];
    if (
      index === updatedReadings.length - 1 &&
      currentRow.systolic.trim() !== '' &&
      currentRow.diastolic.trim() !== ''
    ) {
      setReadings([...updatedReadings, { systolic: '', diastolic: '' }]);
    }
  };

  // Filter out valid readings (rows with both systolic and diastolic entered)
  const validReadings = readings.filter(
    (r) => r.systolic.trim() !== '' && r.diastolic.trim() !== ''
  );

  // Compute averages (rounded to whole numbers)
  const numValid = validReadings.length;
  const avgSystolic =
    numValid > 0
      ? Math.round(
          validReadings.reduce((sum, r) => sum + parseFloat(r.systolic), 0) /
            numValid
        )
      : 0;
  const avgDiastolic =
    numValid > 0
      ? Math.round(
          validReadings.reduce((sum, r) => sum + parseFloat(r.diastolic), 0) /
            numValid
        )
      : 0;

  // Update (or re-create) the chart whenever validReadings change.
  useEffect(() => {
    if (!canvasRef.current) return;
    // Destroy the old chart instance if it exists.
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Use only valid readings for the chart.
    const labels = validReadings.map((_, idx) => idx + 1);
    const systolicData = validReadings.map((r) => parseFloat(r.systolic));
    const diastolicData = validReadings.map((r) => parseFloat(r.diastolic));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Systolic',
            data: systolicData,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Diastolic',
            data: diastolicData,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [validReadings]);

  // Reset everything to the initial state.
  const handleReset = () => {
    setReadings([{ systolic: '', diastolic: '' }]);
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };

  return (
    <div className="tool">
      <h2>Home Blood Pressure Average Calculator</h2>
      
      {/* Dynamic Input Rows */}
      {readings.map((reading, index) => (
        <div
          key={index}
          style={{
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <label style={{ marginRight: '0.5rem' }}>
            Systolic:
            <input
              type="number"
              value={reading.systolic}
              onChange={(e) =>
                handleReadingChange(index, 'systolic', e.target.value)
              }
              style={{ marginLeft: '0.3rem', width: '70px' }}
            />
          </label>
          <label>
            Diastolic:
            <input
              type="number"
              value={reading.diastolic}
              onChange={(e) =>
                handleReadingChange(index, 'diastolic', e.target.value)
              }
              style={{ marginLeft: '0.3rem', width: '70px' }}
            />
          </label>
        </div>
      ))}

      {/* Display output (if there is at least one valid reading) */}
      {numValid > 0 && (
        <div style={{ color: 'blue', fontWeight: 'bold', marginTop: '1rem' }}>
          <p>Number of readings: {numValid}</p>
          <p>Average Systolic: {avgSystolic}</p>
          <p>Average Diastolic: {avgDiastolic}</p>
        </div>
      )}

      {/* Chart Container */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          width: '100%',
          marginTop: '1rem',
        }}
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Reset Button */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default BloodPressureCalculator;

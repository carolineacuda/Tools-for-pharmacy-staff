import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import FeedbackLink from "./FeedbackLink.jsx";

function BloodPressureCalculator() {
  // Each element in 'readings' is an object { systolic: '', diastolic: '' }
  // Start with one empty row
  const [readings, setReadings] = useState([{ systolic: '', diastolic: '' }]);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Handle input change for each row. If the user just filled in the last row, add a new row
  const handleLineChange = (index, field, value) => {
    const updated = [...readings];
    updated[index][field] = value;
    setReadings(updated);

    // If this is the last row and it's now complete, add a new empty row
    const lastRow = index === updated.length - 1;
    if (lastRow && updated[index].systolic && updated[index].diastolic) {
      setReadings([...updated, { systolic: '', diastolic: '' }]);
    }
  };

  // Filter out fully valid readings (both systolic and diastolic entered)
  const validReadings = readings.filter(
    (r) => r.systolic.trim() !== '' && r.diastolic.trim() !== ''
  );

  const totalReadings = validReadings.length;

  // Compute averages (rounded to whole numbers) if we have valid readings
  const avgSystolic =
    totalReadings > 0
      ? Math.round(
          validReadings.reduce((sum, r) => sum + parseFloat(r.systolic), 0) /
            totalReadings
        )
      : 0;

  const avgDiastolic =
    totalReadings > 0
      ? Math.round(
          validReadings.reduce((sum, r) => sum + parseFloat(r.diastolic), 0) /
            totalReadings
        )
      : 0;

  // Update the Chart.js chart whenever valid readings change
  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy old chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // If no valid readings, clear canvas and return
    if (validReadings.length === 0) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    const labels = validReadings.map((_, i) => i + 1);
    const systolicData = validReadings.map((r) => parseFloat(r.systolic));
    const diastolicData = validReadings.map((r) => parseFloat(r.diastolic));

    chartRef.current = new Chart(ctx, {
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

  // Copy the average, number of readings, and list of readings to clipboard
  const handleCopyReadings = () => {
    if (totalReadings === 0) {
      alert("No completed readings to copy.");
      return;
    }
    const readingStrings = validReadings.map(
      (r) => `${parseFloat(r.systolic)}/${parseFloat(r.diastolic)}`
    );
    const copyText = `Average blood pressure is ${avgSystolic}/${avgDiastolic} from ${totalReadings} blood pressure readings. Readings were: ${readingStrings.join('; ')}.`;
    navigator.clipboard
      .writeText(copyText)
      .then(() => alert("Readings copied to clipboard!"))
      .catch((err) => console.error("Failed to copy readings:", err));
  };

  // Reset the entire calculator
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

      {/* Dynamic input rows */}
      {readings.map((reading, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>
            Systolic:
            <input
              type="number"
              value={reading.systolic}
              onChange={(e) =>
                handleLineChange(index, 'systolic', e.target.value)
              }
              style={{ width: '70px', marginLeft: '0.3rem' }}
            />
          </label>
          <label>
            Diastolic:
            <input
              type="number"
              value={reading.diastolic}
              onChange={(e) =>
                handleLineChange(index, 'diastolic', e.target.value)
              }
              style={{ width: '70px', marginLeft: '0.3rem' }}
            />
          </label>
        </div>
      ))}

<div style={{ color: 'blue', fontWeight: 'bold', marginTop: '1rem' }}>
        <p>Number of readings: {totalReadings}</p>
        {totalReadings > 0 && (
          <>
            <p>Average Systolic: {avgSystolic}</p>
            <p>Average Diastolic: {avgDiastolic}</p>
          </>
        )}
      </div>

      <div style={{ position: 'relative', height: '200px', width: '400px' }}>
        <canvas ref={canvasRef} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleCopyReadings}>
          Copy readings for patient notes
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleReset}>Reset</button>
      </div>

      <FeedbackLink
        toolName="Blood Pressure Calculator"
        emailAddress="caroline@toolsforpharmacists.com"
      />
    </div>
  );
}

export default BloodPressureCalculator;

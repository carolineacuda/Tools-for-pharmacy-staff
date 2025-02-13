import React, { useState, useEffect, useRef } from 'react';


/* ====================================================
   Blood Pressure Average Calculator Component
   ==================================================== 
   This component allows the user to add multiple blood pressure readings.
   It computes the average systolic and diastolic values and displays the count.
   A line chart (using Chart.js) is drawn to show trends in both values.
   The input fields also listen for the Enter key so that users can add a reading
   without having to click the button.
*/
function BloodPressureCalculator() {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [readings, setReadings] = useState([]);
    const canvasRef = useRef(null);
    
    // Function to add a new reading
    const addReading = () => {
      if (!systolic || !diastolic) return;
      const newReading = {
        systolic: parseFloat(systolic),
        diastolic: parseFloat(diastolic)
      };
      setReadings([...readings, newReading]);
      setSystolic('');
      setDiastolic('');
    };
  
    // Update the Chart.js chart when readings change
    useEffect(() => {
      if (canvasRef.current && readings.length > 0) {
        const ctx = canvasRef.current.getContext('2d');
        // Clear the canvas before drawing a new chart
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const labels = readings.map((_, index) => index + 1);
        const systolicData = readings.map(r => r.systolic);
        const diastolicData = readings.map(r => r.diastolic);
  
        new Chart(ctx, {
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
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }, [readings]);
  
    // Allow Enter key to add a new reading
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') addReading();
    };
  
    // Compute averages (avoid division by zero)
    const avgSystolic = readings.reduce((sum, r) => sum + r.systolic, 0) / (readings.length || 1);
    const avgDiastolic = readings.reduce((sum, r) => sum + r.diastolic, 0) / (readings.length || 1);
  
    return (
      <div className="tool">
        <h2>Home Blood Pressure Average Calculator</h2>
        <div className="input-group">
          <label>
            Systolic:
            <input
              type="number"
              value={systolic}
              onChange={e => setSystolic(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
          <label>
            Diastolic:
            <input
              type="number"
              value={diastolic}
              onChange={e => setDiastolic(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
          <button onClick={addReading}>Add Reading</button>
        </div>
        <div>
          <p>Number of readings: {readings.length}</p>
          {readings.length > 0 && (
            <>
              <p>Average Systolic: {avgSystolic.toFixed(2)}</p>
              <p>Average Diastolic: {avgDiastolic.toFixed(2)}</p>
            </>
          )}
        </div>
        <div className="chart-container">
          <canvas ref={canvasRef} width="400" height="200"></canvas>
        </div>
      </div>
    );
  }
  
  export default BloodPressureCalculator;
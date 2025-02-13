import React, { useState, useEffect, useRef } from 'react';

/* ====================================================
   Percentage Increase/Decrease Calculator Component
   ==================================================== 
   This tool calculates the percentage change from a previous value to a current value.
   The formula used is: ((current - previous) / previous) * 100.
*/
function PercentageChangeCalculator() {
    const [previous, setPrevious] = useState('');
    const [current, setCurrent] = useState('');
    const [result, setResult] = useState('');
  
    const handleCalculate = () => {
      if (!previous || !current) {
        setResult("Please enter both previous and current values.");
        return;
      }
      const change = ((parseFloat(current) - parseFloat(previous)) / parseFloat(previous)) * 100;
      setResult(`Percentage change: ${change.toFixed(2)}%`);
    };
  
    return (
      <div className="tool">
        <h2>Percentage Increase/Decrease Calculator</h2>
        <div className="input-group">
          <label>
            Previous Value:
            <input
              type="number"
              value={previous}
              onChange={e => setPrevious(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Current Value:
            <input
              type="number"
              value={current}
              onChange={e => setCurrent(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCalculate}>Calculate Change</button>
        {result && <p className="result">{result}</p>}
      </div>
    );
  }
  
  export default PercentageChangeCalculator
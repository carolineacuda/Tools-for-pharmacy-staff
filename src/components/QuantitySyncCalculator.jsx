import React, { useState, useEffect, useRef } from 'react';

/* ====================================================
   Quantity Synchronisation Calculator Component
   ==================================================== 
   This tool multiplies the number of days the medication should last 
   by the number of tablets taken per day, giving the total tablets required.
*/
function QuantitySyncCalculator() {
    const [days, setDays] = useState('');
    const [tabletsPerDay, setTabletsPerDay] = useState('');
    const [result, setResult] = useState('');
  
    const handleCalculate = () => {
      if (!days || !tabletsPerDay) {
        setResult("Please enter both the number of days and tablets per day.");
        return;
      }
      const totalTablets = parseFloat(days) * parseFloat(tabletsPerDay);
      setResult(`Total tablets required: ${totalTablets}`);
    };
  
    return (
      <div className="tool">
        <h2>Quantity Synchronisation Calculator</h2>
        <div className="input-group">
          <label>
            Number of days the medication should last:
            <input
              type="number"
              value={days}
              onChange={e => setDays(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Tablets per day:
            <input
              type="number"
              value={tabletsPerDay}
              onChange={e => setTabletsPerDay(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCalculate}>Calculate Quantity</button>
        {result && <p className="result">{result}</p>}
      </div>
    );
  }

export default QuantitySyncCalculator;
import React, { useState, useEffect, useRef } from 'react';

/* ====================================================
   Insulin Duration Calculator Component
   ==================================================== 
   This component computes how many days a patient’s insulin supply should last.
   It calculates total units (units/ml * ml per device * number of devices)
   and then divides by the daily usage.
*/
function InsulinCalculator() {
    const [unitsPerMl, setUnitsPerMl] = useState('');
    const [mlPerDevice, setMlPerDevice] = useState('');
    const [quantityDevices, setQuantityDevices] = useState('');
    const [dailyUnits, setDailyUnits] = useState('');
    const [result, setResult] = useState('');
  
    const handleCalculate = () => {
      if (!unitsPerMl || !mlPerDevice || !quantityDevices || !dailyUnits) {
        setResult("Please enter all required values.");
        return;
      }
      const totalUnits = parseFloat(unitsPerMl) * parseFloat(mlPerDevice) * parseFloat(quantityDevices);
      const days = totalUnits / parseFloat(dailyUnits);
      setResult(`Total units: ${totalUnits}. This should last for approximately ${days.toFixed(2)} days.`);
    };
  
    return (
      <div className="tool">
        <h2>Insulin Duration Calculator</h2>
        <div className="input-group">
          <label>
            Units per ml:
            <input
              type="number"
              value={unitsPerMl}
              onChange={e => setUnitsPerMl(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            ml per device:
            <input
              type="number"
              value={mlPerDevice}
              onChange={e => setMlPerDevice(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Quantity of devices supplied:
            <input
              type="number"
              value={quantityDevices}
              onChange={e => setQuantityDevices(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Daily insulin usage (units):
            <input
              type="number"
              value={dailyUnits}
              onChange={e => setDailyUnits(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCalculate}>Calculate Duration</button>
        {result && <p className="result">{result}</p>}
      </div>
    );
  }

  export default InsulinCalculator;
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

  // Helper to parse float or return null if invalid/empty
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Parse all inputs
  const parsedUnitsPerMl = parseFloatOrNull(unitsPerMl);
  const parsedMlPerDevice = parseFloatOrNull(mlPerDevice);
  const parsedQuantityDevices = parseFloatOrNull(quantityDevices);
  const parsedDailyUnits = parseFloatOrNull(dailyUnits);

  // Compute result only if all fields are valid
  let resultMessage = '';
  if (
    parsedUnitsPerMl !== null &&
    parsedMlPerDevice !== null &&
    parsedQuantityDevices !== null &&
    parsedDailyUnits !== null
  ) {
    const totalUnits = parsedUnitsPerMl * parsedMlPerDevice * parsedQuantityDevices;
    const days = totalUnits / parsedDailyUnits;
    resultMessage = `Total units supplied: ${totalUnits.toFixed(2)}. ` +
                    `This should last for approximately ${days.toFixed(2)} days.`;
  }

  // Reset function
  const handleReset = () => {
    setUnitsPerMl('');
    setMlPerDevice('');
    setQuantityDevices('');
    setDailyUnits('');
  };

  return (
    <div className="tool">
      <h2>Insulin Duration Calculator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Device Units per ml:
          <input
            type="number"
            value={unitsPerMl}
            onChange={(e) => setUnitsPerMl(e.target.value)}
            style={{ marginLeft: '0.5rem', width: '80px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Total ml in one device:
          <input
            type="number"
            value={mlPerDevice}
            onChange={(e) => setMlPerDevice(e.target.value)}
            style={{ marginLeft: '0.5rem', width: '80px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Quantity of devices supplied:
          <input
            type="number"
            value={quantityDevices}
            onChange={(e) => setQuantityDevices(e.target.value)}
            style={{ marginLeft: '0.5rem', width: '80px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Daily insulin usage (units):
          <input
            type="number"
            value={dailyUnits}
            onChange={(e) => setDailyUnits(e.target.value)}
            style={{ marginLeft: '0.5rem', width: '80px' }}
          />
        </label>
      </div>

      {/* Show the result dynamically in blue if all inputs are valid */}
      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          {resultMessage}
        </p>
      )}

      {/* Reset button to clear all fields */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default InsulinCalculator;

import React, { useState, useEffect, useRef } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

/* ====================================================
   Insulin Duration Calculator Component
   ==================================================== 
   This component computes how many days a patient’s insulin supply should last.
   It calculates total units (units/ml * ml per device * number of devices)
   and then divides by the daily usage.
*/


function InsulinCalculator() {
  // Mode: "duration" (how many days) or "quantity" (how many devices)
  const [mode, setMode] = useState('duration');

  // Shared fields
  const [unitsPerMl, setUnitsPerMl] = useState('');
  const [mlPerDevice, setMlPerDevice] = useState('');
  const [dailyUnits, setDailyUnits] = useState('');

  // Fields that depend on mode
  // "duration" mode uses quantityDevices
  const [quantityDevices, setQuantityDevices] = useState('');
  // "quantity" mode uses days
  const [days, setDays] = useState('');

  // Helper: parse float or return null
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Compute result
  let result = '';
  const parsedUnitsPerMl = parseFloatOrNull(unitsPerMl);
  const parsedMlPerDevice = parseFloatOrNull(mlPerDevice);
  const parsedDailyUnits = parseFloatOrNull(dailyUnits);

  // totalUnitsPerDevice = (unitsPerMl * mlPerDevice)
  const totalUnitsPerDevice =
    parsedUnitsPerMl !== null &&
    parsedUnitsPerMl > 0 &&
    parsedMlPerDevice !== null &&
    parsedMlPerDevice > 0
      ? parsedUnitsPerMl * parsedMlPerDevice
      : null;

  if (mode === 'duration') {
    // Mode 1: Calculate how many days the supply lasts
    const parsedQuantityDevices = parseFloatOrNull(quantityDevices);

    if (
      totalUnitsPerDevice !== null &&
      parsedQuantityDevices !== null &&
      parsedQuantityDevices > 0 &&
      parsedDailyUnits !== null &&
      parsedDailyUnits > 0
    ) {
      // totalUnits = totalUnitsPerDevice * quantityDevices
      const totalUnits = totalUnitsPerDevice * parsedQuantityDevices;
      const days = totalUnits / parsedDailyUnits;
      result = `Supply should last for approximately ${days.toFixed(
        1
      )} days.`;
    }
  } else {
    // mode === 'quantity': Calculate how many devices to supply for X days
    const parsedDays = parseFloatOrNull(days);

    if (
      totalUnitsPerDevice !== null &&
      parsedDays !== null &&
      parsedDays > 0 &&
      parsedDailyUnits !== null &&
      parsedDailyUnits > 0
    ) {
      // totalUnitsNeeded = dailyUnits * days
      const totalUnitsNeeded = parsedDailyUnits * parsedDays;
      // devicesNeeded = totalUnitsNeeded / totalUnitsPerDevice
      const devicesNeeded = totalUnitsNeeded / totalUnitsPerDevice;
      result = `You need ${devicesNeeded.toFixed(1)} devices to cover ${parsedDays.toFixed(
        1
      )} days.`;
    }
  }

  // Reset function
  const handleReset = () => {
    setMode('duration');
    setUnitsPerMl('');
    setMlPerDevice('');
    setDailyUnits('');
    setQuantityDevices('');
    setDays('');
  };

  return (
    <div className="tool">
      <h2>Insulin Duration Calculator</h2>

      {/* Radio buttons for the two modes */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="mode"
            value="duration"
            checked={mode === 'duration'}
            onChange={() => setMode('duration')}
          />
          How many days will the supply last?
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="quantity"
            checked={mode === 'quantity'}
            onChange={() => setMode('quantity')}
          />
          How many devices for X days?
        </label>
      </div>

      {/* Shared fields */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Units per ml:
        </label>
        <input
          type="number"
          value={unitsPerMl}
          onChange={(e) => setUnitsPerMl(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          ml per device:
        </label>
        <input
          type="number"
          value={mlPerDevice}
          onChange={(e) => setMlPerDevice(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Daily insulin usage (units):
        </label>
        <input
          type="number"
          value={dailyUnits}
          onChange={(e) => setDailyUnits(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>

      {/* Mode-specific fields */}
      {mode === 'duration' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Quantity of devices supplied:
          </label>
          <input
            type="number"
            value={quantityDevices}
            onChange={(e) => setQuantityDevices(e.target.value)}
            style={{ width: '100px' }}
          />
        </div>
      )}

      {mode === 'quantity' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Number of days supply needed:
          </label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            style={{ width: '100px' }}
          />
        </div>
      )}

      {/* Dynamic result */}
      {result && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          {result}
        </p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Insulin Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}


export default InsulinCalculator;

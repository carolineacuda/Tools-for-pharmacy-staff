import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function OestrogelCalculator() {
  // Two modes: "duration" (how many days) or "quantity" (how many devices)
  const [mode, setMode] = useState('duration');

  // Shared fields
  const [pumpDaily, setPumpDaily] = useState(''); // pumps used per day

  // "duration" mode uses deviceSupplied
  const [deviceSupplied, setDeviceSupplied] = useState('');
  // "quantity" mode uses daysNeeded
  const [daysNeeded, setDaysNeeded] = useState('');

  // Optional prescription date section (only for duration mode)
  const [usePrescriptionDate, setUsePrescriptionDate] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState("");

  // Helper to parse float or return null
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Each Oestrogel device = 80 g
  // Each pump actuation = 1.25 g

  let result = '';
  let supplyDays = null; // Will hold the calculated supply duration (in days)

  const parsedPumpDaily = parseFloatOrNull(pumpDaily);

  if (mode === 'duration') {
    // Mode 1: How many days will my supply last?
    const parsedDevices = parseFloatOrNull(deviceSupplied);
    if (
      parsedDevices !== null &&
      parsedDevices > 0 &&
      parsedPumpDaily !== null &&
      parsedPumpDaily > 0
    ) {
      // totalGel = 80 g * number of devices
      const totalGel = 80 * parsedDevices;
      // dailyUsage = 1.25 g * pumpDaily
      const dailyUsage = 1.25 * parsedPumpDaily;
      supplyDays = totalGel / dailyUsage;
      result = `At ${parsedPumpDaily.toFixed(1)} pumps per day, this supply should last approximately ${supplyDays.toFixed(1)} days.`;
    }
  } else {
    // mode === 'quantity': How many devices to last X days?
    const parsedDaysNeeded = parseFloatOrNull(daysNeeded);
    if (
      parsedDaysNeeded !== null &&
      parsedDaysNeeded > 0 &&
      parsedPumpDaily !== null &&
      parsedPumpDaily > 0
    ) {
      // dailyUsage = 1.25 g * pumpDaily
      const dailyUsage = 1.25 * parsedPumpDaily;
      // totalGelNeeded = dailyUsage * daysNeeded
      const totalGelNeeded = dailyUsage * parsedDaysNeeded;
      // devicesNeeded = totalGelNeeded / 80
      const devicesNeeded = totalGelNeeded / 80;
      result = `You need ${devicesNeeded.toFixed(1)} devices to cover ${parsedDaysNeeded.toFixed(1)} days at ${parsedPumpDaily.toFixed(1)} pumps per day.`;
    }
  }

  // Calculate run-out date if the optional prescription date is provided (only for duration mode)
  let runOutDateMessage = "";
  if (mode === 'duration' && usePrescriptionDate && prescriptionDate && supplyDays !== null) {
    const prescDate = new Date(prescriptionDate);
    prescDate.setDate(prescDate.getDate() + Math.floor(supplyDays));
    runOutDateMessage = `Based on the prescription date, the medication should run out on ${prescDate.toLocaleDateString()}.`;
  }

  // Reset function
  const handleReset = () => {
    setMode('duration');
    setPumpDaily('');
    setDeviceSupplied('');
    setDaysNeeded('');
    setUsePrescriptionDate(false);
    setPrescriptionDate("");
  };

  return (
    <div className="tool">
      <h2>Oestrogel Duration Calculator</h2>

      {/* Radio buttons for the two modes */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="mode"
            value="duration"
            checked={mode === 'duration'}
            onChange={() => {
              handleReset();
              setMode('duration');
            }}
          />
          How many days will my supply last?
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="quantity"
            checked={mode === 'quantity'}
            onChange={() => {
              handleReset();
              setMode('quantity');
            }}
          />
          How many devices for X days?
        </label>
      </div>

      {/* Shared field: pump actuations per day */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Pump actuations per day:
        </label>
        <input
          type="number"
          value={pumpDaily}
          onChange={(e) => setPumpDaily(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>

      {/* Mode-specific fields */}
      {mode === 'duration' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Number of Oestrogel devices supplied:
          </label>
          <input
            type="number"
            value={deviceSupplied}
            onChange={(e) => setDeviceSupplied(e.target.value)}
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
            value={daysNeeded}
            onChange={(e) => setDaysNeeded(e.target.value)}
            style={{ width: '100px' }}
          />
        </div>
      )}

      {/* Display dynamic result */}
      {result && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          {result}
        </p>
      )}

      {/* Optional Prescription Date Section (only in duration mode) */}
      {mode === 'duration' && supplyDays !== null && (
        <div style={{ marginTop: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={usePrescriptionDate}
              onChange={(e) => setUsePrescriptionDate(e.target.checked)}
            />
            &nbsp;Select here if you want to specify a prescription issue date to work out when the supply should run out.
          </label>
          {usePrescriptionDate && (
            <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              <label>
                Prescription Date:&nbsp;
                <input
                  type="date"
                  value={prescriptionDate}
                  onChange={(e) => setPrescriptionDate(e.target.value)}
                />
              </label>
            </div>
          )}
          {usePrescriptionDate && prescriptionDate && runOutDateMessage && (
            <p style={{ color: 'blue', fontWeight: 'bold' }}>
              {runOutDateMessage}
            </p>
          )}
        </div>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <p style={{ color: 'grey' }}>
        Calculations based on an 80g pack size (Each pump actuation delivers 1.25 g of gel)
      </p>
      <FeedbackLink toolName="Oestrogel Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default OestrogelCalculator;
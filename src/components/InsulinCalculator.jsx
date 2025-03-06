import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";
import DisclaimerReminder from "./DisclaimerReminder.jsx";

/* ====================================================
   Insulin Duration Calculator Component
   ==================================================== 
   This component computes how many days a patient’s insulin supply should last.
   It calculates total units (units/ml * ml per device * number of devices)
   and then divides by the daily usage.
   An optional section allows the user to specify the prescription date,
   so that the tool can calculate when the medication should run out.
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

  // Optional prescription date section (only applicable for duration mode)
  const [usePrescriptionDate, setUsePrescriptionDate] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState('');

  // Helper: parse float or return null
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Compute result
  let result = '';
  // We'll also keep a variable for supply duration (in days) if computed.
  let supplyDays = null;
  
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
      supplyDays = totalUnits / parsedDailyUnits;
      result = `Supply should last for approximately ${supplyDays.toFixed(1)} days.`;
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
      result = `You need ${devicesNeeded.toFixed(1)} devices to cover ${parsedDays.toFixed(1)} days.`;
    }
  }

  // Calculate run-out date if the optional prescription date is provided (only for duration mode)
  let runOutDateMessage = "";
  if (mode === 'duration' && usePrescriptionDate && prescriptionDate && supplyDays !== null) {
    const prescDate = new Date(prescriptionDate);
    // Add the supply days (rounded down) to the prescription date.
    prescDate.setDate(prescDate.getDate() + Math.floor(supplyDays));
    runOutDateMessage = `Based on the prescription date, the medication should run out on ${prescDate.toLocaleDateString()}.`;
  }

  // Reset function
  const handleReset = () => {
    setMode('duration');
    setUnitsPerMl('');
    setMlPerDevice('');
    setDailyUnits('');
    setQuantityDevices('');
    setDays('');
    setUsePrescriptionDate(false);
    setPrescriptionDate('');
  };

  return (
    <div className="tool">
      <h2>Insulin Duration Calculator</h2>
      <DisclaimerReminder />
      <p style={{ color: 'grey' }}>The ouptut will automatically be displayed in blue when all the required information has been provided. </p>

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
          How many days will the supply last?
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

      {/* Shared fields */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Units per ml in device:
        </label>
        <input
          type="number"
          value={unitsPerMl}
          onChange={(e) => setUnitsPerMl(e.target.value)}
          placeholder="e.g. 100"
          style={{ width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Volume of insulin in device (ml)
        </label>
        <input
          type="number"
          value={mlPerDevice}
          onChange={(e) => setMlPerDevice(e.target.value)}
          placeholder="e.g. 3"
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

      {/* Optional Prescription Date Section (only for duration mode) */}
      {mode === 'duration' && (
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
          {runOutDateMessage && (
            <p style={{ color: 'blue', fontWeight: 'bold' }}>
              {runOutDateMessage}
            </p>
          )}
        </div>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Insulin Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default InsulinCalculator;

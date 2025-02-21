import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function MedicationEndDateCalculator() {
  // Formulation: "solid" or "liquid"
  const [formulation, setFormulation] = useState('solid');
  // Date medication was issued
  const [issueDate, setIssueDate] = useState('');
  // Daily usage (tablets or volume)
  const [dailyUsage, setDailyUsage] = useState('');
  // Quantity supplied (tablets or volume)
  const [quantitySupplied, setQuantitySupplied] = useState('');

  // Helper to parse float or return null if invalid
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Helper to format a JS Date as DD/MM/YYYY
  const formatDate = (dateObj) => {
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const y = dateObj.getFullYear();
    return `${d}/${m}/${y}`;
  };

  // Check if we can calculate:
  // - formulation can be "solid" or "liquid" (always valid)
  // - issueDate must be a valid date
  // - dailyUsage and quantitySupplied must be valid floats > 0
  let resultMessage = '';
  const parsedDailyUsage = parseFloatOrNull(dailyUsage);
  const parsedQuantity = parseFloatOrNull(quantitySupplied);
  const validIssueDate = issueDate ? new Date(issueDate) : null;

  const canCalculate =
    validIssueDate &&
    parsedDailyUsage !== null &&
    parsedDailyUsage > 0 &&
    parsedQuantity !== null &&
    parsedQuantity > 0;

  if (canCalculate) {
    // Calculate run-out date = issueDate + (quantity / dailyUsage) days
    const runOutDate = new Date(validIssueDate);
    const daysSupply = parsedQuantity / parsedDailyUsage; // e.g., 28 tablets / 1 per day = 28 days
    // Add daysSupply to the issueDate
    runOutDate.setDate(runOutDate.getDate() + Math.floor(daysSupply) - 1);
    // ^ The '-1' is optional; it depends how you interpret "run out on day #28".
    // If you prefer to count the first day as day 1, omit the '-1' or adjust as needed.

    // Compare runOutDate to today's date
    const today = new Date();
    // Zero out time for an easier day-based comparison
    today.setHours(0, 0, 0, 0);

    const diffInMs = runOutDate - today;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Build the message based on diffInDays
    const runOutStr = formatDate(runOutDate);

    if (diffInDays < 0) {
      // Already run out
      resultMessage = `Medication should have run out on ${runOutStr}`;
    // } else if (diffInDays <= 7) {
    //   // Within the next week
    //   resultMessage = `Medication is due to run out in the next week on ${runOutStr}`;
    // } else if (diffInDays >= 8) {
    //   // At least two weeks away
    //   resultMessage = `Medication has at least two weeks supply left and is due to run out on ${runOutStr}`;
    } else {
      // Between 8 and 13 days from now
      resultMessage = `Patient should have a sufficient supply to last ${diffInDays} days (lasting until ${runOutStr})`;
    }
  }

  // Reset everything
  const handleReset = () => {
    setFormulation('solid');
    setIssueDate('');
    setDailyUsage('');
    setQuantitySupplied('');
  };

  return (
    <div className="tool">
      <h2>Medication End Date Calculator</h2>

      {/* Formulation selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="formulation"
            value="solid"
            checked={formulation === 'solid'}
            onChange={() => setFormulation('solid')}
          />
          Solid formulation
        </label>
        <label>
          <input
            type="radio"
            name="formulation"
            value="liquid"
            checked={formulation === 'liquid'}
            onChange={() => setFormulation('liquid')}
          />
          Liquid formulation
        </label>
      </div>

      {/* Date medication was issued */}
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'inline-block', width: '180px' }}>
          Date medication was issued
        </label>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '160px' }}
        />
      </div>

      {/* Daily usage: "Number of tablets" or "Volume" */}
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'inline-block', width: '180px' }}>
          {formulation === 'solid'
            ? 'Number of tablets taken per day'
            : 'Volume of medication taken per day'}
        </label>
        <input
          type="number"
          value={dailyUsage}
          onChange={(e) => setDailyUsage(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '80px' }}
        />
      </div>

      {/* Quantity supplied: "Quantity supplied" or "Volume supplied" */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'inline-block', width: '180px' }}>
          {formulation === 'solid' ? 'Quantity supplied' : 'Volume supplied'}
        </label>
        <input
          type="number"
          value={quantitySupplied}
          onChange={(e) => setQuantitySupplied(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '80px' }}
        />
      </div>

      {/* Dynamic result (if canCalculate) */}
      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          {resultMessage}
        </p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Medication End Date Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default MedicationEndDateCalculator;

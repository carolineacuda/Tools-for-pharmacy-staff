import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";
import DisclaimerReminder from "./DisclaimerReminder.jsx";

function QuantitySyncCalculator() {
  // State for how many medicines and how many days
  const [numberOfMeds, setNumberOfMeds] = useState('');
  const [days, setDays] = useState('');

  // Each line/row has: drugName, tabletsPerDay, tabletsRemaining
  const [lines, setLines] = useState([]);

  // Handle changes to "Number of medicines"
  const handleNumberOfMedsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfMeds(e.target.value); // store raw string so user can clear it

    if (!isNaN(value) && value > 0) {
      // Create or reset rows for that many medicines
      const newLines = Array.from({ length: value }, (_, i) => ({
        drugName: `Drug ${i + 1}`,
        tabletsPerDay: '',
        tabletsRemaining: ''
      }));
      setLines(newLines);
    } else {
      // If invalid, clear lines
      setLines([]);
    }
  };

  // Handle changes to "Number of days"
  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  // Handle changes in each row (drug name, tablets/day, tablets remaining)
  const handleLineChange = (index, field, newValue) => {
    const updatedLines = [...lines];
    updatedLines[index][field] = newValue;
    setLines(updatedLines);
  };

  // Reset everything back to the initial state
  const handleReset = () => {
    setNumberOfMeds('');
    setDays('');
    setLines([]);
  };

  // Helper to decide when to show the table
  const validNumberOfMeds = parseInt(numberOfMeds, 10);
  const validDays = parseInt(days, 10);
  const shouldShowTable =
    !isNaN(validNumberOfMeds) && validNumberOfMeds > 0 &&
    !isNaN(validDays) && validDays > 0;

  return (
    <div className="tool">
      <h2>Quantity Synchronisation Calculator</h2>
      <DisclaimerReminder />
      <p style={{ color: 'grey' }}>The ouptut will automatically be displayed in blue when all the required information has been provided. </p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Number of medicines to synchronise:
          <input
            type="number"
            value={numberOfMeds}
            onChange={handleNumberOfMedsChange}
            style={{ marginLeft: '0.5rem', width: '50px' }}
          />
        </label>
        <label>
          Number of days the medication should last:
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            style={{ marginLeft: '0.5rem', width: '50px' }}
          />
        </label>
      </div>

      {shouldShowTable && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Drug Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tablets per day</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Number of tablets remaining</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Output</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => {
              // Parse the input fields to integers
              const d = parseInt(days, 10);
              const tpd = parseInt(line.tabletsPerDay, 10);
              const rem = parseInt(line.tabletsRemaining, 10);

              let quantity = '';
              // Calculate quantity only if all fields are valid numbers
              if (!isNaN(d) && !isNaN(tpd) && !isNaN(rem)) {
                quantity = d * tpd - rem;
                // If leftover is more than or equal to total needed, set 0
                if (quantity < 0) {
                  quantity = 0;
                }
              }

              // Build output text (e.g., "42 tablets of Ramipril to be issued")
              let outputText = '';
              if (quantity !== '' && !isNaN(quantity)) {
                if (quantity > 0) {
                  outputText = `${quantity} tablets of ${line.drugName} to be issued`;
                } else {
                  outputText = `No additional tablets of ${line.drugName} required`;
                }
              }

              return (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <input
                      type="text"
                      value={line.drugName}
                      onChange={(e) => handleLineChange(index, 'drugName', e.target.value)}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <input
                      type="number"
                      value={line.tabletsPerDay}
                      onChange={(e) => handleLineChange(index, 'tabletsPerDay', e.target.value)}
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <input
                      type="number"
                      value={line.tabletsRemaining}
                      onChange={(e) => handleLineChange(index, 'tabletsRemaining', e.target.value)}
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {outputText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Reset button: Only show if there's something to reset */}
      {(shouldShowTable && lines.length > 0) && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    <FeedbackLink toolName="Quantity Sync Calculator" emailAddress="caroline@toolsforpharmacists.com" />   
    </div>
  );
}

export default QuantitySyncCalculator;

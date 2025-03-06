import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";
import DisclaimerReminder from "./DisclaimerReminder.jsx";

function NonHdlCholesterolCalculator() {
  // Radio button for calculation mode: "target" (40% reduction goal) or "actual" (compare pre & latest)
  const [calculationMode, setCalculationMode] = useState('target');

  // Inputs for "Calculate target" mode
  const [preTotal, setPreTotal] = useState('');       // Pre statin total cholesterol
  const [preHdl, setPreHdl] = useState('');           // Pre statin HDL cholesterol
  const [preNonHdl, setPreNonHdl] = useState('');     // Pre statin non-HDL cholesterol (if available)

  // Inputs for "Calculate actual reduction" mode
  const [latestNonHdl, setLatestNonHdl] = useState(''); // Latest non-HDL cholesterol

  // For optional date fields
  const [useDates, setUseDates] = useState(false);
  const [statinInitiationDate, setStatinInitiationDate] = useState('');
  const [bloodTestDate, setBloodTestDate] = useState('');

  // Helper to parse floats safely
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Helper to round to 1 decimal place
  const round1dp = (val) => val.toFixed(1);

  // Helper to format a YYYY-MM-DD string as DD-MM-YYYY
  const formatDateUk = (isoDateStr) => {
    if (!isoDateStr) return '';
    const date = new Date(isoDateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Decide which result to display based on the calculation mode
  let resultMessage = '';
  // We'll store the numeric result for use in the "Copy Information" summary
  let numericResult = null; 

  if (calculationMode === 'target') {
    // ============================
    //   1) CALCULATE TARGET MODE
    // ============================
    const pNonHdl = parseFloatOrNull(preNonHdl);
    const pTotal = parseFloatOrNull(preTotal);
    const pHdl = parseFloatOrNull(preHdl);

    let baselineNonHdl = null;
    let usedPreNonHdl = false;
    let usedTotalAndHdl = false;

    if (pNonHdl !== null && pNonHdl > 0) {
      baselineNonHdl = pNonHdl;
      usedPreNonHdl = true;
    } else if (
      pTotal !== null &&
      pTotal > 0 &&
      pHdl !== null &&
      pHdl >= 0 &&
      pTotal > pHdl
    ) {
      baselineNonHdl = pTotal - pHdl;
      usedTotalAndHdl = true;
    }

    if (baselineNonHdl !== null && baselineNonHdl > 0) {
      const target = baselineNonHdl * 0.6; // 40% reduction => 60% of baseline
      numericResult = target;
      if (usedPreNonHdl) {
        resultMessage = `Non hdl cholesterol target is ${round1dp(target)} (40% reduction, calculated from baseline non hdl cholesterol provided of ${round1dp(baselineNonHdl)})`;
      } else if (usedTotalAndHdl) {
        resultMessage = `Non hdl cholesterol target is ${round1dp(target)} (40% reduction, calculated from baseline total cholesterol of ${round1dp(pTotal)} and hdl cholesterol of ${round1dp(pHdl)})`;
      }
    }
  } else {
    // =======================================
    //   2) CALCULATE ACTUAL REDUCTION MODE
    // =======================================
    // The user enters pre statin non-HDL and latest non-HDL
    // We want: % reduction = 100 * (pre - latest) / pre
    const pNonHdl = parseFloatOrNull(preNonHdl);
    const lNonHdl = parseFloatOrNull(latestNonHdl);

    if (pNonHdl !== null && pNonHdl > 0 && lNonHdl !== null && lNonHdl >= 0) {
      const reduction = 100 * (pNonHdl - lNonHdl) / pNonHdl;
      numericResult = reduction; // We'll store the numeric % reduction
      resultMessage = `Patient has achieved a ${reduction.toFixed(0)}% reduction`;
    }
  }

  // Build a summary for "Copy Information" if user wants to include the date info
  const handleCopyInformation = () => {
    if (numericResult === null) {
      alert("No valid calculation to copy.");
      return;
    }

    let summary = "";
    if (calculationMode === 'target') {
      // Example: "Non-hdl cholesterol target of 2.4 calculated from blood tests done on 01-09-2023. Statin was initiated on 10-05-2023."
      summary = `Non-hdl cholesterol target of ${round1dp(numericResult)} calculated`;
    } else {
      // "actual" mode
      // Example: "Non-hdl cholesterol actual reduction of 40% from blood tests done on 01-09-2023. Statin was initiated on 10-05-2023."
      summary = `Non-hdl cholesterol actual reduction of ${numericResult.toFixed(0)}% achieved`;
    }

    // If bloodTestDate is provided
    if (bloodTestDate) {
      const ukDate = formatDateUk(bloodTestDate);
      summary += ` from blood tests done on ${ukDate}.`;
    } else {
      summary += ".";
    }

    // If statinInitiationDate is provided
    if (statinInitiationDate) {
      const ukInitDate = formatDateUk(statinInitiationDate);
      summary += ` Statin was initiated on ${ukInitDate}.`;
    }

    navigator.clipboard.writeText(summary)
      .then(() => alert("Information copied to clipboard!"))
      .catch(err => console.error("Failed to copy text:", err));
  };

  // Reset function
  const handleReset = () => {
    setCalculationMode('target');
    setPreTotal('');
    setPreHdl('');
    setPreNonHdl('');
    setLatestNonHdl('');
    setUseDates(false);
    setStatinInitiationDate('');
    setBloodTestDate('');
  };

  return (
    <div className="tool">
      <h2>Non hdl cholesterol target calculator</h2>
      <DisclaimerReminder />
      <p style={{ color: 'grey' }}>The ouptut will automatically be displayed in blue when all the required information has been provided. </p>

      {/* Calculation mode radio buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="calcMode"
            value="target"
            checked={calculationMode === 'target'}
            onChange={() => setCalculationMode('target')}
          />
          Calculate target
        </label>
        <label>
          <input
            type="radio"
            name="calcMode"
            value="actual"
            checked={calculationMode === 'actual'}
            onChange={() => setCalculationMode('actual')}
          />
          Calculate actual reduction
        </label>
      </div>

      {/* Target mode fields */}
      {calculationMode === 'target' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Pre statin total cholesterol level
            </label>
            <input
              type="number"
              value={preTotal}
              onChange={(e) => setPreTotal(e.target.value)}
              style={{ width: '120px' }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Pre statin hdl cholesterol level
            </label>
            <input
              type="number"
              value={preHdl}
              onChange={(e) => setPreHdl(e.target.value)}
              style={{ width: '120px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Pre statin non-hdl cholesterol level (if available)
            </label>
            <input
              type="number"
              value={preNonHdl}
              onChange={(e) => setPreNonHdl(e.target.value)}
              style={{ width: '120px' }}
            />
          </div>
        </div>
      )}

      {/* Actual reduction mode fields */}
      {calculationMode === 'actual' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Pre statin non-hdl cholesterol level
            </label>
            <input
              type="number"
              value={preNonHdl}
              onChange={(e) => setPreNonHdl(e.target.value)}
              style={{ width: '120px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Latest non-hdl cholesterol level
            </label>
            <input
              type="number"
              value={latestNonHdl}
              onChange={(e) => setLatestNonHdl(e.target.value)}
              style={{ width: '120px' }}
            />
          </div>
        </div>
      )}

      {/* Result message if we have one */}
      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold', marginTop: '1rem' }}>
          {resultMessage}
        </p>
      )}

      {/* Optional date fields */}
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={useDates}
            onChange={(e) => setUseDates(e.target.checked)}
          />
          &nbsp;Enter date information?
        </label>
        {useDates && (
          <div style={{ marginTop: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Date statin was first initiated:
              <input
                type="date"
                value={statinInitiationDate}
                onChange={(e) => setStatinInitiationDate(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Date of the blood test:
              <input
                type="date"
                value={bloodTestDate}
                onChange={(e) => setBloodTestDate(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
          </div>
        )}
      </div>

      {/* Copy information button */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleCopyInformation}>Copy information</button>
      </div>

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Non hdl Cholesterol Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />

    </div>
  );
}

export default NonHdlCholesterolCalculator;
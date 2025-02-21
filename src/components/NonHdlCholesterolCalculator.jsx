import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function NonHdlCholesterolCalculator() {
  // Radio button for calculation mode: "target" (40% reduction goal) or "actual" (compare pre & latest)
  const [calculationMode, setCalculationMode] = useState('target');

  // Inputs for "Calculate target" mode
  const [preTotal, setPreTotal] = useState('');       // Pre statin total cholesterol
  const [preHdl, setPreHdl] = useState('');           // Pre statin HDL cholesterol
  const [preNonHdl, setPreNonHdl] = useState('');     // Pre statin non-HDL cholesterol (if available)

  // Inputs for "Calculate actual reduction" mode
  const [latestNonHdl, setLatestNonHdl] = useState(''); // Latest non-HDL cholesterol

  // Helper to parse floats safely
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // Helper to round to 1 decimal place
  const round1dp = (val) => {
    return val.toFixed(1);
  };

  // Decide which result to display based on the calculation mode
  let resultMessage = '';

  if (calculationMode === 'target') {
    // ============================
    //   1) CALCULATE TARGET MODE
    // ============================
    // We want a 40% reduction from the baseline non-HDL
    // Baseline can come from:
    //   a) preNonHdl (if provided), or
    //   b) preTotal - preHdl (if both are provided)

    const pNonHdl = parseFloatOrNull(preNonHdl);
    const pTotal = parseFloatOrNull(preTotal);
    const pHdl = parseFloatOrNull(preHdl);

    // We prefer preNonHdl if it’s a valid positive number;
    // otherwise we fall back to total - HDL if both are valid
    let baselineNonHdl = null;
    let usedPreNonHdl = false;
    let usedTotalAndHdl = false;

    if (pNonHdl !== null && pNonHdl > 0) {
      baselineNonHdl = pNonHdl;
      usedPreNonHdl = true;
    } else if (pTotal !== null && pTotal > 0 && pHdl !== null && pHdl >= 0 && pTotal > pHdl) {
      baselineNonHdl = pTotal - pHdl;
      usedTotalAndHdl = true;
    }

    if (baselineNonHdl !== null && baselineNonHdl > 0) {
      const target = baselineNonHdl * 0.6; // 40% reduction => 60% of baseline
      if (usedPreNonHdl) {
        // "Non hdl cholesterol target is x.x (40% reduction, calculated from baseline non hdl cholesterol provided of xxx)"
        resultMessage = `Non hdl cholesterol target is ${round1dp(target)} (40% reduction, calculated from baseline non hdl cholesterol provided of ${round1dp(baselineNonHdl)})`;
      } else if (usedTotalAndHdl) {
        // "Non hdl cholesterol target is x.x (40% reduction, calculated from baseline total cholesterol of xx and hdl cholesterol of xx)"
        resultMessage = `Non hdl cholesterol target is ${round1dp(target)} (40% reduction, calculated from baseline total cholesterol of ${round1dp(pTotal)} and hdl cholesterol of ${round1dp(pHdl)})`;
      }
    }

  } else {
    // =======================================
    //   2) CALCULATE ACTUAL REDUCTION MODE
    // =======================================
    // The user enters pre statin non-HDL and latest non-HDL
    // We want to find: % reduction = 100 * (pre - latest) / pre
    const pNonHdl = parseFloatOrNull(preNonHdl);
    const lNonHdl = parseFloatOrNull(latestNonHdl);

    if (pNonHdl !== null && pNonHdl > 0 && lNonHdl !== null && lNonHdl >= 0) {
      const reduction = 100 * (pNonHdl - lNonHdl) / pNonHdl;
      // Round to whole number
      const reductionRounded = reduction.toFixed(0);
      resultMessage = `Patient has achieved a ${reductionRounded}% reduction`;
    }
  }

  // Reset all fields
  const handleReset = () => {
    setCalculationMode('target');
    setPreTotal('');
    setPreHdl('');
    setPreNonHdl('');
    setLatestNonHdl('');
  };

  return (
    <div className="tool">
      <h2>Non hdl cholesterol target calculator</h2>

      {/* Radio buttons for the two modes */}
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

      {/* If in "Calculate target" mode, show the relevant inputs */}
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

      {/* If in "Calculate actual reduction" mode, show those inputs */}
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

      {/* Dynamic result (if we have one) */}
      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold', marginTop: '1rem' }}>
          {resultMessage}
        </p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Non hdl Cholesterol Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default NonHdlCholesterolCalculator;

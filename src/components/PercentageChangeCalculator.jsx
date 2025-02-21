import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function PercentageChangeCalculator() {
  const [previous, setPrevious] = useState('');
  const [current, setCurrent] = useState('');
  const [showGuideline, setShowGuideline] = useState(false);

  // Parse numeric input safely
  const prevVal = parseFloat(previous);
  const currVal = parseFloat(current);

  // Compute percentage change if both values are valid and previous != 0
  let percentageResult = '';
  if (!isNaN(prevVal) && prevVal !== 0 && !isNaN(currVal)) {
    const change = ((currVal - prevVal) / prevVal) * 100;
    percentageResult = `Percentage change: ${change.toFixed(2)}%`;
  }

  // Reset function
  const handleReset = () => {
    setPrevious('');
    setCurrent('');
    // Optionally also collapse the guideline
    // setShowGuideline(false);
  };

  // Toggle the guideline section
  const toggleGuideline = () => {
    setShowGuideline((prev) => !prev);
  };

  return (
    <div className="tool">
      <h2>Percentage Increase/Decrease Calculator</h2>

      {/* Inputs for previous/current values */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Previous Value:
          <input
            type="number"
            value={previous}
            onChange={(e) => setPrevious(e.target.value)}
            style={{ width: '80px', marginLeft: '0.5rem' }}
          />
        </label>

        <label style={{ display: 'block' }}>
          Current Value:
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            style={{ width: '80px', marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      {/* Dynamic output in blue */}
      {percentageResult && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>{percentageResult}</p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>

      {/* Collapsible guideline section */}
      <div style={{ marginTop: '1rem' }}>
        {/* Clickable heading toggles show/hide */}
        <h3
          onClick={toggleGuideline}
          style={{ cursor: 'pointer', color: '#007acc' }}
        >
          {showGuideline ? 'Guidance ▲' : 'Guidance ▼'}
        </h3>

        {/* The table is shown only if showGuideline is true */}
        {showGuideline && (
          <div style={{ marginTop: '0.5rem' }}>
            <table
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                fontSize: '0.9rem',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    Parameter
                  </th>
                  <th
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    Diuretics (Heart Failure)
                  </th>
                  <th
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    ACE Inhibitors/AIIRAs (Heart Failure)
                  </th>
                  <th
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    ACE Inhibitors/AIIRAs (Hypertension)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Mild Change */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    Mild Change
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    &gt;20% ↑ creatinine or &gt;15% ↓ eGFR → Recheck in 2 weeks
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    &gt;30% ↑ creatinine or &gt;25% ↓ eGFR → Recheck in 1–2
                    weeks
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    &lt;30% ↑ creatinine / &lt;25% ↓ eGFR → Continue same dose;
                    recheck in 1–2 weeks
                  </td>
                </tr>

                {/* Moderate Change */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    Moderate Change
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    30–50% ↑ creatinine (or &gt;200 µmol/L) or eGFR &lt;30 → Volume
                    review, dose reduction/withdrawal if hypovolaemic; recheck in
                    1 week
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    30–50% ↑ creatinine (or &gt;200 µmol/L) or eGFR &lt;30 → Volume
                    review; temporary dose reduction/withdrawal
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    ≥30% ↑ creatinine or ≥25% ↓ eGFR → Investigate causes, adjust
                    concurrent meds
                  </td>
                </tr>

                {/* Severe Change */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    Severe Change
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    &gt;50% ↑ creatinine (or &gt;256 µmol/L; eGFR ≈20–25) → Comprehensive
                    review; stop if hypovolaemic; specialist advice if uncertain
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    &gt;50% ↑ creatinine (or &gt;256 µmol/L; eGFR ≈20–25) → Dose
                    reduction/withdrawal + specialist referral; &gt;100% ↑ or
                    &gt;310 µmol/L (eGFR &lt;20) → Stop and seek urgent advice
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    Persistent abnormalities → Stop or reduce dose; recheck in
                    5–7 days (add alternative antihypertensive as needed)
                  </td>
                </tr>

                {/* References */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    References
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <a
                      href="https://cks.nice.org.uk/topics/heart-failure-chronic/prescribing-information/diuretics/#managing-abnormal-results"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NICE CKS Guidance -heart failure - managing abnormal results - diuretics
                    </a>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <a
                      href="https://cks.nice.org.uk/topics/heart-failure-chronic/prescribing-information/ace-inhibitors/#managing-abnormal-results"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NICE CKS Guidance - heart failure - managing abnormal results - ACE inhibitors
                    </a>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <a
                      href="https://cks.nice.org.uk/topics/hypertension/prescribing-information/angiotensin-converting-enzyme-inhibitors/#managing-abnormal-results"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NICE CKS Guidance - hypertension - managing abnormal results - ACE inhibitors
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <FeedbackLink toolName="Percentage Change Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />  
    </div>
  );
}

export default PercentageChangeCalculator;

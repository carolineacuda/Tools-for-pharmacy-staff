import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function DosageCalculator() {
  // Calculation method: 'weight' (mg/kg * kg) or 'direct' (user enters total mg)
  const [calculationMethod, setCalculationMethod] = useState('weight');

  // Weight-based fields
  const [weight, setWeight] = useState('');
  const [mgPerKg, setMgPerKg] = useState('');

  // Direct dose field
  const [totalDose, setTotalDose] = useState('');

  // Formulation choice: 'liquid' or 'tablet'
  const [formulation, setFormulation] = useState('liquid');

  // Liquid concentration fields (e.g., 300 mg / 5 ml)
  const [liquidMg, setLiquidMg] = useState('');
  const [liquidMl, setLiquidMl] = useState('');

  // Tablet strength
  const [tabletStrength, setTabletStrength] = useState('');

  // Helper function to safely parse floats
  const parseOrZero = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  // 1. Compute the total daily dose (if possible)
  let dailyDose = 0;
  if (calculationMethod === 'weight') {
    const w = parseOrZero(weight);
    const mgk = parseOrZero(mgPerKg);
    if (w > 0 && mgk > 0) {
      dailyDose = w * mgk;
    }
  } else {
    const td = parseOrZero(totalDose);
    if (td > 0) {
      dailyDose = td;
    }
  }

  // 2. Partial Result: Show the daily dose if > 0
  const dailyDoseMessage =
    dailyDose > 0 ? `Total daily dose: ${dailyDose.toFixed(1)} mg` : '';

  // 3. Final Result: If dailyDose > 0 and the formulation inputs are valid, compute final
  let finalResult = '';
  if (dailyDose > 0) {
    if (formulation === 'liquid') {
      const mgVal = parseOrZero(liquidMg);
      const mlVal = parseOrZero(liquidMl);
      if (mgVal > 0 && mlVal > 0) {
        const mgPerMl = mgVal / mlVal;
        const volumeNeeded = dailyDose / mgPerMl;
        finalResult = `${volumeNeeded.toFixed(1)} ml (${dailyDose.toFixed(1)} mg total) of ` +
                      `${mgVal} mg/${mlVal} ml solution`;
      }
    } else {
      const strength = parseOrZero(tabletStrength);
      if (strength > 0) {
        const numTablets = dailyDose / strength;
        finalResult = `${numTablets.toFixed(1)} tablets (${dailyDose.toFixed(1)} mg total)`;
      }
    }
  }

  // 4. Reset function to clear all fields
  const handleReset = () => {
    setCalculationMethod('weight');
    setWeight('');
    setMgPerKg('');
    setTotalDose('');
    setFormulation('liquid');
    setLiquidMg('');
    setLiquidMl('');
    setTabletStrength('');
  };

  return (
    <div className="tool">
      <h2>Dosage Calculator</h2>

      {/* Calculation Method Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="calcMethod"
            value="weight"
            checked={calculationMethod === 'weight'}
            onChange={() => setCalculationMethod('weight')}
          />
          Calculate dose based on weight
        </label>
        <label>
          <input
            type="radio"
            name="calcMethod"
            value="direct"
            checked={calculationMethod === 'direct'}
            onChange={() => setCalculationMethod('direct')}
          />
          Enter total daily mg dose directly
        </label>
      </div>

      {/* Weight-based Inputs */}
      {calculationMethod === 'weight' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Weight:
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ width: '80px', marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>kg</span>
          </label>

          <label style={{ display: 'block' }}>
            Dosage:
            <input
              type="number"
              value={mgPerKg}
              onChange={(e) => setMgPerKg(e.target.value)}
              style={{ width: '80px', marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>mg/kg</span>
          </label>
        </div>
      )}

      {/* Direct Total Dose Input */}
      {calculationMethod === 'direct' && (
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Total daily mg dose:
            <input
              type="number"
              value={totalDose}
              onChange={(e) => setTotalDose(e.target.value)}
              style={{ width: '100px', marginLeft: '0.5rem' }}
            />
          </label>
        </div>
      )}

      {/* Show partial daily dose if valid */}
      {dailyDoseMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>{dailyDoseMessage}</p>
      )}

      {/* Formulation Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <p>Formulation:</p>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="formulation"
            value="liquid"
            checked={formulation === 'liquid'}
            onChange={() => setFormulation('liquid')}
          />
          Liquid
        </label>
        <label>
          <input
            type="radio"
            name="formulation"
            value="tablet"
            checked={formulation === 'tablet'}
            onChange={() => setFormulation('tablet')}
          />
          Tablet / Capsule
        </label>
      </div>

      {/* Liquid Fields */}
      {formulation === 'liquid' && (
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Liquid concentration:
            <input
              type="number"
              value={liquidMg}
              onChange={(e) => setLiquidMg(e.target.value)}
              style={{ width: '80px', marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>mg /</span>
            <input
              type="number"
              value={liquidMl}
              onChange={(e) => setLiquidMl(e.target.value)}
              style={{ width: '50px' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>ml</span>
          </label>
        </div>
      )}

      {/* Tablet Fields */}
      {formulation === 'tablet' && (
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Tablet strength:
            <input
              type="number"
              value={tabletStrength}
              onChange={(e) => setTabletStrength(e.target.value)}
              style={{ width: '80px', marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>mg per tablet</span>
          </label>
        </div>
      )}

      {/* Show final result if enough info is provided */}
      {finalResult && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>{finalResult}</p>
      )}

      {/* Reset Button */}
      <button onClick={handleReset}>Reset</button>

      {/* Link to BNF for dosage guidance */}
     <p style={{ marginTop: '1rem' }}>
       <a
         href="https://bnf.nice.org.uk/"
         target="_blank"
         rel="noopener noreferrer"
         style={{ textDecoration: 'underline', color: 'blue' }}
       >
        British National Formulary (BNF)
       </a>
     </p>
     <FeedbackLink toolName="Dosage Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default DosageCalculator;

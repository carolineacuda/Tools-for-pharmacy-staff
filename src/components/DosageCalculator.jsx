import React, { useState, useEffect, useRef } from 'react';




function DosageCalculator() {
  // State for choosing calculation method: weight based or direct dose input
  const [calculationMethod, setCalculationMethod] = useState('weight'); // 'weight' or 'direct'
  // States for weight based inputs
  const [weight, setWeight] = useState('');
  const [mgPerKg, setMgPerKg] = useState('');
  // State for direct dose input
  const [totalDose, setTotalDose] = useState('');
  // States for medication form and strength
  const [medType, setMedType] = useState('tablet'); // 'tablet' or 'liquid'
  const [strength, setStrength] = useState(''); // used for tablets (mg per tablet)
  const [liquidConcentration, setLiquidConcentration] = useState(''); // used for liquids (mg/ml)
  // Result message
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    let dose;
    if (calculationMethod === 'weight') {
      if (!weight || !mgPerKg) {
        setResult("Please enter both weight and mg/kg dosage.");
        return;
      }
      dose = parseFloat(weight) * parseFloat(mgPerKg);
    } else {
      if (!totalDose) {
        setResult("Please enter the total daily mg dose.");
        return;
      }
      dose = parseFloat(totalDose);
    }
    
    // Calculate based on the medication type
    if (medType === 'tablet') {
      if (!strength) {
        setResult("Please enter the tablet strength in mg.");
        return;
      }
      const numTablets = dose / parseFloat(strength);
      // Build a confirmation string showing the parameters
      setResult(`${numTablets.toFixed(2)} tablets (${dose.toFixed(2)} mg total)`);
    } else if (medType === 'liquid') {
      if (!liquidConcentration) {
        setResult("Please enter the liquid concentration in mg/ml.");
        return;
      }
      const volume = dose / parseFloat(liquidConcentration);
      setResult(`${volume.toFixed(2)} ml (${dose.toFixed(2)} mg total) of solution at ${liquidConcentration} mg/ml`);
    }
  };

  return (
    <div className="tool">
      <h2>Weight Based Dosage Calculator</h2>
      <div>
        <label>
          <input
            type="radio"
            value="weight"
            checked={calculationMethod === 'weight'}
            onChange={() => setCalculationMethod('weight')}
          />
          Calculate dose based on weight
        </label>
        <label>
          <input
            type="radio"
            value="direct"
            checked={calculationMethod === 'direct'}
            onChange={() => setCalculationMethod('direct')}
          />
          Enter total daily mg dose directly
        </label>
      </div>
      {calculationMethod === 'weight' ? (
        <div className="input-group">
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </label>
          <label>
            Dosage (mg/kg):
            <input
              type="number"
              value={mgPerKg}
              onChange={e => setMgPerKg(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="input-group">
          <label>
            Total Daily Dose (mg):
            <input
              type="number"
              value={totalDose}
              onChange={e => setTotalDose(e.target.value)}
            />
          </label>
        </div>
      )}
      <div className="input-group">
        <label>
          <input
            type="radio"
            value="tablet"
            checked={medType === 'tablet'}
            onChange={() => setMedType('tablet')}
          />
          Tablet/Capsule
        </label>
        <label>
          <input
            type="radio"
            value="liquid"
            checked={medType === 'liquid'}
            onChange={() => setMedType('liquid')}
          />
          Liquid
        </label>
      </div>
      {medType === 'tablet' ? (
        <div className="input-group">
          <label>
            Tablet strength (mg per tablet):
            <input
              type="number"
              value={strength}
              onChange={e => setStrength(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="input-group">
          <label>
            Liquid concentration (mg/ml):
            <input
              type="number"
              value={liquidConcentration}
              onChange={e => setLiquidConcentration(e.target.value)}
            />
          </label>
        </div>
      )}
      <button onClick={handleCalculate}>Calculate Dosage</button>
      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default DosageCalculator;
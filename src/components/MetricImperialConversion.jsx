import React, { useState } from 'react';

function MetricImperialConversionCalculator() {
  // Toggle between Weight and Height modes.
  const [calcMode, setCalcMode] = useState('weight');

  // Weight states
  const [kg, setKg] = useState('');
  const [stone, setStone] = useState('');
  const [pounds, setPounds] = useState('');

  // Height states
  const [cm, setCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  // Helper: parse float or return null if invalid.
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // ===========================
  // WEIGHT CONVERSION FUNCTIONS
  // ===========================
  const kgToStonePounds = (kgValue) => {
    // 1 stone = 6.35029318 kg, 1 stone = 14 lb
    const totalStone = kgValue / 6.35029318;
    const wholeStone = Math.floor(totalStone);
    const fractionStone = totalStone - wholeStone;
    const lbs = fractionStone * 14;
    return { stone: wholeStone, pounds: lbs };
  };

  const stonePoundsToKg = (st, lb) => {
    return st * 6.35029318 + lb * 0.45359237;
  };

  // ============================
  // HEIGHT CONVERSION FUNCTIONS
  // ============================
  const cmToFeetInches = (cmValue) => {
    // 1 inch = 2.54 cm, 1 foot = 12 inches
    const totalInches = cmValue / 2.54;
    const wholeFeet = Math.floor(totalInches / 12);
    const leftoverInches = totalInches - wholeFeet * 12;
    return { feet: wholeFeet, inches: leftoverInches };
  };

  const feetInchesToCm = (ft, inch) => {
    const totalInches = ft * 12 + inch;
    return totalInches * 2.54;
  };

  // ============================
  // COMPUTE THE OUTPUT
  // ============================
  let resultMessage = '';

  if (calcMode === 'weight') {
    // Check which field is filled:
    const parsedKg = parseFloatOrNull(kg);
    const parsedStone = parseFloatOrNull(stone);
    const parsedPounds = parseFloatOrNull(pounds);

    if (parsedKg !== null && parsedKg > 0) {
      // If kg is entered, ignore stone/pounds and output: "11 stone and 0.3 lb is equivalent to 70.0 kg"
      const { stone: st, pounds: lb } = kgToStonePounds(parsedKg);
      resultMessage = `${st.toFixed(0)} stone and ${lb.toFixed(1)} lb is equivalent to ${parsedKg.toFixed(1)} kg`;
    } else if (
      parsedStone !== null &&
      parsedPounds !== null &&
      (parsedStone > 0 || parsedPounds > 0)
    ) {
      // If stone/pounds are entered, ignore kg and output: "71.2 kg (11 stone and 3.0 lb)"
      const computedKg = stonePoundsToKg(parsedStone, parsedPounds);
      resultMessage = `${computedKg.toFixed(1)} kg is equivalent to ${parsedStone.toFixed(0)} stone and ${parsedPounds.toFixed(1)} lb`;
    }
  } else {
    // Height conversion.
    const parsedCm = parseFloatOrNull(cm);
    const parsedFeet = parseFloatOrNull(feet);
    const parsedInches = parseFloatOrNull(inches);

    if (parsedCm !== null && parsedCm > 0) {
      const { feet: ft, inches: inch } = cmToFeetInches(parsedCm);
      resultMessage = `${ft.toFixed(0)} feet and ${inch.toFixed(1)} inches is equivalent to ${parsedCm.toFixed(1)} cm`;
    } else if (
      parsedFeet !== null &&
      parsedInches !== null &&
      (parsedFeet > 0 || parsedInches > 0)
    ) {
      const computedCm = feetInchesToCm(parsedFeet, parsedInches);
      resultMessage = `${computedCm.toFixed(1)} cm is equivalent to ${parsedFeet.toFixed(0)}  feet and ${parsedInches.toFixed(1)} inches`;
    }
  }

  // Reset function to clear all inputs.
  const handleReset = () => {
    setCalcMode('weight');
    setKg('');
    setStone('');
    setPounds('');
    setCm('');
    setFeet('');
    setInches('');
  };

  return (
    <div className="tool">
      <h2>Metric Imperial Conversion Calculator</h2>
      {/* Toggle between Weight and Height */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="calcMode"
            value="weight"
            checked={calcMode === 'weight'}
            onChange={() => {
              handleReset();
              setCalcMode('weight');
            }}
          />
          Weight
        </label>
        <label>
          <input
            type="radio"
            name="calcMode"
            value="height"
            checked={calcMode === 'height'}
            onChange={() => {
              handleReset();
              setCalcMode('height');
            }}
          />
          Height
        </label>
      </div>

      {calcMode === 'weight' && (
        <div style={{ marginBottom: '1rem' }}>
          {/* kg input */}
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Kilograms (kg)
            </label>
            <input
              type="number"
              value={kg}
              onChange={(e) => {
                setKg(e.target.value);
                // Clear stone/pounds if kg is entered.
                if (e.target.value !== "") {
                  setStone("");
                  setPounds("");
                }
              }}
              style={{ width: '100px' }}
              placeholder="e.g. 70"
              disabled={stone !== "" || pounds !== ""}
            />
          </div>
          {/* Stone / Pounds input */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Stone / Pounds
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                value={stone}
                onChange={(e) => {
                  setStone(e.target.value);
                  // Clear kg if stone is entered.
                  if (e.target.value !== "") {
                    setKg("");
                  }
                }}
                style={{ width: '60px' }}
                placeholder="st"
                disabled={kg !== ""}
              />
              <input
                type="number"
                value={pounds}
                onChange={(e) => {
                  setPounds(e.target.value);
                  // Clear kg if pounds is entered.
                  if (e.target.value !== "") {
                    setKg("");
                  }
                }}
                style={{ width: '60px' }}
                placeholder="lb"
                disabled={kg !== ""}
              />
            </div>
          </div>
        </div>
      )}

      {calcMode === 'height' && (
        <div style={{ marginBottom: '1rem' }}>
          {/* cm input */}
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Centimeters (cm)
            </label>
            <input
              type="number"
              value={cm}
              onChange={(e) => {
                setCm(e.target.value);
                // Clear feet/inches if cm is entered.
                if (e.target.value !== "") {
                  setFeet("");
                  setInches("");
                }
              }}
              style={{ width: '100px' }}
              placeholder="e.g. 170"
              disabled={feet !== "" || inches !== ""}
            />
          </div>
          {/* Feet / Inches input */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Feet / Inches
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                value={feet}
                onChange={(e) => {
                  setFeet(e.target.value);
                  if (e.target.value !== "") {
                    setCm("");
                  }
                }}
                style={{ width: '60px' }}
                placeholder="ft"
                disabled={cm !== ""}
              />
              <input
                type="number"
                value={inches}
                onChange={(e) => {
                  setInches(e.target.value);
                  if (e.target.value !== "") {
                    setCm("");
                  }
                }}
                style={{ width: '60px' }}
                placeholder="in"
                disabled={cm !== ""}
              />
            </div>
          </div>
        </div>
      )}

      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>{resultMessage}</p>
      )}

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default MetricImperialConversionCalculator;

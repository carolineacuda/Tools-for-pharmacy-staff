import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function MetricImperialConversion() {
  // Radio button to toggle between Weight and Height
  const [calcMode, setCalcMode] = useState('weight');

  // Weight states
  const [kg, setKg] = useState('');
  const [stone, setStone] = useState('');
  const [pounds, setPounds] = useState('');

  // Height states
  const [cm, setCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  // Helper: parse float or return null if invalid
  const parseFloatOrNull = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  // ===========================
  // WEIGHT CONVERSION FUNCTIONS
  // ===========================
  const kgToStonePounds = (kgValue) => {
    // 1 stone = 6.35029318 kg
    // leftover in stone => convert to pounds (1 stone = 14 lb)
    const totalStone = kgValue / 6.35029318; 
    const wholeStone = Math.floor(totalStone);
    const fractionStone = totalStone - wholeStone;
    const lbs = fractionStone * 14; 
    return {
      stone: wholeStone,
      pounds: lbs,
    };
  };

  const stonePoundsToKg = (st, lb) => {
    // st in stone, lb in pounds
    // 1 stone = 6.35029318 kg, 1 lb = 0.45359237 kg
    return st * 6.35029318 + lb * 0.45359237;
  };

  // ============================
  // HEIGHT CONVERSION FUNCTIONS
  // ============================
  const cmToFeetInches = (cmValue) => {
    // 1 inch = 2.54 cm
    // 1 foot = 12 inches
    const totalInches = cmValue / 2.54;
    const wholeFeet = Math.floor(totalInches / 12);
    const leftoverInches = totalInches - wholeFeet * 12;
    return {
      feet: wholeFeet,
      inches: leftoverInches,
    };
  };

  const feetInchesToCm = (ft, inch) => {
    // ft in feet, inch in inches
    // totalInches = ft*12 + inch
    // 1 inch = 2.54 cm
    const totalInches = ft * 12 + inch;
    return totalInches * 2.54;
  };

  // ============================
  // COMPUTE THE OUTPUT
  // ============================
  let resultMessage = '';

  if (calcMode === 'weight') {
    // If the user entered a valid kg, convert to stone+pounds
    const parsedKg = parseFloatOrNull(kg);
    const parsedStone = parseFloatOrNull(stone);
    const parsedPounds = parseFloatOrNull(pounds);

    if (parsedKg !== null && parsedKg > 0) {
      // Convert kg -> stone/pounds
      const { stone: st, pounds: lb } = kgToStonePounds(parsedKg);
      // Example: "11 stone and 0.3 lb is equivalent to 70 kg"
      resultMessage = `${st.toFixed(0)} stone and ${lb.toFixed(1)} lb (${parsedKg.toFixed(
        1
      )} kg)`;
    } else if (
      // Otherwise, if the user entered stone/pounds, convert to kg
      parsedStone !== null &&
      parsedStone >= 0 &&
      parsedPounds !== null &&
      parsedPounds >= 0 &&
      (parsedStone > 0 || parsedPounds > 0)
    ) {
      const computedKg = stonePoundsToKg(parsedStone, parsedPounds);
      // Example: "11 stone and 0.3 lb is equivalent to 70 kg"
      resultMessage = `${parsedStone.toFixed(0)} stone and ${parsedPounds.toFixed(
        1
      )} lb (${computedKg.toFixed(1)} kg)`;
    }
  } else {
    // calcMode === 'height'
    const parsedCm = parseFloatOrNull(cm);
    const parsedFeet = parseFloatOrNull(feet);
    const parsedInches = parseFloatOrNull(inches);

    if (parsedCm !== null && parsedCm > 0) {
      // Convert cm -> feet/inches
      const { feet: ft, inches: inch } = cmToFeetInches(parsedCm);
      // "5 feet and 7.9 inches is equivalent to 170 cm"
      resultMessage = `${ft.toFixed(0)} feet and ${inch.toFixed(1)} inches (${parsedCm.toFixed(
        1
      )} cm)`;
    } else if (
      parsedFeet !== null &&
      parsedFeet >= 0 &&
      parsedInches !== null &&
      parsedInches >= 0 &&
      (parsedFeet > 0 || parsedInches > 0)
    ) {
      const computedCm = feetInchesToCm(parsedFeet, parsedInches);
      resultMessage = `${parsedFeet.toFixed(0)} feet and ${parsedInches.toFixed(
        1
      )} inches (${computedCm.toFixed(1)} cm)`;
    }
  }

  // ============================
  // RESET ALL FIELDS
  // ============================
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
            onChange={() => setCalcMode('weight')}
          />
          Weight
        </label>
        <label>
          <input
            type="radio"
            name="calcMode"
            value="height"
            checked={calcMode === 'height'}
            onChange={() => setCalcMode('height')}
          />
          Height
        </label>
      </div>

      {/* Weight Fields */}
      {calcMode === 'weight' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Kilograms (kg)
            </label>
            <input
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              style={{ width: '100px' }}
              placeholder="e.g. 70"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Stone / Pounds
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                value={stone}
                onChange={(e) => setStone(e.target.value)}
                style={{ width: '60px' }}
                placeholder="st"
              />
              <input
                type="number"
                value={pounds}
                onChange={(e) => setPounds(e.target.value)}
                style={{ width: '60px' }}
                placeholder="lb"
              />
            </div>
          </div>
        </div>
      )}

      {/* Height Fields */}
      {calcMode === 'height' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Centimeters (cm)
            </label>
            <input
              type="number"
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              style={{ width: '100px' }}
              placeholder="e.g. 170"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>
              Feet / Inches
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                style={{ width: '60px' }}
                placeholder="ft"
              />
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                style={{ width: '60px' }}
                placeholder="in"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic output in blue */}
      {resultMessage && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>{resultMessage}</p>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Metric Imperial Conversion Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default MetricImperialConversion;

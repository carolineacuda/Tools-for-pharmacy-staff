import React, { useState } from 'react';


// Data from your provided table
// For non-patch opioids: "mgDrugPer10Morphine" = how many mg of this opioid ~ 10 mg oral morphine
// For patches: "morphineEquivalent" = total daily mg oral morphine matched by 1 patch

const opioidData = [
    // --- ORAL ---
    { id: 'oral-codeine', name: 'Codeine phosphate (oral)', route: 'oral', mgDrugPer10Morphine: 100 },
    { id: 'oral-dihydrocodeine', name: 'Dihydrocodeine (oral)', route: 'oral', mgDrugPer10Morphine: 100 },
    { id: 'oral-hydromorphone', name: 'Hydromorphone (oral)', route: 'oral', mgDrugPer10Morphine: 2 },
    { id: 'oral-morphine', name: 'Morphine (oral)', route: 'oral', mgDrugPer10Morphine: 10 },
    { id: 'oral-oxycodone', name: 'Oxycodone (oral)', route: 'oral', mgDrugPer10Morphine: 6.6 },
    { id: 'oral-tapentadol', name: 'Tapentadol (oral)', route: 'oral', mgDrugPer10Morphine: 25 },
    { id: 'oral-tramadol', name: 'Tramadol (oral)', route: 'oral', mgDrugPer10Morphine: 100 },
  
    // --- IV / Subcut ---
    { id: 'inj-diamorphine', name: 'Diamorphine (IV/Subcut)', route: 'injection', mgDrugPer10Morphine: 3.3 },
    { id: 'inj-oxycodone', name: 'Oxycodone (IV/Subcut)', route: 'injection', mgDrugPer10Morphine: 5 },
    { id: 'inj-morphine', name: 'Morphine (IV/Subcut)', route: 'injection', mgDrugPer10Morphine: 5 },
  
    // --- PATCHES ---
    { id: 'patch-bupren-5',  name: 'Buprenorphine 5 mcg/h patch',    route: 'patch', morphineEquivalent: 12 },
    { id: 'patch-bupren-10', name: 'Buprenorphine 10 mcg/h patch',   route: 'patch', morphineEquivalent: 24 },
    { id: 'patch-bupren-15', name: 'Buprenorphine 15 mcg/h patch',   route: 'patch', morphineEquivalent: 36 },
    { id: 'patch-bupren-20', name: 'Buprenorphine 20 mcg/h patch',   route: 'patch', morphineEquivalent: 48 },
    { id: 'patch-bupren-35', name: 'Buprenorphine 35 mcg/h patch',   route: 'patch', morphineEquivalent: 84 },
    { id: 'patch-bupren-52', name: 'Buprenorphine 52.5 mcg/h patch', route: 'patch', morphineEquivalent: 126 },
    { id: 'patch-bupren-70', name: 'Buprenorphine 70 mcg/h patch',   route: 'patch', morphineEquivalent: 168 },
    { id: 'patch-fent-12',   name: 'Fentanyl 12 mcg/h patch',        route: 'patch', morphineEquivalent: 30 },
    { id: 'patch-fent-25',   name: 'Fentanyl 25 mcg/h patch',        route: 'patch', morphineEquivalent: 60 },
    { id: 'patch-fent-37',   name: 'Fentanyl 37.5 mcg/h patch',      route: 'patch', morphineEquivalent: 90 },
    { id: 'patch-fent-50',   name: 'Fentanyl 50 mcg/h patch',        route: 'patch', morphineEquivalent: 120 },
    { id: 'patch-fent-75',   name: 'Fentanyl 75 mcg/h patch',        route: 'patch', morphineEquivalent: 180 },
    { id: 'patch-fent-100',  name: 'Fentanyl 100 mcg/h patch',       route: 'patch', morphineEquivalent: 240 },
  ];
  
  // Helper to compute morphine equivalent for a given opioid and daily dose.
  function getMorphineEquivalent(opioidId, dailyDose) {
    const item = opioidData.find(o => o.id === opioidId);
    if (!item) return 0;
  
    if (item.route === 'patch') {
      // For patches, dailyDose represents the number of patches.
      return dailyDose * item.morphineEquivalent;
    }
  
    // For non-patch opioids:
    // (dailyDose / mgDrugPer10Morphine) * 10 gives the mg morphine equivalent.
    const ratio = 10 / item.mgDrugPer10Morphine;
    return dailyDose * ratio;
  }
  
  function convertFromMorphine(morphineMg, targetOpioidId) {
    const item = opioidData.find(o => o.id === targetOpioidId);
    if (!item || morphineMg <= 0) return '';
  
    if (item.route === 'patch') {
      // Calculate number of patches required (approximate).
      const patches = morphineMg / item.morphineEquivalent;
      return `${patches.toFixed(1)} patch(es) of ${item.name} (approx)`;
    }
  
    // For non-patch opioids.
    const ratio = item.mgDrugPer10Morphine / 10;
    const drugDose = morphineMg * ratio;
    return `${drugDose.toFixed(1)} mg/day of ${item.name} (approx)`;
  }
  
  function OpioidConversionCalculator() {
    // PART A: Summation of total daily morphine-equivalent dose.
    // Each row holds { opioidId, dailyDose }.
    const [lines, setLines] = useState([{ opioidId: '', dailyDose: '' }]);
  
    // PART B: Conversion from morphine to another opioid.
    const [morphineDaily, setMorphineDaily] = useState('');
    const [targetOpioid, setTargetOpioid] = useState('');
  
    // Handle changes for each line.
    const handleLineChange = (index, field, value) => {
      const newLines = [...lines];
      newLines[index][field] = value;
      setLines(newLines);
    };
  
    const addLine = () => {
      setLines([...lines, { opioidId: '', dailyDose: '' }]);
    };
  
    const removeLine = (index) => {
      const newLines = lines.filter((_, i) => i !== index);
      setLines(newLines);
    };
  
    // Compute total morphine equivalent.
    let totalMorphineEq = 0;
    lines.forEach(line => {
      const doseVal = parseFloat(line.dailyDose);
      if (!isNaN(doseVal) && doseVal > 0 && line.opioidId) {
        totalMorphineEq += getMorphineEquivalent(line.opioidId, doseVal);
      }
    });
  
    // PART B: Convert from morphine to target opioid.
    const morphineVal = parseFloat(morphineDaily);
    let conversionResult = '';
    if (!isNaN(morphineVal) && morphineVal > 0 && targetOpioid) {
      conversionResult = convertFromMorphine(morphineVal, targetOpioid);
    }
  
    // Reset all fields.
    const handleReset = () => {
      setLines([{ opioidId: '', dailyDose: '' }]);
      setMorphineDaily('');
      setTargetOpioid('');
    };
  
    return (
      <div className="tool">
        <h2>Opioid Conversion Calculator</h2>
  
        {/* PART A: Total Daily Morphine-Equivalent Dose */}
        <h3>Total Daily Morphine-Equivalent Dose</h3>
        <p>Enter each opioid the patient is taking, plus total daily dose:</p>
        {lines.map((line, index) => {
          const selectedOpioid = opioidData.find(od => od.id === line.opioidId);
          const dailyDosePlaceholder = selectedOpioid && selectedOpioid.route === 'patch'
            ? 'no. of patches'
            : 'Daily dose';
          const doseVal = parseFloat(line.dailyDose);
          const rowMorphineEq = (!isNaN(doseVal) && line.opioidId)
            ? getMorphineEquivalent(line.opioidId, doseVal)
            : null;
          return (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              <select
                value={line.opioidId}
                onChange={(e) => handleLineChange(index, 'opioidId', e.target.value)}
                style={{ marginRight: '0.5rem' }}
              >
                <option value="">-- Select Opioid --</option>
                {opioidData.map(od => (
                  <option key={od.id} value={od.id}>
                    {od.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder={dailyDosePlaceholder}
                value={line.dailyDose}
                onChange={(e) => handleLineChange(index, 'dailyDose', e.target.value)}
                style={{ width: '100px', marginRight: '0.5rem' }}
              />
              {rowMorphineEq !== null && (
                <span style={{ color: 'blue' }}>
                  ({rowMorphineEq.toFixed(1)} mg morphine eq.)
                </span>
              )}
              {lines.length > 1 && (
                <button onClick={() => removeLine(index)} style={{ marginLeft: '0.5rem' }}>
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button onClick={addLine} style={{ marginBottom: '1rem' }}>
          Add another opioid
        </button>
  
        {/* Total Morphine Equivalent Output */}
        {totalMorphineEq > 0 && (
          <p style={{ color: 'blue', fontWeight: 'bold' }}>
            Total daily morphine equivalent: {totalMorphineEq.toFixed(1)} mg
          </p>
        )}
  
        <hr style={{ margin: '1rem 0' }} />
  
        {/* PART B: Convert from Oral Morphine to Another Opioid */}
        <h3>Convert from Oral Morphine to Another Opioid</h3>
        <p>Enter total daily oral morphine dose, then pick the target opioid:</p>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Oral Morphine mg/day:</label>
          <input
            type="number"
            value={morphineDaily}
            onChange={(e) => setMorphineDaily(e.target.value)}
            style={{ width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <select
            value={targetOpioid}
            onChange={(e) => setTargetOpioid(e.target.value)}
          >
            <option value="">-- Select Target Opioid --</option>
            {opioidData.map(od => (
              <option key={od.id} value={od.id}>
                {od.name}
              </option>
            ))}
          </select>
        </div>
        {conversionResult && (
          <p style={{ color: 'blue', fontWeight: 'bold' }}>
            {conversionResult}
          </p>
        )}
  
        <hr style={{ margin: '1rem 0' }} />
  
        {/* Notes Section */}
        <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '1rem' }}>
          <p>
            <strong>Notes:</strong> These conversions are approximate. Data is derived from opioid dose equivalent tables (as of Feb 2025) and the Faculty of Pain Medicine guidelines. Please refer to&nbsp;
            <a
              href="https://fpm.ac.uk/opioids-aware-structured-approach-opioid-prescribing/dose-equivalents-and-changing-opioids"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              Faculty of Pain Medicine
            </a>
            &nbsp;for additional guidance when switching opioids.
          </p>
        </div>
  
        {/* Reset Button */}
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  }

export default OpioidConversionCalculator;

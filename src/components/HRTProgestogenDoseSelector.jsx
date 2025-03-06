import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";
import DisclaimerReminder from "./DisclaimerReminder.jsx";

// Define the available HRT products with their dose options and associated oestrogen categories.
const hrtOptions = {
  "Oestrogel": [
    { label: "½ pump", category: "Ultra-Low" },
    { label: "1 pump", category: "Low" },
    { label: "2 pumps", category: "Standard" },
    { label: "3 pumps", category: "Moderate" },
    { label: "4 pumps", category: "High" }
  ],
  "Sandrena": [
    { label: "0.25mg", category: "Ultra-Low" },
    { label: "0.5mg", category: "Low" },
    { label: "1mg", category: "Standard" },
    { label: "1.5-2mg", category: "Moderate" },
    { label: "3mg", category: "High" }
  ],
  "Lenzetto Spray": [
    { label: "1 spray", category: "Ultra-Low" },
    { label: "2 sprays", category: "Low" },
    { label: "3 sprays", category: "Standard" },
    { label: "4-5 sprays", category: "Moderate" },
    { label: "6 sprays", category: "High" }
  ],
  "Patch": [
    { label: "12.5 mcg", category: "Ultra-Low" },
    { label: "25 mcg", category: "Low" },
    { label: "50 mcg", category: "Standard" },
    { label: "75 mcg", category: "Moderate" },
    { label: "100 mcg", category: "High" }
  ],
  "Oral estradiol": [
    { label: "0.5mg", category: "Ultra-Low" },
    { label: "1mg", category: "Low" },
    { label: "2mg", category: "Standard" },
    { label: "3mg", category: "Moderate" },
    { label: "4mg", category: "High" }
  ]
};

// Define the progestogen dosing recommendations for each estrogen dose category.
const progestogenDosing = {
  "Ultra/Low": {
    "Micronised Progesterone continuous": "100mg",
    "Micronised Progesterone sequential": "200mg",
    "Medroxy progesterone continuous": "2.5mg",
    "Medroxy progesterone sequential": "10mg",
    "Norethisterone continuous": "5mg",
    "Norethisterone sequential": "5mg",
    "Mirena": "One device (for up to 5 yrs – record fitting date on script)"
  },
  "Standard": {
    "Micronised Progesterone continuous": "100mg",
    "Micronised Progesterone sequential": "200mg",
    "Medroxy progesterone continuous": "2.5-5mg",
    "Medroxy progesterone sequential": "10mg",
    "Norethisterone continuous": "5mg",
    "Norethisterone sequential": "5mg",
    "Mirena": "One device (for up to 5 yrs – record fitting date on script)"
  },
  "Moderate": {
    "Micronised Progesterone continuous": "100mg",
    "Micronised Progesterone sequential": "200mg",
    "Medroxy progesterone continuous": "5mg",
    "Medroxy progesterone sequential": "10mg",
    "Norethisterone continuous": "5mg",
    "Norethisterone sequential": "5mg",
    "Mirena": "One device (for up to 5 yrs – record fitting date on script)"
  },
  "High": {
    "Micronised Progesterone continuous": "200mg",
    "Micronised Progesterone sequential": "300mg",
    "Medroxy progesterone continuous": "10mg",
    "Medroxy progesterone sequential": "20mg",
    "Norethisterone continuous": "5mg",
    "Norethisterone sequential": "5mg",
    "Mirena": "One device (for up to 5 yrs – record fitting date on script)"
  }
};

function HRTProgestogenDoseSelector() {
  // State for HRT selection and dose.
  const [selectedHRT, setSelectedHRT] = useState(""); // e.g., "Oestrogel"
  const [selectedDose, setSelectedDose] = useState(""); // e.g., "½ pump"
  // State for progestogen selection.
  const [selectedProgestogen, setSelectedProgestogen] = useState("");
  // for tablestable display
  const [showHRTTable, setShowHRTTable] = useState(false);
const [showProgestogenTable, setShowProgestogenTable] = useState(false);

  // Determine the oestrogen dose category based on the HRT product and the chosen dose.
  // If "Low" is selected, we treat it as "Ultra/Low" for progestogen dosing.
  let estrogenCategory = "";
let lookupCategory = "";
if (selectedHRT && selectedDose) {
  const option = hrtOptions[selectedHRT].find(o => o.label === selectedDose);
  if (option) {
    // Save the original category for display
    estrogenCategory = option.category;
    // For lookup in the progestogen table, map both "Ultra-Low" and "Low" to "Ultra/Low"
    if (option.category === "Ultra-Low" || option.category === "Low") {
      lookupCategory = "Ultra/Low";
    } else {
      lookupCategory = option.category;
    }
  }
}

  // If both estrogen category and a progestogen option are selected, look up the recommended dose.
  let progestogenOutput = "";
  if (estrogenCategory && selectedProgestogen) {
    const dosingInfo = progestogenDosing[lookupCategory];
    if (dosingInfo && dosingInfo[selectedProgestogen]) {
      progestogenOutput = `Lookup table suggests dose for ${selectedProgestogen} is ${dosingInfo[selectedProgestogen]}.`;
    }
  }

  // Reset function to clear selections.
  const handleReset = () => {
    setSelectedHRT("");
    setSelectedDose("");
    setSelectedProgestogen("");
  };

  return (
    <div className="tool">
      <h2>HRT Progestogen Dose Lookup Tool</h2>
      <DisclaimerReminder />
      <p style={{ color: 'grey' }}>The ouptut will automatically be displayed in blue when all the required information has been provided. </p>
      
      <div>
        <h3>Step 1: Select the Prescribed Oestrogen only HRT and Dose</h3>
        <label>
          HRT Type:
          <select 
            value={selectedHRT} 
            onChange={(e) => { setSelectedHRT(e.target.value); setSelectedDose(""); }}
          >
            <option value="">--Select HRT--</option>
            {Object.keys(hrtOptions).map(hrt => (
              <option key={hrt} value={hrt}>{hrt}</option>
            ))}
          </select>
        </label>
        {selectedHRT && (
          <label style={{ marginLeft: "1rem" }}>
            Dose:
            <select 
              value={selectedDose} 
              onChange={(e) => setSelectedDose(e.target.value)}
            >
              <option value="">--Select Dose--</option>
              {hrtOptions[selectedHRT].map(opt => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {selectedHRT && selectedDose && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            Based on your selection, the ostrogen dose category is: <strong>{estrogenCategory}</strong>
          </p>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3>Step 2: Select the Progestogen Option</h3>
        <label>
          Progestogen:
          <select 
            value={selectedProgestogen} 
            onChange={(e) => setSelectedProgestogen(e.target.value)}
          >
            <option value="">--Select Progestogen--</option>
            <option value="Micronised Progesterone continuous">Micronised Progesterone continuous</option>
            <option value="Micronised Progesterone sequential">Micronised Progesterone sequential</option>
            <option value="Medroxy progesterone continuous">Medroxy progesterone continuous</option>
            <option value="Medroxy progesterone sequential">Medroxy progesterone sequential</option>
            <option value="Norethisterone continuous">Norethisterone continuous</option>
            <option value="Norethisterone sequential">Norethisterone sequential</option>
            <option value="Mirena">Mirena</option>
          </select>
        </label>
      </div>

      {progestogenOutput && (
  <>
    <div style={{ marginTop: "1rem", color: "blue", fontWeight: "bold" }}>
      <p>{progestogenOutput}</p>
    </div>

<div style={{ marginTop: "1rem" }}>
  <p>
            <strong>Notes:</strong> The look up tables used by this tool are from the&nbsp;
            <a
              href="https://thebms.org.uk/publications/bms-guidelines/management-of-unscheduled-bleeding-on-hormone-replacement-therapy-hrt/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
             British Menopause Society (BMS) guideline on management of unscheduled bleeding on HRT (April 2024).
            </a>
            &nbsp;The tables are viewable through the links below.
          </p>
          </div>

    {/* Expandable HRT Table */}
    <div style={{ marginTop: "2rem" }}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowHRTTable(!showHRTTable);
        }}
        style={{ textDecoration: "underline", color: "blue" }}
      >
        {showHRTTable ? "Hide BMS table classifying oestrogen doses" : "View BMS table classifying oestrogen doses"}
      </a>
      {showHRTTable && (
        <img
          src="/images/hrt-table.jpg"
          alt="View BMS table classifying oestrogen doses"
          style={{ width: "100%", marginTop: "1rem" }}
        />
      )}
    </div>

    {/* Expandable Progestogen Table */}
    <div style={{ marginTop: "1rem" }}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowProgestogenTable(!showProgestogenTable);
        }}
        style={{ textDecoration: "underline", color: "blue" }}
      >
        {showProgestogenTable ? "Hide BMS table outlining the progestogen dose" : "View BMS table outlining the progestogen dose"}
      </a>
      {showProgestogenTable && (
        <img
          src="/images/progestogen-table.jpg"
          alt="View BMS table outlining the progestogen dose"
          style={{ width: "100%", marginTop: "1rem" }}
        />
      )}
    </div>
  </>
)}

      <button onClick={handleReset} style={{ marginTop: "1rem" }}>Reset</button>
      <FeedbackLink toolName="Dosage Calculator Tool" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default HRTProgestogenDoseSelector;

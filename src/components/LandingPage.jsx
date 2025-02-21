import React from 'react';
import './LandingPage.css';

// Define your tools. Adjust the id, name, and description as needed.
const tools = [
  { id: 'dosage', name: 'Dosage Calculator', description: 'Calculate dosage required in mg, ml or number of tablets.' },
  { id: 'bp', name: 'Blood Pressure Calculator', description: 'Calculate average blood pressure and view chart showing variation.' },
  { id: 'percentageChange', name: 'Percentage Change Calculator', description: 'Has eGFR dropped and you want to know the percentage change to action as per current guidance? Access calculator and guidance here.' },
  { id: 'futureDate', name: 'Future Date Calculator', description: 'Patient needs a repeat blood test in 6 weeks/months etc? Calculate target dates here.' },
  { id: 'quantitySync', name: 'Quantity Synchronisation', description: 'Medication running out at different times? Synchronise medication quantities here.' },
  { id: 'medEndDate', name: 'Medication End Date Calculator', description: 'Wondering if patient is ordering way too early? Use this tool to determine when medication should run out.' },
  { id: 'metricImperial', name: 'Metric Imperial Conversion Calculator', description: 'Convert height and weight between metric and imperial units.' },
  { id: 'insulin', name: 'Insulin Duration Calculator', description: 'Determine insulin supply expected duration.' },
  { id: 'oestrogel', name: 'Oestrogel Duration Calculator', description: 'Determine Oestrogel supply expected duration.' },  
  { id: 'tinzaparin', name: 'Tinzaparin Dosing Tool', description: 'Calculate Tinzaparin treament dose based on weight.' },
  { id: 'nonHdl', name: 'Non-HDL Cholesterol Calculator', description: 'Calculate 40% non-HDL cholesterol targets and actual reduction.' },
  { id: 'usefulWebsites', name: 'Useful Websites', description: 'Access useful online resources.' },
];

function LandingPage({ onSelectTool }) {
  // Called when user selects a tool from the dropdown
  const handleSelectChange = (e) => {
    const selectedToolId = e.target.value;
    if (selectedToolId !== '') {
      onSelectTool(selectedToolId);
    }
  };

  return (
    <div>
      <header className="sticky-header">
        <h1  >Ashfields Pharmacy Team Toolkit</h1>
        <select onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>
            Select a tool...
          </option>
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
      </header>
      <main className="card-container">
        {tools.map((tool) => (
          <div key={tool.id} className="tool-card" onClick={() => onSelectTool(tool.id)}>
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </div>
        ))}
      </main>
      <footer>
        <p>This application is currently under development and testing -please use with caution. Contact: caroline@toolsforpharmacists.com </p>
      </footer>
    </div>
  );
}

export default LandingPage;

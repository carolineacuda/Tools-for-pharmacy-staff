import React from 'react';
import Select from 'react-select';
import './LandingPage.css';

// Define your tools. Adjust the id, name, and description as needed.
const tools = [
  { id: 'dosage', name: 'Dosage Calculator', description: "Calculate the appropriate medication dosage based on an individual's weight, expressed in either milliliters (ml) or the number of tablets." },
  { id: 'bp', name: 'Blood Pressure Average Calculator', description: 'Calculate the average home blood pressure reading and display a chart that illustrates the variation over time.' },
  { id: 'percentageChange', name: 'Percentage Change Calculator', description: 'Determine the percentage drop or increase in a lab result eg eGFR and action according to current guidelines.' },
  { id: 'futureDate', name: 'Future Date Calculator', description: 'Patient needs a repeat blood test in 6 weeks/months etc? Calculate target dates here.' },
  { id: 'HRTProgestogen', name: 'HRT Progestogen Dose Lookup', description: 'Displays progestogen dose that appears to provide adequate endometrial protection for different strengths of licensed oestrogen doses as per BMS guidancee (April 2024).' },
  { id: 'quantitySync', name: 'Quantity Synchronisation', description: 'Medication running out at different times? Use this calculator to determine the number of tablets required to bring them all in line.' },
  { id: 'medEndDate', name: 'Medication End Date Calculator', description: 'Concerned that a patient is ordering medication too early? Use this tool to calculate the correct medication run-out date.' },
  { id: 'metricImperial', name: 'Metric Imperial Conversion Calculator', description: 'Convert height and weight between metric and imperial units.' },
  { id: 'insulin', name: 'Insulin Duration Calculator', description: 'Calculate the number of days an insulin supply will last based on daily unit usage and the total quantity provided.' },
  { id: 'oestrogel', name: 'Oestrogel Duration Calculator', description: 'Calculate the number of days a supply of Oestrogel will last based on number of pumps to be used and the total quantity provided.' },  
  { id: 'opioidConversion', name: 'Opioid Conversion Calculator', description: 'This tool converts opioid doses to morphine-equivalent doses and vice versa' },
  { id: 'tinzaparin', name: 'Tinzaparin Dosing Tool', description: 'Calculate Tinzaparin treament dose based on weight.' },
  { id: 'nonHdl', name: 'Non-HDL Cholesterol Calculator', description: 'For primary prevention, NICE recommends reducing non-HDL cholesterol by more than 40%. Use this tool to calculate the target level' },
  { id: 'EyeDropDuration', name: 'Eye Drop Duration Calculator', description: 'This tool allows a user to estimate how long a supply of eye drops will last.' },
  { id: 'usefulWebsites', name: 'Useful Websites', description: 'Access useful online resources.' },
];

// Convert tools into options for react-select
const toolOptions = tools.map((tool) => ({
  value: tool.id,
  label: tool.name,
}));

// Custom styles for react-select to adjust the padding and menu list styling. Adjust as needed. 
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: "4px 8px", // adjust the top/bottom and left/right padding as needed
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
};


function LandingPage({ onSelectTool }) {
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      onSelectTool(selectedOption.value);
    }
  };

  return (
    <div>
      <header className="sticky-header">
        <h1>General Practice Pharmacy Team Toolkit</h1>
        <div style={{ width: "250px" }}>
          <Select 
             options={toolOptions}
             onChange={handleSelectChange}
             placeholder="Select a tool..."
             styles={customStyles}
          />
        </div>
      </header>
      <main className="card-container">
        {tools.map((tool) => (
          <div key={tool.id} className="tool-card" onClick={() => onSelectTool(tool.id)}>
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </div>
        ))}
      </main>
      <footer  style={{color: 'gray' }}>
        <p>This application is currently under development and testing. Please use with caution. Contact: caroline@toolsforpharmacists.com </p>
      </footer>
    </div>
  );
}

export default LandingPage;

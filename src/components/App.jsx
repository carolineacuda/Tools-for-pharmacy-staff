import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './LandingPage';
import BloodPressureCalculator from './BloodPressureCalculator';
import DosageCalculator from './DosageCalculator';
import FutureDateCalculator from './FutureDateCalculator';
import InsulinCalculator from './InsulinCalculator';
import PercentageChangeCalculator from './PercentageChangeCalculator';
import QuantitySyncCalculator from './QuantitySyncCalculator';
import UsefulWebsites from './UsefulWebsites';
import MedicationEndDateCalculator from './MedicationEndDateCalculator';
import NonHdlCholesterolCalculator from './NonHdlCholesterolCalculator';
import MetricImperialConversion from './MetricImperialConversion';
import TinzaparinDosingTool from './TinzaparinDosingTool';
import OpioidConversionCalculator from './OpioidConversionCalculator';
import OestrogelCalculator from './OestrogelCalculator';
import HRTProgestogenDoseSelector from './HRTProgestogenDoseSelector';
import EyeDropDurationCalculator from './EyeDropDurationCalculator';
//import ScrollToTop from './ScrollToTop';

/* ====================================================
   Main App Component
   ==================================================== 
   The App component brings together all the individual tool components.
*/
function App() {

  const [selectedTool, setSelectedTool] = useState(null);

  const handleSelectTool = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleCloseTool = () => {
    setSelectedTool(null);
  };

  return (
    <div>
      {!selectedTool ? (
        <LandingPage onSelectTool={handleSelectTool} />
      ) : (
        <div>
          {/* Render the selected tool component. You might use a switch or dynamic import. */}
          <button onClick={handleCloseTool}>Back to Home</button>
          {selectedTool === 'dosage' && <DosageCalculator />}
          {selectedTool === 'bp' && <BloodPressureCalculator />}
          {selectedTool === 'percentageChange' && <PercentageChangeCalculator />}
          {selectedTool === 'insulin' && <InsulinCalculator />}
          {selectedTool === 'futureDate' && <FutureDateCalculator />}
          {selectedTool === 'quantitySync' && <QuantitySyncCalculator />}          
          {selectedTool === 'medEndDate' && <MedicationEndDateCalculator />}
          {selectedTool === 'nonHdl' && <NonHdlCholesterolCalculator />} 
          {selectedTool ==='metricImperial' && <MetricImperialConversion />}
          {selectedTool === 'tinzaparin' && <TinzaparinDosingTool />}
          {selectedTool === 'opioidConversion' && <OpioidConversionCalculator />}
          {selectedTool === 'oestrogel' && <OestrogelCalculator />}
          {selectedTool === 'HRTProgestogen' && <HRTProgestogenDoseSelector />}
          {selectedTool === 'EyeDropDuration' && <EyeDropDurationCalculator />}
          {selectedTool === 'usefulWebsites' && <UsefulWebsites />}
        <footer>This application is currently under development and testing. Please use with caution. Contact: caroline@toolsforpharmacists.com</footer>
        
         {/* ... add your other tools */}
         </div>
      )}
    </div>
  );
}


export default App;

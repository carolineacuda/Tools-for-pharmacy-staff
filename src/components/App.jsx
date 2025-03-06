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
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);



  const handleAcceptDisclaimer = () => {
    setDisclaimerAccepted(true);
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  // If disclaimer not accepted, render the disclaimer modal.
  if (!disclaimerAccepted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <div style={{
          background: '#fff',
          color: '#000',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <h2>Disclaimer</h2>
          <p>
            This application is NOT a medical device and is provided solely for general informational and educational purposes. 
            The tools, calculations, and information contained within are not intended to replace professional clinical judgement or individualised patient care. 
            While we strive to maintain accuracy and keep content current, we offer no guarantee or warranty, express or implied, regarding the completeness, accuracy, 
            reliability, or suitability of the information presented. Users must independently verify all information and calculations before relying upon them for clinical decision-making. The creator of this application and associated parties accept no responsibility or liability for any loss, harm, or damage arising from, or connected with,
            the use or reliance on this application. Any reliance placed upon the information provided by this application is strictly at your own risk
          </p>
          <button onClick={handleAcceptDisclaimer} style={{ marginTop: '1rem', padding: '10px 20px' }}>
            ACCEPT & CONTINUE
          </button>
        </div>
      </div>
    );
  }

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
        <footer > <strong style={{ color: 'red' }}>DISCLAIMER:</strong> This application is NOT a medical device and is provided solely for general informational and educational purposes. The tools, calculations, and information contained within are not intended to replace professional clinical judgement or individualised patient care. While we strive to maintain accuracy and keep content current, we offer no guarantee or warranty, express or implied, regarding the completeness, accuracy, reliability, or suitability of the information presented. Users must independently verify all information and calculations before relying upon them for clinical decision-making. The creator of this application and associated parties accept no responsibility or liability for any loss, harm, or damage arising from, or connected with, the use or reliance on this application. Any reliance placed upon the information provided by this application is strictly at your own risk
</footer>
        
         {/* ... add your other tools */}
         </div>
      )}
    </div>
  );
}


export default App;

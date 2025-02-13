import React from 'react'; 
import BloodPressureCalculator from './BloodPressureCalculator';
import DosageCalculator from './DosageCalculator';
import Footer from './Footer';
import FutureDateCalculator from './FutureDateCalculator';
import Header from './Header';
import InsulinCalculator from './InsulinCalculator';
import PercentageChangeCalculator from './PercentageChangeCalculator';
import QuantitySyncCalculator from './QuantitySyncCalculator';
import UsefulWebsites from './UsefulWebsites';

/* ====================================================
   Main App Component
   ==================================================== 
   The App component brings together all the individual tool components.
*/
function App() {
  return (
    <div className="App">
      <Header />
      
      <main>
        <DosageCalculator />
        <QuantitySyncCalculator />
        <PercentageChangeCalculator />
        <InsulinCalculator />
        <FutureDateCalculator />
        <BloodPressureCalculator />
        <UsefulWebsites />
        
        

      </main>
      <Footer />
    </div>
  );
}

export default App;

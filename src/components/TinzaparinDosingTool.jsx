import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

function TinzaparinDosingTool() {
 // TODO: Implement Tinzaparin dosing tool logic here 
 const [egfrCategory, setEgfrCategory] = useState('≥20'); // '≥20' or '<20'
 const [weight, setWeight] = useState('');

 // Helper to parse float or return null if invalid
 const parseFloatOrNull = (val) => {
   const parsed = parseFloat(val);
   return isNaN(parsed) ? null : parsed;
 };

 // Decide what to display
 let resultMessage = '';
 let clarificationMessage = '';
 const parsedWeight = parseFloatOrNull(weight);

 if (parsedWeight !== null && parsedWeight > 0) {
   // 1) Determine units/kg based on eGFR
   const unitsPerKg = egfrCategory === '≥20' ? 175 : 125;

   // 2) Raw dose = unitsPerKg * weight
   const rawDose = unitsPerKg * parsedWeight; // e.g. 60 * 175 = 10500

   // 3) Round to the nearest 1,000 IU
   //    e.g. 10500 => 11000, 10325 => 10000
   const roundedDose = 1000 * Math.round(rawDose / 1000);

   // 4) Convert to ml using 20,000 units/ml
   //    e.g. 11000 units => 11000 / 20000 = 0.55 ml
   const volume = roundedDose / 20000;

   // Format output
   resultMessage = `Recommended Tinzaparin dose: approx. ${roundedDose.toLocaleString()} units (≈ ${volume.toFixed(
     2
   )} ml) once daily using a 20,000 units per ml pre-filled syringe.`;

   clarificationMessage = ` Doses are administered in 1,000 IU increments facilitated by the 0.05 ml graduations on the syringes. 
   The calculated dose, based on the patient's body weight, is therefore rounded up or down as appropriate`;
 }

 // Reset function
 const handleReset = () => {
   setEgfrCategory('≥20');
   setWeight('');
 };

 return (
   <div className="tool">
     <h2>Tinzaparin Treatment Dosing Tool</h2>

     {/* eGFR Category Radio Buttons */}
     <div style={{ marginBottom: '1rem' }}>
       <label style={{ marginRight: '1rem' }}>
         <input
           type="radio"
           name="egfr"
           value="≥20"
           checked={egfrCategory === '≥20'}
           onChange={() => setEgfrCategory('≥20')}
         />
         Creatinine clearance ≥ 30 ml/min
       </label>
       {
       //option for the <20 category not implemented yet -reviewing if this is appropriate for a primary care Tinzaparin dosing tool
       /* <label>
         <input
           type="radio"
           name="egfr"
           value="<20"
           checked={egfrCategory === '<20'}
           onChange={() => setEgfrCategory('<20')}
         />
         eGFR &lt; 20 ml/min
       </label> */}
     </div>

     {/* Weight Input */}
     <div style={{ marginBottom: '1rem' }}>
       <label style={{ display: 'block', marginBottom: '0.3rem' }}>
         Patient Weight (kg)
       </label>
       <input
         type="number"
         value={weight}
         onChange={(e) => setWeight(e.target.value)}
         style={{ width: '100px' }}
       />
     </div>

     {/* Dynamic Output */}
     {resultMessage && (
       <p style={{ color: 'blue', fontWeight: 'bold' }}>
         {resultMessage}
       </p>
       
     )}
   

     {/* Link to full guidance */}
     <p style={{ marginTop: '1rem' }}>
       <a
         href="https://www.medicines.org.uk/emc/product/13835/smpc"
         target="_blank"
         rel="noopener noreferrer"
         style={{ textDecoration: 'underline', color: 'blue' }}
       >
         Tinzaparin SPC
       </a>
     </p>

     {/* Clarification Message */}
     {clarificationMessage && (
       <p style={{ marginTop: '1rem', color: 'gray' }}>
         {clarificationMessage}
       </p>
     )}
     {/* Reset Button */}
     <button onClick={handleReset}>Reset</button>
     <FeedbackLink toolName="Tinzaparin Dosing Tool" emailAddress="caroline@toolsforpharmacists.com" />  
   </div>
 );
 
    

}

export default TinzaparinDosingTool;

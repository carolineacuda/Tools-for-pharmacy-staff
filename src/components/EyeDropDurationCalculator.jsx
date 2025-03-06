import React, { useState } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";
import DisclaimerReminder from "./DisclaimerReminder.jsx";

function EyeDropDurationCalculator() {
  // State for general inputs.
  const [bottles, setBottles] = useState(""); // number of bottles supplied
  const [bottleInputType, setBottleInputType] = useState("volume"); // "volume" or "drops"
  
  // For "volume" mode:
  const [bottleVolume, setBottleVolume] = useState(""); // volume of each bottle (ml)
  const [dropVolume, setDropVolume] = useState("0.05"); // ml per drop (default 0.05)
  
  // For "drops" mode:
  const [dropsPerBottle, setDropsPerBottle] = useState(""); // number of drops per bottle

  // Daily usage:
  const [dailyDrops, setDailyDrops] = useState(""); // number of drops used per day per eye
  const [eyeUsage, setEyeUsage] = useState("one"); // "one" or "both"

  // Optional prescription date section:
  const [usePrescriptionDate, setUsePrescriptionDate] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState("");

  // Helper: safely parse a number.
  const parseNum = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  };

  // Calculate the total number of drops in the supply.
  let totalDrops = null;
  const numBottles = parseNum(bottles);
  if (numBottles !== null && numBottles > 0) {
    if (bottleInputType === "volume") {
      const vol = parseNum(bottleVolume);
      const dVol = parseNum(dropVolume);
      if (vol !== null && vol > 0 && dVol !== null && dVol > 0) {
        totalDrops = numBottles * (vol / dVol);
      }
    } else if (bottleInputType === "drops") {
      const drops = parseNum(dropsPerBottle);
      if (drops !== null && drops > 0) {
        totalDrops = numBottles * drops;
      }
    }
  }

  // Calculate daily usage.
  let dailyUsage = null;
  const perEyeDrops = parseNum(dailyDrops);
  if (perEyeDrops !== null && perEyeDrops > 0) {
    dailyUsage = perEyeDrops * (eyeUsage === "both" ? 2 : 1);
  }

  // Calculate how many days the supply will last.
  let daysSupply = null;
  if (totalDrops !== null && dailyUsage !== null && dailyUsage > 0) {
    daysSupply = totalDrops / dailyUsage;
  }

  const resultMessage =
    daysSupply !== null
      ? `Your supply will last approximately ${daysSupply.toFixed(1)} days.`
      : "";

  // Calculate run-out date if prescription date is provided.
  let runOutDateMessage = "";
  if (usePrescriptionDate && prescriptionDate && daysSupply !== null) {
    const prescDate = new Date(prescriptionDate);
    prescDate.setDate(prescDate.getDate() + Math.floor(daysSupply));
    runOutDateMessage = `Based on the prescription date, the medication should run out on ${prescDate.toLocaleDateString()}.`;
  }

  // Reset function to clear all inputs.
  const handleReset = () => {
    setBottles("");
    setBottleInputType("volume");
    setBottleVolume("");
    setDropsPerBottle("");
    setDropVolume("0.05");
    setDailyDrops("");
    setEyeUsage("one");
    setUsePrescriptionDate(false);
    setPrescriptionDate("");
  };

  return (
    <div className="tool">
      <h2>Eye Drop Duration Calculator</h2>
      <DisclaimerReminder />
      <p style={{ color: 'grey' }}>The ouptut will automatically be displayed in blue when all the required information has been provided. </p>
      {/* Number of bottles */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Number of bottles supplied:
        </label>
        <input
          type="number"
          value={bottles}
          onChange={(e) => setBottles(e.target.value)}
          style={{ width: "100px" }}
          placeholder="e.g. 2"
        />
      </div>

      {/* Choose input type for bottle information */}
      <div style={{ marginBottom: "1rem" }}>
        <p>Enter bottle details:</p>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            name="bottleType"
            value="volume"
            checked={bottleInputType === "volume"}
            onChange={() => setBottleInputType("volume")}
          />
          Volume per bottle (ml)
        </label>
        <label>
          <input
            type="radio"
            name="bottleType"
            value="drops"
            checked={bottleInputType === "drops"}
            onChange={() => setBottleInputType("drops")}
          />
          Drops per bottle
        </label>
      </div>

      {/* If volume mode, show volume and drop volume fields */}
      {bottleInputType === "volume" && (
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.3rem" }}>
              Volume of each bottle (ml):
            </label>
            <input
              type="number"
              value={bottleVolume}
              onChange={(e) => setBottleVolume(e.target.value)}
              style={{ width: "100px" }}
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.3rem" }}>
              Volume per drop (ml):
            </label>
            <input
              type="number"
              value={dropVolume}
              onChange={(e) => setDropVolume(e.target.value)}
              style={{ width: "100px" }}
              placeholder="Default: 0.05"
            />
          </div>
        </div>
      )}

      {/* If drops mode, show drops per bottle field */}
      {bottleInputType === "drops" && (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>
            Number of drops per bottle:
          </label>
          <input
            type="number"
            value={dropsPerBottle}
            onChange={(e) => setDropsPerBottle(e.target.value)}
            style={{ width: "100px" }}
            placeholder="e.g. 200"
          />
        </div>
      )}

      {/* Daily usage */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Number of drops used per day (per eye):
        </label>
        <input
          type="number"
          value={dailyDrops}
          onChange={(e) => setDailyDrops(e.target.value)}
          style={{ width: "100px" }}
          placeholder="e.g. 3"
        />
      </div>

      {/* Eye usage selection */}
      <div style={{ marginBottom: "1rem" }}>
        <p>Usage:</p>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            name="eyeUsage"
            value="one"
            checked={eyeUsage === "one"}
            onChange={() => setEyeUsage("one")}
          />
          One eye
        </label>
        <label>
          <input
            type="radio"
            name="eyeUsage"
            value="both"
            checked={eyeUsage === "both"}
            onChange={() => setEyeUsage("both")}
          />
          Both eyes
        </label>
      </div>

      {/* Display main result */}
      {resultMessage && (
        <p style={{ color: "blue", fontWeight: "bold" }}>{resultMessage}</p>
      )}

      {/* Optional Prescription Date Section (only for duration mode) */}
      {daysSupply !== null && (
        <div style={{ marginTop: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={usePrescriptionDate}
              onChange={(e) => setUsePrescriptionDate(e.target.checked)}
            />
            &nbsp;Select here if you want to specify a prescription issue date to work out when the supply should run out.
          </label>
          {usePrescriptionDate && (
            <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              <label>
                Prescription Date:&nbsp;
                <input
                  type="date"
                  value={prescriptionDate}
                  onChange={(e) => setPrescriptionDate(e.target.value)}
                />
              </label>
            </div>
          )}
          {runOutDateMessage && (
            <p style={{ color: "blue", fontWeight: "bold" }}>
              {runOutDateMessage}
            </p>
          )}
        </div>
      )}

      {/* Reset button */}
      <button onClick={handleReset}>Reset</button>
      <FeedbackLink toolName="Eye Drop Duration Calculator" emailAddress="caroline@toolsforpharmacists.com" />
    </div>
  );
}

export default EyeDropDurationCalculator;
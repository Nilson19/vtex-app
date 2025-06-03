import React, { createContext, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";

export const GenderContext = createContext();

const CSS_HANDLES = [
  "genderPanel",
  "genderPanelTabsContainer",
  "genderPanelButton",
  "genderPanelButtonLeft",
  "genderPanelButtonCenter",
  "genderPanelButtonRight",
];

const GenderPanel = ({ children }) => {
  const handles = useCssHandles(CSS_HANDLES);
  const [selectedGender, setSelectedGender] = useState("female");

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };
  


  return (
    <GenderContext.Provider value={{ selectedGender }}>
      <div className={handles.genderPanel}>
        <div className={handles.genderPanelTabsContainer}>
          <button
            className={`${handles.genderPanelButton} ${
              handles.genderPanelButtonLeft
            } ${selectedGender === "male" ? "active" : ""}`}
            onClick={() => handleGenderChange("male")}
            aria-selected={selectedGender === "male"}
            role="tab"
          >
            Hombre
          </button>
          <button
            className={`${handles.genderPanelButton} ${
              handles.genderPanelButtonRight
            } ${selectedGender === "female" ? "active" : ""}`}
            onClick={() => handleGenderChange("female")}
            aria-selected={selectedGender === "female"}
            role="tab"
          >
            Mujer
          </button>
        </div>
        {children}
      </div>
    </GenderContext.Provider>
  );
};

export default GenderPanel;

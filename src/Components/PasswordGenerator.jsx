import React, {
  useState,
  useContext,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import "./styles.css";
import { generateSecureString } from "./passwordGenLogic";
import { ThemeContext } from "../App";

const PasswordGenerator = forwardRef(({ baseStringRef }) => {
  const [inputText, setInputText] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("Dh@nu5h_711");
  const [textlength, setTextLength] = useState(6);
  const [features, setFeatures] = useState({
    includeNumbers: false,
    includeSymbols: false,
  });
  const [message, setMessage] = useState("");
  const { themeState, ToggleTheme } = useContext(ThemeContext);
  const updateInput = (event) => {
    setTextLength(6);
    setFeatures({
      includeNumbers: false,
      includeSymbols: false,
    });
    let text = event.target.value;
    setInputText(text);
  };
  const updateLength = (event) => {
    setInputText("");
    setTextLength(event.target.value);
    generatePassword();
  };
  const generatePassword = () => {
    console.log("generatePassword");
    let newInputText = inputText.toLowerCase().trim().replaceAll(" ", "_");
    console.log(newInputText);
    let newPassWord = generateSecureString(newInputText, textlength, features);
    setGeneratedPassword(newPassWord);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: checked,
    }));
  };
  // const copyHandle = () => {
  //   console.log("fn after each render✅");
  //   navigator.clipboard.writeText(generatedPassword);
  //   setMessage("Password copied✅");
  //   setTimeout(() => setMessage(""), 2000);
  // };
  const copyHandle = useCallback(() => {
    console.log(
      " just try to change state and see no new would be there unless generated password is changed .. so no new fn created at each render✅"
    );
    navigator.clipboard.writeText(generatedPassword);
    setMessage("Password copied✅");
    setTimeout(() => setMessage(""), 2000);
  }, [generatedPassword]);
  return (
    <div className={themeState}>
      <div className="wrapper">
        <div className="headingWrap">
          <h2 style={{ textAlign: "center" }}>🥷🏼Password Generator🔑</h2>
          <button className={themeState} onClick={() => ToggleTheme()}>
            {themeState === "light" ? <>🌙</> : <>🌞</>}
          </button>
        </div>
        <div className="outputClosure">
          Generated Password:
          <div className="outputDiv" onClick={copyHandle}>
            {generatedPassword || ""}
          </div>
        </div>
        <div className="baseStringWrapper">
          Generate password from BaseString:
          <input
            type="text"
            value={inputText}
            onChange={updateInput}
            placeholder="Enter Reference Word"
            maxLength="20"
            ref={baseStringRef}
          />
          <div className="btnWrapper">
            <button onClick={() => generatePassword()}>Generate✨</button>
            <button
              style={{ backgroundColor: "blueviolet" }}
              onClick={() => copyHandle()}
            >
              Copy🗒️
            </button>
          </div>
          <div
            style={
              message
                ? { display: "block", textAlign: "center", height: "10px" }
                : { visibility: "hidden", height: "10px" }
            }
          >
            {message}
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="randomStringWrapper">
          Generate Random password of Length({textlength}):
          <div>
            <input
              type="range"
              value={textlength}
              min="6"
              max="20"
              step="1"
              onChange={updateLength}
            />
          </div>
          <div className="optionsWrapper">
            <div>
              <input
                type="checkbox"
                name="includeNumbers"
                checked={features.includeNumbers}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="includeSymbols"
                checked={features.includeSymbols}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="includeSymbols">Include Special Characters</label>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>Made with ❤️ by Dhanush Holla</div>
      </div>
    </div>
  );
});

export default PasswordGenerator;

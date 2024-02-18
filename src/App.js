import React, { useState, useRef } from "react";
import "./style.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const passwordRef = useRef(null);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-=_+";

    let chars = "";
    if (includeLowercase) chars += lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Password Generator</h2>
      <div className="result-container">
        <input
          type="text"
          id="result"
          value={password}
          ref={passwordRef}
          readOnly
        />
        <button className="copy-result" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
      <div className="settings">
        <div className="input-group">
          <label>Password length (4-20)</label>
          <input
            type="range"
            id="length"
            min="4"
            max="20"
            step="1"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span id="length-result">{length}</span>
        </div>
        <div className="flex w-100">
        <div className="input-group w-50">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Numbers
          </label>
        </div>
        <div className="input-group w-50">
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Symbols
          </label>
        </div>
        </div>
        <div className="flex w-100">
        <div className="input-group w-50">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Uppercase
          </label>
        </div>
        <div className="input-group w-50">
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Lowercase
          </label>
        </div>
      </div>
      </div>
      <button className="generate-btn" onClick={generatePassword}>
        Generate
      </button>
    </div>
  );
}

export default App;

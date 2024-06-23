import { useState, useCallback, useEffect, useRef } from "react";

export default function Generatepassword() {
  const [Lenght, setLenght] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [passCopied, setpassCopied] = useState("Copy");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABDCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumbers) str += "0123456789";
    if (useSymbols) str += "*@_/!#$%^&*()+=";
    for (let i = 1; i < Lenght; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [Lenght, allowNumbers, useSymbols]);

  const passRef = useRef(null);
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current.select();
    setpassCopied("Copied");
  };

  useEffect(() => {
    generatePassword();
  }, [Lenght, allowNumbers, generatePassword, useSymbols]);

  return (
    <article className="generate--passwordBox">
      <h1>Generate a Password</h1>
      <div className="password-box">
        <input
          type="text"
          name="Gpass"
          id="Gpass"
          value={password}
          placeholder="password"
          readOnly
          ref={passRef}
        />
        <button
          type="button"
          className=" duration-200 bg-teal-50"
          onClick={copyPassword}>
          {passCopied}
        </button>
      </div>
      <div className="input--container">
        <div>
          <label htmlFor="Passwordlenght">{Lenght}</label>
          <input
            type="range"
            max={12}
            min={8}
            defaultValue={8}
            id="Passwordlenght"
            onChange={(e) => {
              setLenght(e.target.value);
              setpassCopied("Copy");
            }}
          />
        </div>
        <div>
          <label htmlFor="includeNumber">Include Number</label>
          <input
            type="checkbox"
            name="includeNumber"
            id="includeNumber"
            defaultChecked={allowNumbers}
            onChange={() => {
              setAllowNumbers((prev) => !prev);
            }}
          />
        </div>
        <div>
          <label htmlFor="includeSymbols">Include Symbols</label>
          <input
            type="checkbox"
            name="includeNumber"
            id="includeNumber"
            defaultChecked={useSymbols}
            onChange={() => {
              setUseSymbols((prev) => !prev);
            }}
          />
        </div>
      </div>
    </article>
  );
}

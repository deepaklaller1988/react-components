import React, { useState, useEffect } from "react";
import translate from "translate";

const language = [
  {
    lang: "English",
    code: "en",
  },
  {
    lang: "Arabic",
    code: "ar",
  },
  {
    lang: "Chinese",
    code: "zh",
  },
  {
    lang: "Spanish",
    code: "es",
  },
];

function Translate() {
  const [input, setInput] = useState();
  const [selectedLang, setSelectedLang] = useState();
  const [resultedString, setResultedString] = useState();

  useEffect(() => {
    translate.engine = "deepl";
    translate.key = process.env.DEEPL_KEY;
  }, []);

  const translateWord = async () => {
    const translated_string = await translate(input, selectedLang);
    setResultedString(translated_string);
  };

  return (
    <div>
      <div>
        <select
          onChange={(e) => {
            setSelectedLang(e.target.value);
          }}
        >
          <option>Please choose language</option>
          {language.map((option, index) => {
            return <option key={index}>{option.lang}</option>;
          })}
        </select>
      </div>
      <label>Enter input: </label>
      <br />
      <textarea
        rows="4"
        cols="50"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <input type="button" value="Translate" onClick={translateWord} />
      {resultedString && <div>{resultedString}</div>}
    </div>
  );
}

export default Translate;

import React from "react";

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      style={{ padding: 8, marginBottom: "1rem", width: "100%" }}
    >
      <option value="en-US">English</option>
      <option value="hi-IN">Hindi</option>
      <option value="mr-IN">Marathi</option>
      <option value="fr-FR">French</option>
      {/* ✅ Add more languages supported by TMDB API */}
    </select>
  );
};

export default LanguageSelector;

const languages = [
        "English", "Hindi (हिन्दी)", "Bengali (বাংলা)", "Telugu (తెలుగు)",
        "Marathi (मराठी)", "Tamil (தமிழ்)", "Gujarati (ગુજરાતી)",
        "Malayalam (മലയാളം)", "Kannada (ಕನ್ನಡ)", "Punjabi (ਪੰਜਾਬੀ)", "Urdu (اُردُو)"
    ];

const LanguageSelect = ({ language, setLanguage }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">Output Language</label>
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="mt-1 w-full p-2 border rounded-md"
    >
      {languages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  </div>
);

export default LanguageSelect;

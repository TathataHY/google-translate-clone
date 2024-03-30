const LanguageSelector = ({
  value,
  onChange,
  languages,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: { code: string; name: string }[];
}) => {
  return (
    <div>
      <select value={value} onChange={onChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

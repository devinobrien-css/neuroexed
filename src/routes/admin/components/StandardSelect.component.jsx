const StandardSelect = ({
  title,
  options,
  selected,
  setSelected,
  className,
}) => {
  return (
    <div className={`${className} justify-between md:flex`}>
      <label className="w-3/12 text-gray-500">{title}</label>
      <select
        defaultValue={selected}
        onSelect={(e) => setSelected(e.target.value)}
        className="w-full border-0 border-gray-300 md:border-l md:pl-2"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StandardSelect;

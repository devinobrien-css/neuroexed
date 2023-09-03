export const Input = ({ register, name, ...rest }) => {
  return (
    <label
      htmlFor={name}
      className={`bg-white justify-between cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="text-xl font-lato text-gray-800">{name}</span>
      <input
        id={name}
        className="w-full border-0 text-md border-gray-300 p-2 font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};

export const Select = ({ register, options, name, ...rest }) => {
  return (
    <label
      htmlFor={name}
      className={`bg-white justify-between cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="text-xl font-lato text-gray-800">{name}</span>
      <select
        id={name}
        className="w-full border-0 text-md border-gray-300 p-2 font-lato"
        {...register(name)}
        {...rest}
      >
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

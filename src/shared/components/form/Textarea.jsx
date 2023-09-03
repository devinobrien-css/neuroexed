export const TextArea = ({ name, register, ...rest }) => {
  return (
    <label
      htmlFor={name}
      className={`bg-white justify-between cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="w-3/12 text-xl font-lato text-gray-800">{name}</span>
      <textarea
        id={name}
        rows={10}
        autoComplete={"false"}
        className="w-full border-0 rounded font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};

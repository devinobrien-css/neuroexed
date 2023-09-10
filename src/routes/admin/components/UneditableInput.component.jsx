const UneditableInput = ({ title, value }) => {
  return (
    <div className="flex justify-between rounded border border-gray-800 bg-gray-100 py-2 text-gray-500">
      <label className="w-3/12 font-bold">{title}</label>
      <p className="w-full border-l pl-2">{value}</p>
    </div>
  );
};

export default UneditableInput;

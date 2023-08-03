const StandardSelect = ({title, options, selected, setSelected, className}) => {
    return (
        <div
            className={`${className} md:flex justify-between`}
        >
            <label
                className="w-3/12 text-gray-500"
            >
                {title}
            </label>
            <select
                defaultValue={selected}
                onSelect={(e) => setSelected(e.target.value)}
                className="w-full border-0 md:border-l border-gray-300 md:pl-2"
            >
                {options.map(option =>  <option value={option}>{option}</option>)}
            </select>
        </div>
    );
};

export default StandardSelect;
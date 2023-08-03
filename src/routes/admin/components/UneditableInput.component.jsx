


const UneditableInput = ({title, value}) => {

    return (
        <div
            className="border rounded flex justify-between bg-gray-100 border-gray-800 text-gray-500 py-2"
        >
            <label
                className="w-3/12 font-bold"
            >
                {title}
            </label>
            <p
                className="w-full border-l pl-2"
            >
                {value}
            </p>
        </div>
    );
};

export default UneditableInput;
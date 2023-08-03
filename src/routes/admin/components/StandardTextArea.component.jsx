


const StandardTextArea = ({title, type="", value, setValue, className}) => {


    return (
        <div
            className={`${className} md:flex justify-between`}
        >
            <label
                className="w-3/12 text-gray-500"
            >
                {title}
            </label>
            <textarea
                id={title}
                name={title}
                value={value}
                autoComplete="false"
                placeholder={'Enter ' + title}
                onChange={(event) => setValue(event.target.value)}
                className="w-full border-0 md:border-gray-300 md:border-l md:pl-2"
            />
        </div>
    );
};

export default StandardTextArea;
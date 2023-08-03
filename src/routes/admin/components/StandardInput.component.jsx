const StandardInput = ({title, type='text', value, setValue, className}) => {
    return (
        <div
            className={`${className} md:flex justify-between`}
        >
            <label
                className="w-3/12 text-gray-500"
            >
                {title}
            </label>
            <input
                id={title}
                name={title}
                value={value}
                type={type}
                autoComplete="false"
                placeholder={'Enter ' + title}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
                className="w-full border-0 md:border-l border-gray-300 md:pl-2"
            />
        </div>
    );
};

export default StandardInput;
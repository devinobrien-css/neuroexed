const ColorButton = ({ color, title, onClick }) => {
  return (
    <button
      className={`bg-${color}-100 border bg-opacity-90 border-${color}-300 text-${color}-500 mx-2 h-min rounded px-2 py-0 text-sm`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default ColorButton;

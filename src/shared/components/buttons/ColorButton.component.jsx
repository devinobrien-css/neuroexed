const ColorButton = ({ color, title, onClick }) => {
  return (
    <button
      className={`bg-${color}-100 bg-opacity-90 border border-${color}-300 text-${color}-500 text-sm px-2 py-0 h-min mx-2 rounded`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default ColorButton;

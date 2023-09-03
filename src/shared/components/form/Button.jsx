export const Button = ({ color, title, ...rest }) => {
  return (
    <button
      className={`bg-${color}-100 shadow hover:bg-${color}-200 transition-colors active:scale-105  bg-opacity-90 border border-${color}-300 text-${color}-500 text-lg px-4 py-1 h-min mx-2 rounded`}
      {...rest}
    >
      {title}
    </button>
  );
};

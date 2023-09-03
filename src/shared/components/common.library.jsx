export const Wrapper = ({ children, className, color = "dark", ...rest }) => {
  return (
    <div
      className={`shadow-std shadow-gray-500 my-4 p-4 rounded-xl ${className} ${
        color === "light"
          ? "bg-light-hex bg-cover bg-center "
          : "bg-hex bg-cover bg-bottom"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SECTION TITLES

*/

export const SectionTitle = ({ children, className, ...rest }) => {
  return (
    <p
      className={`text-4xl md:text-6xl transition-all font-raleway ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
};

export const TitleXl = ({ children, className, ...rest }) => {
  return (
    <p className={`text-4xl font-lato font-light  ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleLg = ({ children, className, ...rest }) => {
  return (
    <p className={`text-3xl font-raleway font-light ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleMd = ({ children, className, ...rest }) => {
  return (
    <p className={`text-2xl font-raleway font-light ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleSm = ({ children, className, ...rest }) => {
  return (
    <p className={`text-lg font-raleway ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const SubTitleMd = ({ children, className, ...rest }) => {
  return (
    <p className={`italic text-2xl ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const SubTitleSm = ({ children, className, ...rest }) => {
  return (
    <p className={`font-lato italic  ${className}`} {...rest}>
      {children}
    </p>
  );
};
export const TextSectionSm = ({ children, className, ...rest }) => {
  return (
    <p className={`text-sm ${className}`} {...rest}>
      {children}
    </p>
  );
};

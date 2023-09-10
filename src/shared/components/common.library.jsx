export const Wrapper = ({ children, className, color = 'dark', ...rest }) => {
  return (
    <div
      className={`my-4 rounded-xl p-4 shadow-std shadow-gray-500 ${className} ${
        color === 'light'
          ? 'bg-light-hex bg-cover bg-center '
          : 'bg-hex bg-cover bg-bottom'
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

export const SectionTitle = ({ children, className = '', ...rest }) => {
  return (
    <p
      className={`font-raleway text-4xl transition-all md:text-6xl ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
};

export const TitleXl = ({ children, className = '', ...rest }) => {
  return (
    <p className={`font-lato text-4xl font-light  ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleLg = ({ children, className = '', ...rest }) => {
  return (
    <p className={`font-raleway text-3xl font-light ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleMd = ({ children, className = '', ...rest }) => {
  return (
    <p className={`font-raleway text-2xl font-light ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const TitleSm = ({ children, className = '', ...rest }) => {
  return (
    <p className={`font-raleway text-lg ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const SubTitleMd = ({ children, className = '', ...rest }) => {
  return (
    <p className={`text-2xl italic ${className}`} {...rest}>
      {children}
    </p>
  );
};

export const SubTitleSm = ({ children, className = '', ...rest }) => {
  return (
    <p className={`font-lato italic  ${className}`} {...rest}>
      {children}
    </p>
  );
};
export const TextSectionSm = ({ children, className = '', ...rest }) => {
  return (
    <p className={`text-sm ${className}`} {...rest}>
      {children}
    </p>
  );
};

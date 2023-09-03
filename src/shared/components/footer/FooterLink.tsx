interface FooterLinkProps {
  children: React.ReactNode | string;
  onClick: () => void;
}
export const FooterLink = ({ children, onClick }: FooterLinkProps) => {
  return (
    <button
      className="text-white text-left mb-3 text-xl font-raleway hover:scale-105 transition py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

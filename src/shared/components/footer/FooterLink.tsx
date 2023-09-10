interface FooterLinkProps {
  children: React.ReactNode | string;
  onClick?: () => void;
}
export const FooterLink = ({ children, onClick }: FooterLinkProps) => {
  return (
    <button
      className="mb-3 py-2 text-left font-raleway text-xl text-white transition hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import cx from 'classnames';

interface WithDrawerProps {
  open: boolean;
  drawerContent: React.ReactNode;
  closeDrawer: () => void;
  children: React.ReactNode;
  className?: string;
}

export const WithDrawer = ({
  open,
  drawerContent,
  closeDrawer,
  children,
  className,
}: WithDrawerProps) => {
  return (
    <div className={cx(className, { 'pr-80': open })}>
      {children}
      {open && (
        <>
          <div
            className="absolute inset-0 z-60 bg-black opacity-40 lg:pointer-events-none lg:hidden"
            onClick={closeDrawer}
          />
          <div className="absolute inset-y-0 right-0 z-60 w-96 border-l border-outline bg-background">
            {drawerContent}
          </div>
        </>
      )}
    </div>
  );
};

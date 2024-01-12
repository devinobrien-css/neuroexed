import loading_rolling from '../../assets/loading-rolling.svg';
import cx from 'classnames';
interface SpinnerProps {
  className?: string;
}
export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cx(className, 'flex items-center justify-center')}>
      <img className="h-24 w-24" src={loading_rolling} alt="loading" />
    </div>
  );
};

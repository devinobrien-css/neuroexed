import cx from 'classnames';
import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';

interface Props {
  activeStep: number;
  steps: StepDetails[];
}

interface StepDetails {
  heading: string;
  subHeading: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

interface StepProps extends StepDetails {
  index: number;
  complete: boolean;
  last: boolean;
}

const Step = ({
  index,
  last,
  complete,
  heading,
  subHeading,
  buttonText,
  onClick,
  disabled,
}: StepProps) => {
  return (
    <div className="flex w-full flex-row gap-4 lg:!flex-col">
      <div className="flex flex-col items-center lg:w-full lg:flex-row">
        {complete ? (
          <div className="m-[6px] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary outline outline-[6px] outline-primary-200">
            <CheckIcon />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-primary text-18 font-semibold text-onBackground">
            {index + 1}
          </div>
        )}
        <div
          className={cx(
            'h-full w-0.5 bg-primary lg:h-1 lg:w-full lg:border-l-0',
            {
              hidden: last,
            },
          )}
        />
      </div>
      <div className="mb-6 flex flex-col lg:mb-0 lg:mr-4">
        <h3 className="mb-2 text-18 font-bold text-black">{heading}</h3>
        <p className="mb-3 text-14 text-grey-300 lg:mb-6">{subHeading}</p>
        <button
          onClick={onClick}
          disabled={disabled}
          className={cx(
            'w-min whitespace-nowrap rounded-full  px-3 py-2 text-12 font-semibold ',
            {
              'bg-disabled ': disabled,
              'bg-secondary text-onSecondary': !disabled,
              'border border-grey !bg-background !text-onBackground': complete,
            },
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export const Stepper = ({ activeStep, steps }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      {steps.map((step, index) => (
        <Step
          key={index}
          index={index}
          {...step}
          last={index == steps.length - 1}
          complete={index < activeStep}
        />
      ))}
    </div>
  );
};

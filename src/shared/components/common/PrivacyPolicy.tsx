import cx from 'classnames';

interface PrivacyPolicyProps {
  className?: string;
}
export const PrivacyPolicy = ({ className }: PrivacyPolicyProps) => {
  return (
    <p className={cx(className, 'text-center text-14')}>
      <span>By continuing, you agree to Maro's</span>
      <br />
      <a
        className="font-bold"
        href="https://www.meetmaro.com/privacy-policy-terms-and-conditions"
      >
        Terms & Conditions
      </a>
      <span> and </span>
      <a
        className="font-bold"
        href="https://www.meetmaro.com/privacy-policy-terms-and-conditions"
      >
        Privacy Policy
      </a>
    </p>
  );
};

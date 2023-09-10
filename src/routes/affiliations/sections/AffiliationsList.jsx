import { SectionTitle } from '../../../shared/components/common.library';
import Loader from '../../../shared/components/Loader';
import useAffiliates from '../../../shared/hooks/useAffiliates';
import { Affiliation } from './Affiliation';

const AffiliationsList = () => {
  const { affiliates } = useAffiliates();

  return (
    <div className="my-16 p-4">
      <SectionTitle className="pb-12 text-center">Our Affiliates</SectionTitle>
      <div className="flex flex-wrap">
        {!affiliates && (
          <div className="flex min-h-[400px] w-full flex-col items-center">
            <Loader />
          </div>
        )}
        {affiliates?.map((affiliate) => {
          return <Affiliation key={affiliate} affiliate={affiliate} />;
        })}
      </div>
    </div>
  );
};

export default AffiliationsList;

import { Loader } from '../../../shared/components/Loader';
import useAffiliates from '../../../shared/hooks/useAffiliates';
import { Affiliate } from '../../../shared/types/affiliate.types';
import { Affiliation } from './Affiliation';

const AffiliationsList = () => {
  const { affiliates } = useAffiliates();

  return (
    <div className="my-32 p-4">
      <p className="mb-8 text-center font-raleway text-4xl font-light md:text-6xl">
        Our Affiliations
      </p>
      <div className="flex flex-wrap">
        {!affiliates && (
          <div className="flex min-h-[400px] w-full flex-col items-center">
            <Loader />
          </div>
        )}
        {affiliates?.map((affiliate: Affiliate) => {
          return <Affiliation key={affiliate.name} affiliate={affiliate} />;
        })}
      </div>
    </div>
  );
};

export default AffiliationsList;

import { useState } from 'react';
import { NewAffiliate } from './components/NewAffiliate';
import useAffiliates from '../../../shared/hooks/useAffiliates';
import { Button } from '../../../shared/components/form/Button';
import { Affiliate } from '../../../shared/types/affiliate.types';
import { EditableAffiliate } from './components/EditableAffiliate';

const AffiliateAccess = () => {
  const [newAffiliate, setNewAffiliate] = useState(false);
  const [search, setSearch] = useState('');
  const { affiliates } = useAffiliates();

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-between gap-y-4 py-8 md:flex-row">
        <input
          id="search"
          name="search"
          value={search}
          placeholder="search..."
          className="mx-8 my-auto rounded-xl border-2 p-4 shadow md:w-1/3"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className="mx-auto flex gap-x-2 md:mx-4">
          <Button
            color="gray"
            title="add new affiliate"
            onClick={() => setNewAffiliate(true)}
          />
        </div>
      </div>
      <div className="mx-auto flex flex-col divide-y md:max-w-screen-2xl">
        {newAffiliate && <NewAffiliate />}
        {affiliates
          ?.filter(
            (affiliate: Affiliate) =>
              affiliate?.slug?.toLowerCase().includes(search.toLowerCase()),
          )
          .map((affiliate: Affiliate) => {
            return (
              <EditableAffiliate key={affiliate.name} affiliate={affiliate} />
            );
          })}
      </div>
    </div>
  );
};

export default AffiliateAccess;

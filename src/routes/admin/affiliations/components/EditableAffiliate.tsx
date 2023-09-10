import { useForm } from 'react-hook-form';
import { Input } from '../../../../shared/components/form/Input';
import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import { Affiliate } from '../../../../shared/types/affiliate.types';
import useAffiliates from '../../../../shared/hooks/useAffiliates';

export const EditableAffiliate = ({ affiliate }: { affiliate: Affiliate }) => {
  const [state, setState] = useState(false);
  const { updateAffiliate, deleteAffiliate } = useAffiliates();
  const { register, watch, handleSubmit } = useForm<Affiliate>({
    defaultValues: {
      name: affiliate.name,
      slug: affiliate.slug,
      source: affiliate.source,
    },
  });

  const onSumbit = (data: Affiliate) => {
    updateAffiliate(data);
    setState(false);
  };

  return (
    <form className="py-4" onSubmit={handleSubmit(onSumbit)}>
      <div className="flex justify-between">
        <p className="text-xl">{watch('name') ?? 'New Affiliation'}</p>
        <div className="edit-buttons">
          <Button
            color="gray"
            type="button"
            title={state ? 'cancel' : 'edit'}
            onClick={() => (state ? setState(false) : setState(true))}
          />
          {state && (
            <>
              <Button type="submit" color="yellow" title="confirm" />
              <Button
                color="red"
                type="button"
                title="delete"
                onClick={async () => {
                  deleteAffiliate(affiliate.name);
                  setState(false);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-y-4 transition-all ${
          state ? 'h-[100%] p-10 opacity-100' : 'h-0 overflow-clip opacity-0'
        }`}
      >
        <Input name="name" register={register} />
        <Input name="slug" register={register} />
        <Input name="source" register={register} />
      </div>
    </form>
  );
};

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import { Affiliate } from '../../../../shared/types/affiliate.types';
import useAffiliates from '../../../../shared/hooks/useAffiliates';
import { ConfirmationModal } from '../../../../shared/components/modals/ConfirmationModal';
import { AffiliateForm } from './AffiliateForm';
import { toast } from 'react-toastify';

export const EditableAffiliate = ({ affiliate }: { affiliate: Affiliate }) => {
  const [state, setState] = useState(false);
  const { updateAffiliate, deleteAffiliate } = useAffiliates();
  const form = useForm<Affiliate>({
    defaultValues: {
      name: affiliate.name,
      slug: affiliate.slug,
      source: affiliate.source,
    },
  });
  const { handleSubmit } = form;

  const onSumbit = (data: Affiliate) => {
    updateAffiliate(data);
    setState(false);
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <FormProvider {...form}>
        <form className="py-4" onSubmit={handleSubmit(onSumbit)}>
          <div className="flex justify-between">
            <div className="flex gap-x-2">
              <img
                src={`${
                  import.meta.env.VITE_S3_AFFILIATION_PICTURES
                }${affiliate.slug.toLowerCase()}.png`}
                alt={affiliate.name}
                className="h-24 w-32 rounded object-cover object-top shadow"
              />
              <div>
                <p className="font-lato text-2xl font-normal">
                  {affiliate.name}
                </p>
                <p className="font-lato text-lg font-light">
                  {affiliate.source}
                </p>
              </div>
            </div>
            <div className="edit-buttons">
              <Button
                color="gray"
                type="button"
                title={state ? 'cancel' : 'edit'}
                onClick={() => {
                  if (state) {
                    form.reset({
                      name: affiliate.name,
                      slug: affiliate.slug,
                      source: affiliate.source,
                    });
                    toast.warn('Unsaved changes have been discarded.');
                  }
                  setState(!state);
                }}
              />
              {state && <Button type="submit" color="blue" title="confirm" />}
              <Button
                color="red"
                type="button"
                title="delete"
                onClick={async () => {
                  setConfirmDelete(true);
                }}
              />
            </div>
          </div>
          <AffiliateForm isOpen={state} />
        </form>
      </FormProvider>
      {confirmDelete && (
        <ConfirmationModal
          title={'Delete Affiliation'}
          message={
            <>
              <p>Are you sure you want to delete the affiliate:</p>
              <p className="font-lato font-bold">{affiliate.name}</p>-
              <p className="italic text-red-500">
                this action cannot be undone
              </p>
            </>
          }
          closeModal={() => setConfirmDelete(false)}
          confirm={() => {
            deleteAffiliate(affiliate.name);
            setConfirmDelete(false);
            setState(false);
          }}
          confirmText={'Delete'}
          cancelText={'Cancel'}
        />
      )}
    </>
  );
};

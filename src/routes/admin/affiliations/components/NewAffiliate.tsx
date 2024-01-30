import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import { Affiliate } from '../../../../shared/types/affiliate.types';

export const NewAffiliate = () => {
  const [state, setState] = useState(true);
  const { register, watch } = useForm<Affiliate>();

  return (
    <div className="editable selected-editable" id={'new-affiliate'}>
      <div>
        <p className="font-light md:text-2xl">
          {watch('name') ?? 'New Affiliation'}
        </p>
        <div className="edit-buttons">
          <Button
            color="gray"
            type="button"
            title={state ? 'cancel' : 'edit'}
            onClick={() => (state ? setState(false) : setState(true))}
          />
          {state && (
            <>
              <Button
                color="yellow"
                type="submit"
                onClick={() => {
                  setState(false);
                }}
                title="confirm"
              />
              <Button
                type="button"
                title="delete"
                color="red"
                onClick={async () => {
                  setState(false);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <input {...register('name')} />
        <input {...register('slug')} />
        <input {...register('image')} />
      </div>
    </div>
  );
};

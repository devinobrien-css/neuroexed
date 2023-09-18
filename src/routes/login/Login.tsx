import { Icon } from '@iconify/react';
import { Modal } from '../../shared/components/modals/Modal';
import { Button } from '../../shared/components/form/Button';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();
  const auth = getAuth();

  const onSubmit = (data: LoginForm) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("You've been logged in!");
        toggleModal();
      })
      .catch(() => {
        toast.error('Invalid account. Attempt has been recorded');
      });
  };
  return (
    <Modal className="h-min w-[95%] xl:w-2/5" closeModal={toggleModal}>
      <div className="mx-auto flex h-full flex-col border p-4 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-auto py-8">
            <h1 className="text-center font-lato text-4xl font-light">Login</h1>
            <p className="py-4 text-center font-lato font-light">
              Entering the administrative portal requires a login. <br /> Please
              enter your credentials below
            </p>

            <div className="my-5">
              <p className="text-center font-lato text-gray-600">
                Username or Email
              </p>
              <div className="mx-auto flex rounded-lg bg-gray-200 p-2 xl:w-3/5">
                <Icon icon="solar:user-bold-duotone" className="my-auto" />
                <input
                  className="my-auto w-full border-0 bg-transparent pl-1 font-lato font-light outline-0"
                  {...register('email')}
                />
              </div>
            </div>
            <div className="my-5">
              <p className="text-center font-lato text-gray-600">Password</p>
              <div className="mx-auto flex rounded-lg bg-gray-200 p-2 xl:w-3/5">
                <Icon
                  icon="solar:lock-password-bold-duotone"
                  className="my-auto"
                />
                <input
                  className="my-auto w-full border-0 bg-transparent py-0 pl-1 font-lato font-light outline-0 ring-0"
                  type={viewPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <Icon
                  icon="ph:eye-duotone"
                  className="my-auto"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              </div>
            </div>
            <Button color="blue" title="login" className="mx-auto block" />
            <br />
            <br />
            <hr />
            <div className="mx-auto mt-6 flex w-fit">
              <Icon icon="twemoji:brain" width={40} />
              <span className="my-auto font-lato text-3xl font-light">
                Neuroexed
              </span>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export const LogoutModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const auth = getAuth();

  const onClick = () => {
    signOut(auth)
      .then(() => {
        toast.success("You've safely logged out");
        toggleModal();
      })
      .catch(() => {
        toast.error(
          'An error occurred when trying to logout. Check your connection',
        );
      });
  };

  return (
    <Modal className="h-min w-[95%] xl:w-2/5" closeModal={toggleModal}>
      <div className="mx-auto flex h-full flex-col border p-4 lg:p-12">
        <div className="my-auto py-8">
          <h1 className="text-center font-lato text-4xl font-light">Logout</h1>
          <p className="py-4 text-center font-lato font-light">
            Would you like to logout of Neuroexed Admin?
          </p>

          <Button
            color="blue"
            title="logout"
            className="mx-auto block"
            onClick={onClick}
          />
          <br />
          <br />
          <hr />
          <div className="mx-auto mt-6 flex w-fit">
            <Icon icon="twemoji:brain" width={40} />
            <span className="my-auto font-lato text-3xl font-light">
              Neuroexed
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

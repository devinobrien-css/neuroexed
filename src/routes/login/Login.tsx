import { Icon } from '@iconify/react';
import { Modal } from '../../shared/components/modals/Modal';
import { Button } from '../../shared/components/form/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { signIn, signOut } from 'aws-amplify/auth';
import { removeAccessToken, setAccessToken } from '../../shared/auth/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const { isSignedIn } = await signIn({
        username: data.email,
        password: data.password,
      });
      if (!isSignedIn) {
        toast.error(
          'An error occurred when trying to login. Check your credentials',
        );
      } else {
        setAccessToken();
        toggleModal();
        toast.success('Logged in successfully!');
        navigate('/admin');
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any).message;
      toast.error(errorMessage);
    }
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
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await signOut();
      removeAccessToken();
      toast.success('Logged out successfully!');
      toggleModal();
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any).message;
      toast.error(errorMessage);
    }
  };

  return (
    <Modal className="h-min w-[95%] xl:w-2/5" closeModal={toggleModal}>
      <motion.div
        className="relative mx-auto flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-2xl lg:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative background elements */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-200/20 to-blue-200/20" />

        <div className="relative z-10 my-auto space-y-8 py-8">
          {/* Dashboard Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Icon icon="tabler:dashboard" className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-3 font-raleway text-2xl font-light text-gray-800">
              Visit the Dashboard
            </h2>
            <p className="mb-6 font-lato text-gray-600">
              Manage your account, settings, and administrative tools.
            </p>
            <motion.button
              className="group mx-auto flex items-center gap-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
              onClick={() => navigate('admin')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="tabler:external-link" className="h-4 w-4" />
              Visit Dashboard
              <Icon
                icon="tabler:arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 text-gray-500">
                or
              </span>
            </div>
          </div>

          {/* Logout Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-600">
              <Icon icon="tabler:logout" className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-3 font-raleway text-2xl font-light text-gray-800">
              Logout
            </h2>
            <p className="mb-6 font-lato text-gray-600">
              Sign out of your Neuroexed Admin account safely.
            </p>
            <motion.button
              className="group mx-auto flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
              onClick={onClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="tabler:logout" className="h-4 w-4" />
              Logout Securely
            </motion.button>
          </motion.div>

          {/* Branding */}
          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 rounded-full bg-white/50 px-6 py-3 backdrop-blur-sm">
              <Icon icon="tabler:brain" width={32} color="D6D6D6" />
              <span className="font-raleway text-xl font-light text-gray-700">
                Neuroexed
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
};

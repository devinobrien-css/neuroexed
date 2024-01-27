import './index.css';
import { router } from './manifest';
import { DndProvider } from 'react-dnd';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthWrapper } from './shared/auth/AuthWrapper';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_project_region: import.meta.env.VITE_COGNITO_REGION,
  aws_cognito_region: import.meta.env.VITE_COGNITO_REGION,
  aws_user_pools_id: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_APP_CLIENT_ID,
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      'REQUIRES_LOWERCASE',
      'REQUIRES_UPPERCASE',
      'REQUIRES_NUMBERS',
      'REQUIRES_SYMBOLS',
    ],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
const queryClient = new QueryClient();

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <AuthWrapper />
        <RouterProvider router={router} />
      </DndProvider>
      <ToastContainer
        position="bottom-right"
        newestOnTop
        autoClose={3000}
        toastClassName="rounded-lg"
        closeButton={true}
      />
    </QueryClientProvider>
  );
}

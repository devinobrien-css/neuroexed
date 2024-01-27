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
import config from './amplifyconfiguration.json';

Amplify.configure(config);
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

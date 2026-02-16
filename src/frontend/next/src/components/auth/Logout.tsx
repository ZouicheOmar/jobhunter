import { logoutAction } from '@/lib/auth';

export const Logout = () => {
  return <button onClick={logoutAction}> logout </button>;
};

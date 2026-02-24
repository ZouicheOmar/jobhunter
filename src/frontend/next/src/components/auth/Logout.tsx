import { logout } from '@/actions';
import { LogOut } from 'lucide-react';

export const Logout = () => (
  <button
    onClick={logout}
    className="inline-block border p-2 rounded-lg text-neutral-700
    cursor-pointer
    transition-all hover:font-medium hover:text-black hover:bg-neutral-100
    hover:cursor-pointer` hover:bg-neutral-200 hover:text-red-500 "
  >
    <LogOut size="1em" />
  </button>
);

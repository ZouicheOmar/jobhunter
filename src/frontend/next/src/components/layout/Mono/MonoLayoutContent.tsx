import { WrapperProps } from '@/components/types';

export const MonoLayoutContent = ({ children, className }: WrapperProps) => (
  <div className={`${className ? className : ''} bg-neutral-100 p-4 py-6 rounded-3xl`}>{children}</div>
);

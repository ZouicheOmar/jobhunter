import { login } from '@/actions';

const InputClass = `
border border-1
border-neutral-500/20
bg-neutral-100/80
rounded-xl shadow
w-fit p-2
focus:shadow-none
focus:outline-blue-500/70
focus:outline-offset-2
focus:bg-neutral-100
transition-all`;

export const Login = () => {
  return (
    <form action={login} className="flex flex-col gap-2 justify-center items-center">
      <input
        autoComplete="off"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        className={InputClass}
      />
      <input
        autoComplete="off"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className={InputClass}
      />
      <button
        type="submit"
        className="
        border border-blue-300/40
        mt-5 rounded-lg px-12 py-1
        bg-blue-200/40 
        focus:bg-blue-600
        focus:border-blue-500
        focus:text-white
        transition-colors
        shadow"
      >
        login
      </button>
    </form>
  );
};

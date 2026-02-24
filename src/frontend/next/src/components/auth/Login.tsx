import { loginInAction } from '@/actions';

export const Login = () => {
  return (
    <div>
      <form action={loginInAction}>
        <div className="">
          <label htmlFor="username"> Username </label>
          <input type="text" id="username" name="username" placeholder="Username" />
        </div>
        <div className="">
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export const Login = () => {
  return (
    <div>
      <form>
        <div className="">
          <label htmlFor="username"> Username </label>
          <input type="text" id="username" name="username" placeholder="Username" required />
        </div>
        <div className="">
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

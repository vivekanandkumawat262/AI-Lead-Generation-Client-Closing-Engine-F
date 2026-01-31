export const logout = (logoutFn, navigate) => {
  logoutFn();
  navigate("/", { replace: true });
};

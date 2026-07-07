export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveToken = (token) => {
  return localStorage.setItem("token", token);
};

export const logout = () => {
  return localStorage.removeItem("token");
};

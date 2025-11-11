export const auth = {
  login(user, token) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },
  logout() {
    localStorage.clear();
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    return localStorage.getItem("token");
  }
};

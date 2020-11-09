import jwtDecode from "jwt-decode";

export function Auth() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if (new Date() > expiresAt) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  }
}

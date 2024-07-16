export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  profilePicture: string | null;
}

export interface AuthClaim {
  type: string,
  value: string
}

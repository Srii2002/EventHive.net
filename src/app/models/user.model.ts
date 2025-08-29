export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // optional when sending to frontend
  role: 'Admin' | 'User';
  token?: string; // JWT token from backend
}
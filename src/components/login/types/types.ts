import { User } from 'firebase/auth';

export interface ContainerProps {
  onLoginSuccess: (user: User, idToken: string) => void;
}

export interface GoogleLoginResponse {
  user: UserInterface;
  nestJsToken: string;
}

interface UserInterface {
    id: string;
    email: string;
    password: string;
}
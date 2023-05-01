import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  userName:string;
  firstName: string;
  lastName:string;
  email: string;
  birthdaye:Date;
  gender:'male'|'female';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});
type Props = {
  children: React.PropsWithChildren<Props>;
};
const AuthProvider: React.FC = ({ children }:Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

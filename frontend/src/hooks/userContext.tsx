import React, {createContext, useContext, useState, ReactNode} from "react";

interface User {
    idUsuario: number;
    nome: string;
    role: "orientador" | "estagiario";
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>  ;
};

export const useUserContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

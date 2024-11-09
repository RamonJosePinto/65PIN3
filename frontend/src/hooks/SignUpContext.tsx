import React, {createContext, useState, useContext, ReactNode} from "react";

interface SignUpContextProps {
    companyId: number | null;
    setCompanyId: (id: number) => void;
    courseId: number | null;
    setCourseId: (id: number) => void;
}

const SignUpContext = createContext<SignUpContextProps | undefined>(undefined);

export const SignUpProvider = ({children}: {children: ReactNode}) => {
    const [companyId, setCompanyId] = useState<number | null>(null);
    const [courseId, setCourseId] = useState<number | null>(null);

    return <SignUpContext.Provider value={{companyId, setCompanyId, courseId, setCourseId}}>{children}</SignUpContext.Provider>;
};

export const useSignUpContext = () => {
    const context = useContext(SignUpContext);
    if (!context) throw new Error("useSignUpContext must be used within a SignUpProvider");
    return context;
};

// SignUpContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface SignUpContextType {
  companyId: number | null;
  setCompanyId: (id: number) => void;
  courseId: number | null;
  setCourseId: (id: number) => void;
  estagioId: number | null;
  setEstagioId: (id: number) => void;
  estagiarioId: number | null;
  setEstagiarioId: (id: number) => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [estagioId, setEstagioId] = useState<number | null>(null);
  const [estagiarioId, setEstagiarioId] = useState<number | null>(null);

  return (
    <SignUpContext.Provider
      value={{ companyId, setCompanyId, courseId, setCourseId, estagioId, setEstagioId, estagiarioId, setEstagiarioId }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
};

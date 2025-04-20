import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  
  // Definindo o tipo de dados decodificados do token JWT
  interface DecodedToken {
    sub: string;       // E-mail (ex: gabriel@meclist.com)
    id: number;        // ID do usuário
    nome: string;      // Nome do usuário (ex: Gabriel Wrubel)
    role: string;      // Papel do usuário (ex: ADMIN)
    email: string;     // E-mail do usuário
    iat: number;       // Emitido em (timestamp)
    exp: number;       // Expiração do token (timestamp)
  }
  
  // Interface com os dados e métodos disponíveis no contexto
  interface AuthContextType {
    user: DecodedToken | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
  }
  
  
  // Cria o contexto de autenticação
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // Props esperadas pelo Provider
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  // Função para decodificar o JWT (extraindo o payload)
  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split(".")[1];  // Pega a parte do payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  
  // Provider do contexto de autenticação
  export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<DecodedToken | null>(null);
  
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedUser = decodeToken(token);
        setUser(decodedUser);
      }
      setIsLoading(false); // Agora ele sabe que terminou de checar
    }, []);
  
    // Função para logar e salvar o token no localStorage
    const login = (token: string) => {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("authToken", token);
    };
  
    // Função para logout
    const logout = () => {
      setUser(null);
      localStorage.removeItem("authToken");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  // Hook customizado para consumir o contexto com segurança
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  }
  
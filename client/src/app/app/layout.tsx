import { ReactNode } from 'react';
import { AuthProvider } from "@/components/providers";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <main>
      <AuthProvider>
        {children}
      </AuthProvider>
    </main>
  );
}

export default AppLayout;

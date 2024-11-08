import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import Role from 'types/Role';

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  role: Role;
  setRole: (role: Role) => void;
  loginId: string | null;
  setLoginId: (loginId: string) => void;
  companyId: number | null;
  setCompanyId: (companyId: number) => void;
}

const useAuthStore = createStore(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({ isLoggedIn: false, role: null, loginId: null, companyId: null }),
      role: null,
      setRole: (role: Role) => set({ role }),
      loginId: null,
      setLoginId: (loginId: string) => set({ loginId }),
      companyId: null,
      setCompanyId: (companyId: number) => set({ companyId }),
    }),
    { name: 'userInfoStorage' }
  )
);

export default useAuthStore;

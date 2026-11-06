const USER_KEY = "zevyq_user";
const TOKEN_KEY = "zevyq_access_token";

function activeStorage(): Storage {
  if (window.sessionStorage.getItem(TOKEN_KEY)) return window.sessionStorage;
  return window.localStorage;
}

export function clearAuthSession(): void {
  let failure: unknown;
  for (const name of ["localStorage", "sessionStorage"] as const) {
    for (const key of [USER_KEY, TOKEN_KEY]) {
      try {
        window[name].removeItem(key);
      } catch (error) {
        failure = error;
      }
    }
  }
  if (failure) throw failure;
}

export function saveAuthSession(
  user: unknown, token: string, remember: boolean,
): void {
  if (!token || !user) throw new Error("Die Anmeldung ist unvollstaendig.");
  const serializedUser = JSON.stringify(user);
  if (!serializedUser) throw new Error("Die Kontodaten sind ungueltig.");
  clearAuthSession();
  const storage = remember ? window.localStorage : window.sessionStorage;
  try {
    storage.setItem(USER_KEY, serializedUser);
    storage.setItem(TOKEN_KEY, token);
  } catch (error) {
    clearAuthSession();
    throw error;
  }
}

export const authStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    return activeStorage().getItem(key);
  },
  setItem(key: string, value: string): void {
    activeStorage().setItem(key, value);
  },
  removeItem(key: string): void {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

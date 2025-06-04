export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserRole = async (): Promise<string | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch('http://localhost:3000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return null;
    const user = await res.json();
    return user.role;
  } catch {
    return null;
  }
};

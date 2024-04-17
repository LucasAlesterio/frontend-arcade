export function useLocalUser(): [string, (name: string | null) => void] {
  const user = localStorage.getItem('name') || '';
  const setUser = (name: string | null) => name ? localStorage.setItem("name", name) : localStorage.clear();

  return [user, setUser];
}
const STORAGE_KEY = "recent_searches";
const MAX_ITEMS = 5;

export const getRecentSearchesFromLocalStorage = (): string[] => {
  const localStorageRecentSearchesData = localStorage.getItem(STORAGE_KEY);
  if (!localStorageRecentSearchesData) {
    return [];
  }

  try {
    return JSON.parse(localStorageRecentSearchesData);
  } catch {
    return [];
  }
};

export const saveRecentSearches = (searchText: string) => {
  const existing = getRecentSearchesFromLocalStorage();

  const filtered = existing.filter(
    (item) => item.toLowerCase() !== searchText.toLowerCase(),
  );

  const updatedRecentSearches = [searchText, ...filtered].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecentSearches));
};

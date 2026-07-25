const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  id: () => import('./dictionaries/id.json').then((m) => m.default),
};

export const getDictionary = (locale) => {
  return dictionaries[locale]();
};

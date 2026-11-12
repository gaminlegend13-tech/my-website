// Address of a file in /public. Normally just "/img/…"; the prefix only changes
// if the site is ever served from a sub-folder (Vite's `base` setting).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

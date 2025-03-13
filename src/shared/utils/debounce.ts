export const debounce = <T extends (...args: Parameters<T>) => void>(
  cb: T,
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, ms);
  };
};

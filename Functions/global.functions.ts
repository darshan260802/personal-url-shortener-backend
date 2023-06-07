import { ShortendLink } from "../Models/link.model";

// Function : generates random string
export function getRandomString(length = 7): string {
  const POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";

  while (randomStr.length < length) {
    const randomIndex = Math.floor(Math.random() * POOL.length);
    randomStr += POOL[randomIndex];
  }

  return randomStr;
}

// Function: returns link data if link exist in array
export function getLink(
  short_url: string,
  array: ShortendLink[]
): ShortendLink | null {
  return (
    array.find((link: ShortendLink) => link.short_url === short_url) ?? null
  );
}

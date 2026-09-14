export const AVATAR_PALETTE = [
  { bg: "bg-accent-50", text: "text-accent-800" },
  { bg: "bg-gradient-violet/10", text: "text-gradient-violet" },
  { bg: "bg-gradient-blue/10", text: "text-gradient-blue" },
] as const;

export function getAvatarPalette(name: string) {
  const code = typeof name === "string" ? name.charCodeAt(0) || 0 : 0;
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

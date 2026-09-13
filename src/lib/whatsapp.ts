const WHATSAPP_NUMBER = "6281283950403";

export function buildWaLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

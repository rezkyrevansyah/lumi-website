import { SessionOptions } from "iron-session"

export interface SessionData {
  isAdmin: boolean
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "fallback_secret_must_be_at_least_32_characters_long_for_iron_session",
  cookieName: "lumi-admin-session",
  ttl: 60 * 60 * 24, // 24 hours
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
}

import type { SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "lumi_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

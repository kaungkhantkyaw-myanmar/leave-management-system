import { DefaultSession, SessionToken } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * useSession(), getSession() ကနေ ပြန်ရတဲ့ session object ကို customize လုပ်ဖို့
   */
  interface Session {
    user?: {
      id?: string; // User ID အတွက် custom property
      email?: string | null;
      name?: string | null;
      role?: string | null;
      image?: string | null;
    };
  }

  /**
   * OAuth providers တွေက profile callback မှာ return လုပ်တဲ့ user object ဒါမှမဟုတ်
   * database session callback မှာ အသုံးပြုတဲ့ user object ရဲ့ shape
   */
  interface User {
    id?: string; // User ID အတွက် custom property
    email?: string | null;
    name?: string | null;
    role?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT: jwt callback နဲ့ getToken() က return လုပ်တဲ့ token object ရဲ့ shape
   */
  interface JWT {
    id?: string; // User ID အတွက် custom property
    email?: string | null;
    role?: string | null;
    // token ထဲမှာ ထည့်လိုတဲ့ တခြား properties တွေကို ဒီနေရာမှာ ထည့်နိုင်ပါတယ်
  }
}

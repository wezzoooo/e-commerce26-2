import { signInUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface decodedTokenType {
    id: string;
    name: string;
    rol: string;
}

declare module "next-auth" {
    interface Session {
        token?: string;
    }
}

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: { email: {}, password: {} },
            authorize: async (credentials) => {
                if (!credentials) return null;

                const data = await signInUser(credentials);
                console.log(data);

                if (data.message === "success") {
                    const decodedToken = jwtDecode<decodedTokenType>(data.token);

                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token
                    };
                } else {
                    throw new Error(data.message || "Invalid Credentials");
                }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },
        session({ session, token }) {
            if (session) {
                session.user = token.user;
                session.token = token.token as string;
            }
            return session;
        }
    }
};


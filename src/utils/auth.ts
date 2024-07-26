import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

declare module "next-auth" {//type-script dilinde modül genişetme yaparak 'next-auth' modülünün 'session' arayuzunu genisletir, oturum verilerine isAdmin özelliği ekler yani
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {//'next-auth/jwt' modülünün 'JWT' arayuuznu genisletir, jwt tokenine isAdmin ozelligi eklenmis olur
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {//NextAuth kütüphanesinin yapılandırma seçenekelrini içeren bir nesne tanımlar. bu nesne kimlik doğrulama sağlayıcıları, geri çağrılar ve oturum yömetimi gizi özellikleri içeirir
  adapter: PrismaAdapter(prisma), //kullanılacak kimlik doğrulama veritabanı adaptorunu belirtir
  session: { //oturum yönetim stratejsini belirtir
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_ID as string,
      // clientSecret: process.env.GOOGLE_SECRET as string,
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {//geri çağrı fonksiyonlarını belirtmektedir, bu fonksiyonlar oturum ve jwt oluşturma işlemleri sırasında özel işlevsellik eklemek için kullanılır
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
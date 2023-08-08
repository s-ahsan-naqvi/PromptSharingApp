import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {

        async session({ session }){
            //get users data everytime to establish a continuously running session.
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }){
        try {
            await connectToDB();

            //check is the user already exists
            const userExists = await User.findOne({
                email: profile.email
            });

            //if not, create new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            
            return true
            
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
})

export { handler as GET, handler as POST }
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '@/model/User'


export const option = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'text',
                    placeholder:'your-email'
                },
                password:{
                    label:'password',
                    type:'password',
                    placeholder:'your-password'
                }
            },
            async authorize(credentials){
                try{
                    const user = await User.findOne({email:credentials.email}).lean().exec()
                    if(user){
                       const match = await bcrypt.compare(credentials.password,
                        user.password)
                        if(match){
                            console.log('boom password')
                            delete user.password
                            user['role'] = 'Unverified Email'
                            return user
                        }
                    }
                }
                catch(err){
                    console.log('err',err)
                }
                return null
            }
        }),
        GithubProvider({
            profile(profile){
                console.log('profile github', profile)
                let userRole = "Github User"
                if(profile?.email==='sahilrahmani89@gmail.com'){
                 userRole='Admin'
                }
                return {
                    ...profile,
                    role:userRole
                }
            },
            clientId:process.env.Github_Id,
            clientSecret:process.env.Github_Secret
        }),
        GoogleProvider({
            profile(profile){
                console.log('profile google', profile)
                let userRole = "Google User"
                if(profile?.email==='sahilrahmani89@gmail.com'){
                 userRole='Admin'
                }
                return {
                    ...profile,
                    role:userRole
                }
            },
            clientId:process.env.Google_Id,
            clientSecret:process.env.Google_Secret
        })
    ],
    callbacks:{
        async jwt({token,user,profile}){
            console.log('user jwt',user)
            if(user) {
                token.role= user.role
            }
            return token
        },
        async session({session,token}){
            console.log('session tokenm',token)
            if(session?.user ){
                session.user.role =  token.role
                
            }
            return session
        },
    }
}
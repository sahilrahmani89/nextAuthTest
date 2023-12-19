import NextAuth from "next-auth";
import {option} from './option.js'
// console.log('which one called first route')
const handler = NextAuth(option)

export {handler as GET, handler as POST}
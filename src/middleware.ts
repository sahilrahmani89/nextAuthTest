// export {default} from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'


export default withAuth(
    function middleware(req) {
        console.log('req.nextUrl.pathname', req.nextUrl.pathname)
        if (req.nextauth && req.nextauth.token) {
            console.log('req.nextauth.token.role', req.nextauth.token.role)
            if (req.nextUrl.pathname.startsWith('/createUser')
                && req.nextauth.token.role != 'Admin') {
                return NextResponse.rewrite(new URL('/denied', req.url))
            }
        }
    },{
        callbacks:{
            authorized:({token})=>!!token
        }
    }
)


export const config = { matcher: ['/createUser'] }

// simpler way to protect pages .
// console.log('in middleware')
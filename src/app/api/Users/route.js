import User from '@/model/User'
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'


export async function POST(req){
    try{
        const body = await req.json()
        const userData = body.formData;

        if(!userData.email||!userData.password){
            return NextResponse.json(
                {message:'all fields are required!'},
                {status:400}
            )
        }

        // check for duplicate
        const duplicate = await User.findOne({email:userData.email})
        .lean()
        .exec()
        if(duplicate){
            return NextResponse.json(
                {message:"Duplicate email"},
                {status:409}
            )
        }

        const hashPassword = await bcrypt.hash(userData.password,10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({message:'User Created'},{status:201})
    }
    catch(err){
        console.log('err',err)
        return NextResponse.json({message:'Failed'},{status:500})
    }
}
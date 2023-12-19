"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'

const UserForm = () => {
    const router =  useRouter()
    const [formData,setformData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [errorMessage,seterrorMessage ] = useState('')

    const handleChange = (e:any) =>{
        const value = e.target.value;
        const name = e.target.name
        setformData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    //
    const handleSubmit = async(e:any) =>{
        e.preventDefault()
        seterrorMessage('')
        const res = await fetch('/api/Users',{
            method:'POST',
            body:JSON.stringify({formData}),
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        if(!res.ok){
            const resp = await res.json()
            seterrorMessage(resp)
        }else{
            router.refresh()
            router.push('/')
        }
    }
  return (
    <div>
        <form onSubmit={e=>handleSubmit(e)} method='post' className='flex flex-col'>

            <h1>Create new User</h1>
            
            <label>Full name</label>
            <input id='name' name='name' onChange={e=>handleChange(e)}
            required={true}
            value={formData.name}
            className='m-2 bg-slate-400 rounded'
            type='text'
            />
            <label>Email</label>
            <input id='email' name='email' onChange={e=>handleChange(e)}
            required={true}
            value={formData.email}
            className='m-2 bg-slate-400 rounded'
            type='text'
            />
            <label>Password</label>
            <input id='password' name='password' onChange={e=>handleChange(e)}
            required={true}
            type='password'
            value={formData.password}
            className='m-2 bg-slate-400 rounded'
            />
            <input type='submit' value={'Submit'} className='hover:cursor-pointer'/>
        </form>
        <p className='text-red'>{errorMessage}</p>
    </div>
  )
}

export default UserForm
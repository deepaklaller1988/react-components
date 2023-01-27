//server side authentication
import React from 'react'
import {getSession, useSession} from 'next-auth/react'

function Blog({data}) {
    const { data: session } = useSession();
    console.log({ session })
    return (
        <div>
            Blog: {data}
        </div>
    )
}

export default Blog

export async function getServerSideProps(context){
    const session = await getSession(context);

    //secure page server side
    if(!session){
        return {
            redirect: {
                destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
                permanent: false,
            },
        }
    }

    return{
        props: {
            session,
            data: session ? 'List of 100 Blogs' : ' List of free blogs',
        },
    }
}
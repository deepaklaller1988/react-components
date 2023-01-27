import {useRouter} from 'next/router';

function Blog({posts}){
    const router = useRouter();

    if(router.isFallback){
        return <h1>Loading....... </h1>
    }
    return (
        <div>
            <h1>Blog ID details </h1>
            <h2>{posts.id} {posts.title}</h2>
            <p>{posts.body}</p>
        </div>
    )
}

export async function getStaticPaths(){
    return {
        paths: [
            {
                params: {blogId: '1'},
            },
            {
                params: {blogId: "2"},
            },
            {
                params: {blogId: "3"},
            },
        ],
        fallback: true,
    }
}


export async function getStaticProps(context) {
    const {params} = context;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`)
    const data = await res.json();
    // console.log(posts)

    console.log(`generating page ${params.blogId}`)

    return {
      props: {
        posts: data,
      },
    }
}

export  default Blog


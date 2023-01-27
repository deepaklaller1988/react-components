import Link from "next/link"


function getBlogIdDetails({posts}){
    return (
        <div>
            <h1>Blog ID details pages</h1>
            {posts.map((post)=>{
                return(
                    <Link href={`blogs/${post.id}`} key={post.id} passHref>
                    <div >
                        
                        <hr />
                        {post.id}<br/>
                        {post.title}
                        <hr />
                       
                    </div>
                     </Link>
                )
            })}
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json();
    // console.log(posts)

    return {
      props: {
        posts: data.slice(0,3),
      },
    }
}

export  default getBlogIdDetails


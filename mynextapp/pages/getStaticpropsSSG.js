//getStaticProps


function Userlist({posts}){

    return(
        <>
        <h1>List of users</h1>
        
        {posts.map((post)=>{
            return <div key={post.id}>{post.username}</div>
        })}
       
        </>
    )

}
export default Userlist;


export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const posts = await res.json();
    console.log(posts)

    return {
      props: {
        posts,
      },
    }
  }


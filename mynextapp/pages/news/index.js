function NewsArticle({articles}){
    return(
        <div>
            <h1>News</h1>
            {
                articles.map((post)=>{
                    return <div key={post.id}> 
                    <hr />
                    {post.id} - {post.title} || {post.category} 
                    
                    <hr />
                     </div>
                })
            }
        </div>
    )
}

export async function getServerSideProps(){
    const response = await fetch('http://localhost:3000/news')
    const data = await response.json();

    return{
        props:{
            articles: data,
        },
    }
}

export default NewsArticle;
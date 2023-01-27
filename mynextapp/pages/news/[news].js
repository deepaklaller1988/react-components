function ArticlesByList({articles,category}){
    return (
        <>
        <h1>Showing News For Category {category}</h1>
        {
            articles.map(()=>{
                return <div key={post.id}> 
                <hr />
                {post.id} - {post.title}
                <hr />
                {post.description}
                <hr />
                 </div>
            })
        }
        </>
    )
}

export async function getServerSideProps(context){
    const {params} = context;
    const {category} = params
    const res = await fetch(`http://localhost:3000/news?category=${category}`);
    const data = await res.json();
    // console.log(posts)

    return {
      props: {
       articles: data,
       category,
      },
    }

}

export default ArticlesByList;
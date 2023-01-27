//App LAyout - Per Page Layout
import Footer from "./components/Footer"

function About() {
    return (
        <div>
            About
        </div>
    )
}

export default About

About.getLayout = function PageLayout(page){
    return (
        <> 
        {page}
        <Footer />
        </>
    )
}

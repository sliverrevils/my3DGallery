import Aside from "../../components/html/Aside";
import Footer from "../../components/html/Footer";
import Header from "../../components/html/Header";
import Main from "../../components/html/Main";


export default function GuestPage() {

    return (        
            <div className="Main-layout">               
                <Header/>                
                <Aside/>                
                <Main/>                
                <Footer/>
            </div>      
    )
}
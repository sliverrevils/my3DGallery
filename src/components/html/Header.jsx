


export default function Header(){

    return(
        <header>
            <div className="Logo">
                <img src={process.env.PUBLIC_URL+'/IMG/SAOf.gif'}/>
            </div>
            <div className="Title">
                <span className="Title__maintext">My3DGallery</span>
                <span className="Title__bottomtext">const my3dGallery = [ SCSS, React, Redux, Three, Firebase ]</span>
                
                </div>
        </header>
    )
}
import {Link} from 'react-router-dom'
import "./NotFound.css"


const NotFound = () => {
    return (
        <div className='notFound'>
        <h1 className='header'>OPPS!</h1>    
        <p className='text'>Page not found ... </p>
        <Link to = {"/"} className='link'>Return to Playlists</Link>
        </div>
    )
}

export default NotFound;
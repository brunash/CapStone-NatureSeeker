import './Video.scss';
import HomePath from "../../assets/videos/home-path.mp4";
// import Sunset from "../assets/videos/Sunset.mp4";
import SearchPark from '../SearchPark';

export default function Home() {
    return (
        <>
        <div className='main'>
            <video className="main__video" autoPlay loop muted>
                <source src={HomePath} type="video/mp4" />
                {/* <source src={Sunset} type="video/mp4" /> */}
            </video>
            <SearchPark className="main__search"/>
        </div>
        </>
    )
}
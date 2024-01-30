import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import home1 from '../../../assets/home/01.jpg';
import home2 from '../../../assets/home/02.jpg';
import home3 from '../../../assets/home/03.png';
import home4 from '../../../assets/home/04.jpg';
import home5 from '../../../assets/home/05.png';
import home6 from '../../../assets/home/06.png';
const Banner = () => {
    return (
        <Carousel>
        <div>
            <img src={home1} />
          
        </div>
        <div>
            <img src={home2} />
          
        </div>
        <div>
            <img src={home3}/>
        </div>
        <div>
            <img src={home4}/>
        </div>
        <div>
            <img src={home5}/>
        </div>
        <div>
            <img src={home6}/>
        </div>
    </Carousel>

    );
};

export default Banner;
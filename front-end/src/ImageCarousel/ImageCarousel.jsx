import React from 'react'

import { Carousel, Image } from 'react-bootstrap';


function ImageCarousel({image_url}) {
    return (  

        <Carousel >
            <Carousel.Item>
                <Image className='img-fluid rounded-3' style={{height:"100%"}} src={image_url == undefined ? '/pics/default.jpeg': image_url}/>
         
            </Carousel.Item>


        </Carousel>
    );
}

export default ImageCarousel;
import React from 'react'

import { Carousel, Image } from 'react-bootstrap';


function ImageCarousel() {
    return (  

        <Carousel >
            <Carousel.Item>
                <Image className='img-fluid rounded-3' style={{height:"100%"}} src='/pics/harbin.jpeg'/>
         
            </Carousel.Item>


        </Carousel>
    );
}

export default ImageCarousel;
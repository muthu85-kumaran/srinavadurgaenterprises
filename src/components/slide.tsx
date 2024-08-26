"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

import img1 from "../../public/agriculture-pumps_1920x500.jpg";
import img2 from "../../public/Desktop-Web-Banner.jpg";
import img3 from "../../public/e-commerce-website-final.jpg";
import img4 from "../../public/industry-pumps_1920x500_1.jpg";
import img5 from "../../public/mini-pumps_1920x500_s.jpg";
import img6 from "../../public/pressure_boosting_pumps_1920x500_s.jpg";
import img7 from "../../public/service-banner_1920x500.jpg";

const Slide = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7xl mx-auto h-60 p-2 "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56 p-0 ">
                <Image src={img1} alt="agriculture pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56  p-0">
                <Image src={img2} alt="industrial pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56  p-0">
                <Image src={img3} alt="commercial pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56  p-0">
                <Image src={img4} alt="mini pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56  p-0">
                <Image src={img5} alt="pressure boosting pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56 p-0">
                <Image src={img6} alt="mono block pump" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="shadow-sm">
              <CardContent className="flex h-56 p-0">
                <Image src={img7} alt="submersible pumps" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slide;

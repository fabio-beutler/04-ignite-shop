import 'keen-slider/keen-slider.min.css';

import { useKeenSlider } from 'keen-slider/react';
import Head from 'next/head';
import Image from 'next/image';

import shirt1 from '@/assets/shirts/shirt-1.png';
import shirt2 from '@/assets/shirts/shirt-2.png';
import shirt3 from '@/assets/shirts/shirt-3.png';
import shirt4 from '@/assets/shirts/shirt-4.png';
import { HomeContainer, Product } from '@/styles/pages/home';

const shirts = [shirt1, shirt2, shirt3, shirt4];

export default function Home() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      {Array.from({ length: 4 }).map((_, index) => (
        <Product key={index} className='keen-slider__slide'>
          <Image src={shirts[index]} alt='' width={520} height={480} />

          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

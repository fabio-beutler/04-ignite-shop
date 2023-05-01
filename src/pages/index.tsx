import 'keen-slider/keen-slider.min.css';

import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { HomeContainer, Product } from '@/styles/pages/home';
import { priceFormatter } from '@/utils/formatter';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
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
      {products.map((product) => (
        <Product
          key={product.id}
          href={`/product/${product.id}`}
          className='keen-slider__slide'
          prefetch={false}
        >
          <Image
            src={product.imageUrl}
            alt={`Foto da ${product.name}`}
            width={520}
            height={480}
          />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: priceFormatter.format(
      ((product.default_price as Stripe.Price).unit_amount as number) / 100
    ),
  }));

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

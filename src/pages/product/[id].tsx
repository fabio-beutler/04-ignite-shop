import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { priceFormatter } from '@/utils/formatter';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt='' width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Nobes57TB0TRi4' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof params.id !== 'string')
    return { redirect: { destination: '/', permanent: false } };

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter.format(
          ((product.default_price as Stripe.Price).unit_amount as number) / 100
        ),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};

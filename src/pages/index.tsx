import { styled } from '@/styles';
import Head from 'next/head';

const Button = styled('button', {
  backgroundColor: '$rocketseat',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <Button>Enviar</Button>
    </>
  );
}

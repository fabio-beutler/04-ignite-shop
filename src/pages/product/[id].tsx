import Image from 'next/image';
import { useRouter } from 'next/router';

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';

export default function Product() {
  const {
    query: { id },
  } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>{/* <Image  /> */}</ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>79,90</span>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident reiciendis
          porro ipsum quas recusandae! Molestiae, distinctio. Nobis doloribus, sequi, ea
          eveniet mollitia veniam velit animi tempore facilis tempora explicabo totam?
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

import Image from 'next/image';
import basebrick from '../../public/productImages/M3001.webp';

export const metadata = {
  title: 'Thank you for your order',
  description: 'Thank you page for oyur order. ',
};

export default function Home() {
  return (
    <div>
      <h1>Thank you for your order</h1>
      <p>Happy Building</p>
      <Image src={basebrick} alt="a lego brick" />
    </div>
  );
}

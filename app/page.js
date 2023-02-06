import Image from 'next/image';
import { getStudents } from '../Database/products.ts';
import basebrick from '../public/productImages/M3001.webp';
import styles from './page.module.scss';

export default async function Home() {
  const students = await getStudents();

  return (
    <div className={styles.hero}>
      <h1>Welcome to Brick Base</h1>
      <p>We sell base bricks.</p>
      <Image className={styles.image} src={basebrick} alt="a lego brick" />
      <h2> Also students</h2>
      <div>
        {students.map((student) => {
          return (
            <div key={student.name}>
              {student.name}, {student.age}
            </div>
          );
        })}
      </div>
    </div>
  );
}

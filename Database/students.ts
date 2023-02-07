import { cache } from 'react';
import { sql } from './connect';

type Student = {
  name: string;
  age: number;
};

export const getStudents = cache(async () => {
  const students = await sql<Student[]>`
    SELECT * FROM students
  `;
  console.log('students', students);
  return students;
});

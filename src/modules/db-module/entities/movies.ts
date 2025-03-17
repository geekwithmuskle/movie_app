import { Column, Entity } from 'typeorm';
import { BaseDB } from './base';

@Entity({ name: 'movies' })
export class Movies extends BaseDB {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  producer: string;
}

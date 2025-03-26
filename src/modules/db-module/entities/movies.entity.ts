import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseDB } from './base';
import { Theater } from './theaters.entity';

@Entity({ name: 'movies' })
export class Movies extends BaseDB {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  producer: string;

  @ManyToOne(() => Theater, (theater) => theater.movies, {
    onDelete: 'CASCADE',
  })
  theater: Theater[];
}

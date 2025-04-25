import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDB } from './base';
import { Movies } from './movies.entity';

@Entity({ name: 'theaters' })
export class Theater extends BaseDB {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'int', default: 0 })
  totalSeats: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relationship with movies (assuming a Movie entity exists)
  @OneToMany(() => Movies, (movie) => movie.theater, { onDelete: 'CASCADE' })
  movies: Movies[];
}

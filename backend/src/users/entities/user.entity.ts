import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  stripeCustomerId: string;

  @Column({ nullable: true })
  subscriptionStatus: string;

  @Column({ nullable: true })
  firebaseUid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  password: string;
} 
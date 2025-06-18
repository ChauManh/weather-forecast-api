import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { City } from 'src/city/city.entity';
import { UserAlert } from './user-alert.entity';
import { UserAlertHistory } from './user-alert-history.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 25, unique: true })
  username: string;

  @Column({ length: 25, nullable: true })
  fullname: string;

  @Column({ length: 60, nullable: true })
  avatar: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 50, nullable: true })
  verifyCode: string;

  @Column({ nullable: true })
  current_city_fk: number;

  @Column({ length: 25, default: 'en' })
  nd_language: string;

  @Column({ length: 10, default: 'Metric' })
  measurement_type: string;

  @Column({ type: 'int', nullable: true })
  utc: number;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @ManyToOne(() => City)
  @JoinColumn({ name: 'current_city_fk' })
  currentCity: City;

  @OneToMany(() => UserAlert, (ua) => ua.user)
  alerts: UserAlert[];

  @OneToMany(() => UserAlertHistory, (uah) => uah.user)
  alertHistories: UserAlertHistory[];
}

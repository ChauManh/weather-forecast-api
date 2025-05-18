import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserAlertType } from './user-alert-type.entity';
import { User } from './user.entity';
import { City } from 'src/city/city.entity';

@Entity('UserAlertHistory')
export class UserAlertHistory {
  @PrimaryGeneratedColumn()
  history_id: number;

  @Column()
  alert_type_id: number;

  @Column()
  nd_id: number;

  @Column()
  city_id: number;

  @Column({ type: 'char', length: 1 })
  condition_type: string;

  @Column('float')
  alert_value: number;

  @Column({ length: 255, nullable: true })
  comment: string;

  @Column({ length: 10 })
  timeframe: string; // DAILY / HOURLY

  @Column({ type: 'datetime' })
  activation_time: Date;

  @ManyToOne(() => UserAlertType, (type) => type.userAlertHistories)
  @JoinColumn({ name: 'alert_type_id' })
  alertType: UserAlertType;

  @ManyToOne(() => User, (user) => user.alertHistories)
  @JoinColumn({ name: 'nd_id' })
  user: User;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
}

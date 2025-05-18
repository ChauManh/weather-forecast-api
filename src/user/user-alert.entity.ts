import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { City } from 'src/city/city.entity';
import { UserAlertType } from './user-alert-type.entity';

@Entity('UserAlert')
export class UserAlert {
  @PrimaryGeneratedColumn()
  user_alert_id: number;

  @Column()
  nd_id: number;

  @Column()
  alert_type_id: number;

  @Column()
  city_id: number;

  @Column({ type: 'char', length: 1 })
  condition_type: string;

  @Column('float')
  alert_value: number;

  @Column({ length: 255, nullable: true })
  comment: string;

  @Column({ type: 'tinyint', default: 0 })
  activated: number;

  @ManyToOne(() => User, (user) => user.alerts)
  @JoinColumn({ name: 'nd_id' })
  user: User;

  @ManyToOne(() => UserAlertType, (type) => type.userAlerts)
  @JoinColumn({ name: 'alert_type_id' })
  alertType: UserAlertType;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
}

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { UserAlert } from './user-alert.entity';
import { UserAlertHistory } from './user-alert-history.entity';

@Entity('UserAlertType')
export class UserAlertType {
  @PrimaryColumn()
  alert_type_id: number;

  @Column({ length: 100 })
  alert_description: string;

  @OneToMany(() => UserAlert, (ua) => ua.alertType)
  userAlerts: UserAlert[];

  @OneToMany(() => UserAlertHistory, (uah) => uah.alertType)
  userAlertHistories: UserAlertHistory[];
}

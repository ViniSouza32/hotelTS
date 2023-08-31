import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public document: string;

  @Column()
  public phone: string;

  @Column()
  public email: string;

  @Column({
    type: 'timestamp',
    default: 'NOW()'
  })
  public registered_at: Date;

  @OneToMany(() => Booking, (booking) => booking.customer)
  public bookings: Promise<Booking[]>;
}

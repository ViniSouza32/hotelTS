import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Room } from "./Room";

@Entity('bookings')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'numeric',
    precision: 7,
    scale: 2
  })
  public amount: number;

  @Column({
    type: 'timestamp',
    default: 'NOW()'
  })
  public booked_at: string;

  @Column({ type: 'date' })
  public start_date: Date;

  @Column({ type: 'date' })
  public end_date: Date;

  @Column()
  public room_id: number;

  @Column()
  public customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_id' })
  public room: Room;
}

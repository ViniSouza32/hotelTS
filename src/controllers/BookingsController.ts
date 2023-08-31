import { Between, Not } from 'typeorm';
import { Booking } from '../models/Booking';
import { Customer } from '../models/Customer';
import { Room } from '../models/Room';

export class BookingsController {
  async list (): Promise<Booking[]> {
    return await Booking.find();
  }

  async create (customerId: number, roomId: number, startDate: string, endDate: string): Promise<Booking> {
    let customer: Customer | null = await Customer.findOneBy({ id: customerId });
    if (! customer) {
      throw new Error('Cliente não encontrado!');
    }

    let room: Room | null = await Room.findOneBy({ id: roomId });
    if (! room) {
      throw new Error('Quarto não encontrado!');
    }

    let start: Date = new Date(startDate);
    let end: Date = new Date(endDate);
    let bookingDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    let amount = bookingDays * room.price;

    let bookings = await Booking.find({
      where: [
        {
          room_id: room.id,
          start_date: Between(start, end),
        },
        {
          room_id: room.id,
          end_date: Between(start, end),
        },
        {
          room_id: room.id,
          start_date: Between(start, end),
          end_date: Between(start, end),
        },
      ]
    });

    if (bookings.length > 0) {
      throw new Error('Este quarto já possui uma reserva para essa data!');
    }

    return await Booking.create({
      start_date: startDate,
      end_date: endDate,
      customer_id: customerId,
      room_id: roomId,
      amount: amount,
    }).save();
  }

  async find (id: number): Promise<Booking|null> {
    return await Booking.findOneBy({ id });
  }

  async edit (booking: Booking, customerId: number, roomId: number, startDate: string, endDate: string): Promise<Booking> {
    let customer: Customer | null = await Customer.findOneBy({ id: customerId });
    if (! customer) {
      throw new Error('Cliente não encontrado!');
    }

    let room: Room | null = await Room.findOneBy({ id: roomId });
    if (! room) {
      throw new Error('Quarto não encontrado!');
    }

    let start: Date = new Date(startDate);
    let end: Date = new Date(endDate);
    let bookingDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    let amount = bookingDays * room.price;

    let bookings = await Booking.find({
      where: [
        {
          id: Not(booking.id),
          room_id: room.id,
          start_date: Between(start, end),
        },
        {
          id: Not(booking.id),
          room_id: room.id,
          end_date: Between(start, end),
        },
        {
          id: Not(booking.id),
          room_id: room.id,
          start_date: Between(start, end),
          end_date: Between(start, end),
        },
      ]
    });

    if (bookings.length > 0) {
      throw new Error('Este quarto já possui uma reserva para essa data!');
    }

    booking.start_date = start;
    booking.end_date = end;
    booking.customer_id = customerId;
    booking.room_id = roomId;
    booking.amount = amount;
    booking.save();

    return booking;
  }

  async delete (booking: Booking): Promise<void> {
    await booking.remove();
  }
}

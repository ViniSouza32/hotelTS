import { BookingsController } from '../controllers/BookingsController';
import { Booking } from '../models/Booking';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BookingsMenu {

  public controller: BookingsController;

  constructor () {
    this.controller = new BookingsController();
  }

  public show (): void {
    console.log('9 - Listar reservas');
    console.log('10 - Cadastrar novo reserva');
    console.log('11 - Editar reserva');
    console.log('12 - Excluir reserva');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '9':
        await this.list();
        break;
      case '10':
        await this.create();
        break;
      case '11':
        await this.edit();
        break;
      case '12':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let bookings: Booking[] = await this.controller.list();
    console.table(bookings);
  }

  private async create (): Promise<void> {
    let customerId: number = Number(prompt('Cliente ID: '));
    let roomId: number = Number(prompt('Quarto ID: '));
    let startDate: string = prompt('Data de check-in: ');
    let endDate: string = prompt('Data de check-out: ');
    try {
      let booking: Booking = await this.controller.create(customerId, roomId, startDate, endDate);
      console.log(`Reserva ID #${booking.id} criada com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let booking: Booking | null = await this.controller.find(id);
    if (booking) {
      let customerId: number = Number(prompt(`Cliente ID: (${booking.customer_id})`));
      let roomId: number = Number(prompt(`Quarto ID: (${booking.room_id})`));
      let startDate: string = prompt(`Data de check-in: (${booking.start_date})`);
      let endDate: string = prompt(`Data de check-out: (${booking.end_date})`);
      try {
        booking = await this.controller.edit(booking, customerId, roomId, startDate, endDate);
        console.log(`Reserva ID #${booking.id} atualizada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      console.log('Reserva não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let booking: Booking | null = await this.controller.find(id);
    if (booking) {
      await this.controller.delete(booking);
      console.log(`Reserva ID #${id} excluída com sucesso!`);
    } else {
      console.log('Reserva não encontrada!');
    }
  }
}

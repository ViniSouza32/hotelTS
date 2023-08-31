import { RoomsCotroller } from "../controllers/RoomsController";
import { Room } from "../models/Room";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class RoomsMenu {
  public controllerRoom: RoomsCotroller;

  constructor() {
    this.controllerRoom = new RoomsCotroller();
  }

  public showRooms(): void {
    console.log("5 - Listar quartos");
    console.log("6 - Cadastrar novo quarto");
    console.log("7 - Editar quarto");
    console.log("8 - Excluir quarto");
  }

  public async execute(input: string | null): Promise<void> {
    switch (input) {
      case "5":
        await this.listRooms();
        break;
      case "6":
        await this.createRoom();
        break;
      case "7":
        await this.editRoom();
        break;
      case "8":
        await this.deleteRoom();
        break;
    }
  }

  private async listRooms(): Promise<void> {
    let rooms = await this.controllerRoom.listRooms();
    console.table(rooms);
  }

  private async createRoom(): Promise<void> {
    let number: string = prompt("Numero: ");
    let type: string = prompt("Tipo: ");
    let capacity: number = Number(prompt("Capacidade: "));
    let price: number = Number(prompt("Preço: "));


    let room = await this.controllerRoom.createRoom(number, type, capacity, price);

    console.log(`Quarto criando com sucesso!`);
  }

  private async editRoom() {
    let id: number = Number(prompt("Qual o ID?"));
    let room: Room | null = await this.controllerRoom.find(id);


    if (room) {
      room.number = prompt(`Numero #${room.number}`, room.number);
      room.type = prompt(`Tipo #${room.type}`, room.type);
      room.capacity = Number(prompt(`Capacidade #${room.capacity}`, String(room.capacity)));
      room.price = Number(prompt(`Preço #${room.price}`, String(room.price)));
      await room.save();

      console.log("Quarto atualizado com sucesso!");
    } else {
      console.log(`Id fornecido não foi encontrado`);
    }
  }

  private async deleteRoom() {
    let id: number = Number(prompt("Qual o ID?"));

    let room = await this.controllerRoom.find(id);
    if (room) {
      await this.controllerRoom.deleteRoom(room);
      console.log("Quarto deletado com sucesso!");
    } else {
      console.log(`id: ${id} não encotrado`);
    }
  }
}

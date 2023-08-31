import { Room } from "../models/Room";

export class RoomsCotroller {

  async listRooms(): Promise<Room[]> {
    return await Room.find();
  }

  async createRoom(number: string, type: string, capacity: number, price: number) {

    let room: Room = await Room.create({
      number,
      type,
      capacity,
      price,
    }).save();

  }

  async find(id: number) {
    return await Room.findOneBy({ id });
  }

  async editRoom(room: Room ,number: string, type: string, capacity: number, price: number) {
    room.number = number;
    room.type = type;
    room.capacity = capacity;
    room.price = price;
    await room.save();

    return room;
  }

  async deleteRoom(room: Room): Promise<void> {
    await room.remove();
  }
}

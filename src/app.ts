import DB from "./db";
import { CustomersMenu } from "./views/CustomersMenu";
import { RoomsMenu } from "./views/RoomsMenu";
import { BookingsMenu } from './views/BookingsMenu';
import PromptSync from "prompt-sync";

const prompt = PromptSync();


let input: string | null = " ";

async function main(): Promise<void> {
  await DB.initialize();

  let customersMenu = new CustomersMenu();
  let roomsMenu = new RoomsMenu();
  let bookingsMenu = new BookingsMenu();

  do {
    console.clear();
    customersMenu.show();
    roomsMenu.showRooms();
    bookingsMenu.show();
    console.log("0 - Sair");
    input = prompt("Selecione a opção desejada: ");

    if (input != "0") {
      await customersMenu.execute(input);
      await roomsMenu.execute(input);
      await bookingsMenu.execute(input);

      prompt("Pressione enter para continuar");
    }
  } while (input != "0");

}


main();

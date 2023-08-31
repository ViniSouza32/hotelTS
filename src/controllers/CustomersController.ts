import { Customer } from "../models/Customer";

export class CustomersCotroller {

  async list(): Promise<Customer[]> {
    return await Customer.find();
  }

  async create(name: string, email: string, phone: string, document: string) {

    return await Customer.create({
      name,
      email,
      phone,
      document,
      //da pra omitir o segundo email pq o nome é igual, se for diferente não da
    }).save();

  }

  async find(id: number): Promise<Customer|null> {
    return await Customer.findOneBy({ id });
  }

  async edit(customer: Customer, name: string, email: string, phone: string, document: string) {
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.document = document;
    await customer.save();

    return customer;
  }

  async delete(customer: Customer): Promise<void> {
    await customer.remove();
  }
}

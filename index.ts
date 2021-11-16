import * as remove from "lodash/reverse";
import * as orderBy from "lodash/orderby";
import * as fs from "fs";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const archivoJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const archivoParseado = JSON.parse(archivoJson);

    archivoParseado.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: Number): Product {
    const cosas = this.getCosas();
    return cosas.find((item) => {
      item.id == id;
    });
  }

  removeProduct(id: Number) {
    remove(this.cosas, (c) => {
      c.id = id;
    });
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };

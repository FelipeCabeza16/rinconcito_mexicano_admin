const moment = require("moment");
const mongoose = require("mongoose");
// ADMIN
const rinconcito = mongoose.Types.ObjectId();

// CLIENTS
const client1 = mongoose.Types.ObjectId();
const client2 = mongoose.Types.ObjectId();
const client3 = mongoose.Types.ObjectId();

// PRODUCTS
const productHamburguesa = mongoose.Types.ObjectId();
const productPapas = mongoose.Types.ObjectId();
const productMicheladaAguila = mongoose.Types.ObjectId();
const productCazuela = mongoose.Types.ObjectId();

// BOOKINGS
const booking1 = mongoose.Types.ObjectId();
const booking2 = mongoose.Types.ObjectId();

// TABLES
const table1 = mongoose.Types.ObjectId();
const table2 = mongoose.Types.ObjectId();
const table3 = mongoose.Types.ObjectId();
const table4 = mongoose.Types.ObjectId();
const table5 = mongoose.Types.ObjectId();
const table6 = mongoose.Types.ObjectId();
const table7 = mongoose.Types.ObjectId();
const table8 = mongoose.Types.ObjectId();
const table9 = mongoose.Types.ObjectId();

// TABLE STATUS
const tableStatusFree = mongoose.Types.ObjectId();
const tableStatusOccupied = mongoose.Types.ObjectId();
const tableStatusNotAvailable = mongoose.Types.ObjectId();
const tableStatusBooking = mongoose.Types.ObjectId();

const config = require("../config");

module.exports = {
  bookings: [
    {
      _id: booking1,
      price: 100000,
      products: [
        {
          product: productCazuela,
          quantity: 1,
        },
        {
          product: productHamburguesa,
          quantity: 2,
        },
      ],
      table: table1,
      client: client1,
    },
    {
      _id: booking2,
      price: 200000,
      products: [
        {
          product: productCazuela,
          quantity: 2,
        },
        {
          product: productHamburguesa,
          quantity: 1,
        },
      ],
      table: table3,
      client: client3,
    },
  ],

  clients: [
    {
      _id: client1,
      document: "11111",
      email: "karen@gmail.com",
      firstName: "Karen",
      lastName: "Rokas",
      phone: "3213213218",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: client2,
      document: "22222",
      email: "felipe@gmail.com",
      firstName: "Felipe",
      lastName: "Cabeza",
      phone: "3204408369",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: client3,
      document: "33333",
      email: "daniel@gmail.com",
      firstName: "Daniel",
      lastName: "Ardila",
      phone: "3022901384",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
  ],

  counters: {
    _id: "entityId",
    seq: 1,
  },

  products: [
    {
      _id: productHamburguesa,
      name: "Hamburguesa Sencilla",
      description: "250 g de carne con jamón y queso americano",
      basePrice: 10000,
      isAvailable: true,
      profilePhoto:
        "https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: productCazuela,
      name: "Cazuela de mariscos",
      description: "Cazuela de mariscos con queso y tomate",
      basePrice: 20000,
      isAvailable: true,
      profilePhoto:
        "https://images-gmi-pmc.edge-generalmills.com/5afd09f0-ba17-40c0-a175-21ec63ec3f17.jpg",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },

    {
      _id: productMicheladaAguila,
      name: "Michelada de Aguila",
      description: "Michelada de Aguila con limón",
      basePrice: 6000,
      isAvailable: true,
      profilePhoto:
        "https://s1.eestatic.com/2017/09/20/cocinillas/cocinillas_248240413_116379354_1024x576.jpg",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },

    {
      _id: productPapas,
      name: "Papas a la francesa",
      description: "Deliciosas papas a la francesa",
      basePrice: 5000,
      isAvailable: true,
      profilePhoto:
        "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2021/01/papas-en-freidora-de-aire.jpg",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
  ],

  restaurants: [
    {
      _id: rinconcito,
      name: "Rinconcito Mexicano",
      document: "123456789",
      password: "holamundo",
      description: "Restaurante mexicano",
      email: "rinconcitomexicano@gmail.com",
      phone: "3203203203",
      products: [
        productCazuela,
        productCazuela,
        productMicheladaAguila,
        productPapas,
      ],
      tables: [
        table1,
        table2,
        table3,
        table4,
        table5,
        table6,
        table7,
        table8,
        table9,
      ],
    },
  ],

  tables: [
    {
      _id: table1,
      createdBy: rinconcito,
      tableStatues: [tableStatusFree],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: table2,
      createdBy: rinconcito,
      tableStatues: [tableStatusOccupied],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },

    {
      _id: table3,
      createdBy: rinconcito,
      tableStatues: [tableStatusFree, tableStatusOccupied],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: table4,
      createdBy: rinconcito,
      tableStatues: [tableStatusFree],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },

    {
      _id: table5,
      createdBy: rinconcito,
      tableStatues: [tableStatusOccupied, tableStatusFree, tableStatusBooking],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: table6,
      createdBy: rinconcito,
      tableStatues: [tableStatusOccupied],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: table7,
      createdBy: rinconcito,
      tableStatues: [tableStatusFree],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },

    {
      _id: table8,
      createdBy: rinconcito,
      tableStatues: [tableStatusOccupied, tableStatusFree, tableStatusBooking],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
    {
      _id: table9,
      createdBy: rinconcito,
      tableStatues: [tableStatusOccupied],
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    },
  ],
  tableStatues: [
    {
      _id: tableStatusFree,
      status: "Libre",
      description: "La mesa está libre",
    },
    {
      _id: tableStatusOccupied,
      status: "Ocupada",
      description: "La mesa está ocupada",
    },
    {
      _id: tableStatusBooking,
      status: "Reservada",
      description: "La mesa está reservada para ...",
    },
    {
      _id: tableStatusNotAvailable,
      status: "No disponible",
      description: "La mesa no está disponible",
    },
  ],
};

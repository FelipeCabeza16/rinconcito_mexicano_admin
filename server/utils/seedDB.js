const mongoose = require("mongoose");

const Booking = require("../models/booking");
const Counter = require('../models/counter');
const Client = require("../models/client");
const Product = require("../models/product");
const Restaurant = require('../models/restaurant');
const Table = require("../models/table");
const TableStatus = require("../models/tableStatus");

const config = require("../config");
const data = require("./data");

class DB {
  constructor() {
    this.bookings = data.bookings;
    this.clients = data.clients;
    this.counter = data.counters;
    this.products = data.products;
    this.restaurants = data.restaurants;
    this.tables = data.tables;
    this.tableStatues = data.tableStatues;

    this.models = [
      Booking,
      Client,
      Counter,
      Product,
      Restaurant,
      Table,
      TableStatus,
    ];
  }

  async cleanDb() {
    for (let model of this.models) {
        await model.deleteMany({}, () => {}).clone();
        console.log(`Data for model ${model.collection.collectionName} Deleted!`)
    }
}

  async pushDataToDb() {
    await this.bookings.forEach(async (booking) => {
      await new Booking(booking).save(() => {});
    });
    await this.clients.forEach(async (client) => {
      await new Client(client).save(() => {});
    });
    await new Counter(this.counter).save(() => {})

    await this.products.forEach(async (product) => {
      await new Product(product).save(() => {});
    });

    await this.restaurants.forEach(async (restaurant) => {
      await new Restaurant(restaurant).save(() => {});
    });


    await this.tables.forEach(async (table) => {
      await new Table(table).save(() => {});
    });

    await this.tableStatues.forEach(async (tableStatus) => {
      await new TableStatus(tableStatus).save(() => {});
    });


    console.log("Database Populated!");
  }

  async seedDb() {
    await this.cleanDb();
    await this.pushDataToDb();
  }
}
mongoose
  .connect(config.MONGODB_URL, { useNewUrlParser: true })
  .then(async () => {
    debugger;
    const db = new DB();
    await db.seedDb();
    console.log("You can close connection now!");
  })
  .catch((err) => {
    console.log(err);
  });

const Booking = require("../models/booking");

exports.createBooking = async (req, res) => {
  try {
    const clientID = req.body.clientID;
    const tableID = req.body.tableID;
    const products = [];

    for (let i = 0; i < req.body.products.length; i++) {
      products.push(req.body.products[i]);
    }

    const booking = new Booking({ 
        client: clientID,
        table: tableID,
        products: products, 
     });
    await booking.calculatePrice;         
    await booking.save();
    res.status(201).send({ booking });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

exports.getBookingById = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).send({ booking });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  };

  exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find()
      res.status(200).send({ bookings });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  };
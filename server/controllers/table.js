const Table = require("../models/table");
const TableStatus = require("../models/tableStatus");
const Restaurant = require("../models/restaurant");
const config = require("../config");

exports.createRestaurantTables = async (req, res) => {
  try {
    const tableQuantity = parseInt(req.params.tableQuantity);
    if (tableQuantity < 1 || tableQuantity > 100) {
      throw new Error("La cantidad de mesas no es válida");
    }
    const restaurant = await Restaurant.findById(req.restaurant._id);
    if (restaurant.tables.length > 0) {
      throw new Error("Ya existen mesas en este establecimiento");
    }
    const tables = [];
    // Save tables on a array and on a DB
    for (let i = 0; i < tableQuantity; i++) {
      const tableStatus = new TableStatus({
        status: config.TABLE_AVAILABLE,
        description: "Mesa creada el " + new Date().toLocaleString(),
        startAt: [Date.now()],
      });
      await tableStatus.save();
      const table = new Table({
        isAvailable: true,
        tableStatues: [tableStatus._id],
        createdBy: req.restaurant._id,
      });
      await table.save();
      tables.push(table);
    }
    // PUSH ID'S INTO ESTABLISHMENT
    for (let i = 0; i < tables.length; i++) {
      restaurant.tables.push(tables[i]._id);
    }
    await restaurant.save();
    res.send({ tables });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// We need fast request, not necessary to get all tables statues, (not populate)
exports.getRestaurantTables = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.restaurant._id
    ).populate("tables");
    if (restaurant.tables.length === 0) {
      throw new Error("No tienes mesas, añade al menos una");
    }
    const tables = restaurant.tables;
    res.send({ tables });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

exports.getTableStatusByID = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate('tableStatues');
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    res.send({ tableStatus: table.tableStatues[table.tableStatues.length - 1] });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

exports.getTableByID = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate('tableStatues');
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    res.send({ table });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

exports.addTable = async (req, res) => {
  try {
    const tableStatus = new TableStatus({
      status: config.TABLE_AVAILABLE,
      description: "Mesa creada el " + new Date().toLocaleString(),
      startAt: [Date.now()],
    });
    await tableStatus.save();
    // NOW GET THE ID
    const table = new Table({
      isAvailable: true,
      tableStatues: [tableStatus._id],
      createdBy: req.restaurant._id,
    });
    const restaurant = await Restaurant.findById(req.restaurant._id);
    restaurant.tables.push(table._id);
    await table.save();
    await restaurant.save();
    res.send({ table });
  } catch (e) {
    res.status(500).send({ error: "Error guardando la mesa" });
  }
};

exports.switchTableNotAvailable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    const canUpdate =
    table.createdBy.toString() == req.restaurant._id.toString();
    if (!canUpdate) {
      throw new Error("No tienes permiso para hacer esa operacion");
    }

    const tableAvailable = await table.isTheTableAvailable();
    const tableNotAvailable = await table.isTheTableNotAvailable();
    if (!tableAvailable) {
      throw new Error("La mesa no está disponible");
    }
    if (tableNotAvailable) {
      throw new Error("La mesa no se encuentra disponible");
    }

    // ADD TO finishAt Date.now()
    await table.addFinishDateLastStatus();
    table.isAvailable = false;
    await table.save();
    const tableStatus = new TableStatus({
      status: config.TABLE_NOT_AVAILABLE,
      description: "Mesa no disponible el " + new Date().toLocaleString(),
      startAt: [Date.now()],
    });
    table.tableStatues.push(tableStatus._id);
    await tableStatus.save();
    await table.save();
    res.send({ table });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.switchTableAvailable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    const canUpdate =
    table.createdBy.toString() == req.restaurant._id.toString();
    if (!canUpdate) {
      throw new Error("No tienes permiso para hacer esa operacion");
    }

    const tableAvailable = await table.isTheTableAvailable();
    if (tableAvailable) {
      throw new Error("La mesa ya está disponible");
    }

    // ADD TO finishAt Date.now()
    await table.addFinishDateLastStatus();

    const tableStatus = new TableStatus({
      status: config.TABLE_AVAILABLE,
      description: "Mesa disponible el " + new Date().toLocaleString(),
      startAt: [Date.now()],
    });
    table.tableStatues.push(tableStatus._id);
    await tableStatus.save();
    await table.save();
    res.send({ table });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.switchTableOccupy = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    const canUpdate =
    table.createdBy.toString() == req.restaurant._id.toString();
    if (!canUpdate) {
      throw new Error("No tienes permiso para hacer esa operacion");
    }
    const tableOccupy = await table.isTheTableOccupy();
    const tableAvailable = await table.isTheTableAvailable();
    if (tableOccupy) {
      throw new Error("La mesa ya está ocupada");
    }
    if (!tableAvailable) {
      throw new Error("La mesa no está disponible");
    }
    // ADD TO finishAt Date.now()
    await table.addFinishDateLastStatus();

    const tableStatus = new TableStatus({
      status: config.TABLE_OCCUPY,
      description: "Mesa ocupada el " + new Date().toLocaleString(),
      startAt: [Date.now()],
    });
    table.tableStatues.push(tableStatus._id);
    await tableStatus.save();
    await table.save();
    res.send({ table });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.switchTableBooking = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    const canUpdate =
    table.createdBy.toString() == req.restaurant._id.toString();
    if (!canUpdate) {
      throw new Error("No tienes permiso para hacer esa operacion");
    }
    const tableBooking = await table.isTheTableBooked();
    const tableAvailable = await table.isTheTableAvailable();

    if (!tableAvailable) {
      throw new Error("La mesa no está disponible");
    }
    if (tableBooking) {
      throw new Error("La mesa ya está reservada");
    }
    // ADD TO finishAt Date.now()
    await table.addFinishDateLastStatus();

    const tableStatus = new TableStatus({
      status: config.TABLE_BOOKING,
      description: "Mesa reservada el " + new Date().toLocaleString(),
      startAt: [Date.now()],
    });
    table.tableStatues.push(tableStatus._id);
    await tableStatus.save();
    await table.save();
    res.send({ table });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteTableByID = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      throw new Error("No se encontró esa mesa");
    }
    const restaurant = await Restaurant.findById(
      req.restaurant._id
    ).populate("tables");

    const hasTable = restaurant.tables.find(
      (table) => table._id.toString() === req.params.id
    );
    if (!hasTable) {
      throw new Error("No se encontró esa mesa en el establecimiento");
    }
    restaurant.tables = restaurant.tables.filter(
      (table) => table._id.toString() !== req.params.id
    );
    await restaurant.save();
    res.status(200).send({ tables: restaurant.tables });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

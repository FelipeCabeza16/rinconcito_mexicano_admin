const express = require('express')
require('./db/mongoose')
// const serviceRouter = require('./routers/service')

const restaurantRouter = require('./routes/restaurant')
const productRouter = require('./routes/product')
const tableRouter = require('./routes/table')
const clientRouter = require('./routes/client')
const bookingRouter = require('./routes/booking')



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(restaurantRouter)
app.use(tableRouter)
app.use(productRouter)
app.use(clientRouter)
app.use(bookingRouter)
// app.use(androidDeviceInfoRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

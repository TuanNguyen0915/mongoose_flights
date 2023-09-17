import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airplane: {
    type: String, enum: ['American', 'SouthWest', 'United']
  },
  airport: {
    type: String, enum: ['DEN', 'AUS', 'DFW', 'LAX', 'SAN'],
    default: "DEN"
  },
  flightNo: {
    type: Number, min: 10, max: 9999
  },
  depart: {
    type: Date,
  }
}, {
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export { Flight }
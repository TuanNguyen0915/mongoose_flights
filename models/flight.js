import mongoose from "mongoose";

function addOneYear() {
  let now = new Date()
  now.setFullYear(now.getFullYear() + 1)
  return now
}


const Schema = mongoose.Schema

const flightSchema = new Schema({
  airplane: { type: String, enum: ['American', 'SouthWest', 'United'] },
  airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN' },
  flightNo: { type: Number, min: 10, max: 9999 },
  departs: { type: Date, default: addOneYear() }
}, {
  timestamps: true

})


const Flight = mongoose.model("Flight", flightSchema)

export { Flight }
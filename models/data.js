const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    user: 
      {
        email: Schema.Types.String,
      }
    ,
    zoneId: {
      type: Number,
      required: true
    },
    sousZoneId: {
      type: Number,
      required: true,
    },
    climat: {
      type: String,
      required: true
    },
    activity: {
      type: String,
      required: true
    },
    clothing: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;

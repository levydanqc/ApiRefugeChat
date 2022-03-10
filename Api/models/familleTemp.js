const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familleTempSchema = new Schema({
  adresse: {
    type: String,
    required: true,
  },
  chatons: [
    {
      chatonId: {
        type: Schema.Types.ObjectId,
        ref: "Chaton",
      },
    },
  ],
});

module.exports = mongoose.model("FamilleTemp", familleTempSchema);

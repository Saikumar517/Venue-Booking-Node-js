const venue = require("../models/BookingVenue");
const moment = require("moment");
const asyncHandler = require("../middleware/trrCatch");
const Usermodel = require("../models/userModel");

//importing the required modules

exports.getAllSlots = async (req, res) => {
  const getSlots = await venue.find();
  res.status(200).json({
    msg: "slots fetched",
    Venues: getSlots.length, // getting the venues by using FInd method()
    data: getSlots,
  });
};

exports.singleSlot = asyncHandler(async (req, res) => {
  const { id } = req.params; // deleting the user slot
  const data = await venue.findById(id);
  if (data) res.status(200).send(data);
  else {
    res.status(404).send(`No Slots found`);
  }
});

exports.bookingSlot = asyncHandler(async (req, res) => {
  const date = req.body.bookingDate;
  const name = req.body.name;
  const userSlot = req.body.slot; //getting the data from user

  const bookingDay = moment(new Date(date)).add(1, "days");
  console.log(date, name, userSlot, bookingDay);
  const bookings = await venue.find({ bookingDate: bookingDay });
  console.log(bookings);
  const isBooked = bookings.some((booking) => booking.slot === userSlot); // validating the slot
  if (!isBooked) {
    const newBooking = new venue({
      // booking the slot if there is no booking
      name,
      bookingDate: bookingDay,
      slot: userSlot,
      isBooked: true,
    });
    await newBooking.save();
    res.status(201).send(newBooking);
  } else {
    res.status(406).send(`Your selected  ${userSlot} slot is already booked `);
  }
});

exports.updateSlot = asyncHandler(async (req, res) => {
  const updatingSlot = await venue.findByIdAndUpdate(req.params.id, req.body); // updating the Venue By using its ID
  if (!this.updateSlot) {
    res.status(200).send("No Slot found");
  } else {
    res.status(201).json({
      message: "Your slot is Updated",
      data: updatingSlot,
    });
  }
});

exports.deleteSlot = asyncHandler(async (req, res) => {
  const { id } = req.params; // deleting the user slot

  const data = await venue.findByIdAndDelete(id);
  if (data) res.status(200).send("Your selected slot is deleted");
  else {
    res.status(404).send(`Slot does not exist`);
  }
});

exports.approveOrRejectslot = async (req, res) => {
  const requestApproval = await Usermodel.find();
  console.log(requestApproval);
  const isApproved = requestApproval.some(async (apporver) => {
    if (apporver.role === "admin") {
      const updatingSlot = await venue.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).send(updatingSlot);
    } else {
      res.status(406).send(`You are not authorized `);
    }
  });
};

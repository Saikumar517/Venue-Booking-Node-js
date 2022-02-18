const venue = require("../models/bookingSlot");
const moment = require("moment");
const asyncHandler = require("../middleware/tryCatch");
//importing the required modules

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
    });
    await newBooking.save();
    res.status(201).send(newBooking);
  } else {
    res.status(406).send(`Your selected  ${userSlot} slot is already booked `);
  }
});

exports.updateSlot = asyncHandler(async (req, res) => {
  const date = req.body.date;
  const name = req.body.name;
  const userSlot = req.body.slot; //getting data from user

  const id = req.params.id;

  const bookingDay = moment(new Date(date)).add(1, "days");

  const bookings = await venue.find({ bookingDay });

  const isBooked = bookings.some((booking) => booking.slot === userSlot);
  if (!isBooked) {
    const updateBooking = await venue.findByIdAndUpdate(
      id,
      {
        name,
        bookingDay,
        slot: userSlot,
      },
      { new: true, runValidators: true } // updaing the user slot
    );
    res.status(201).send(updateBooking);
  } else {
    res.status(406).send(` Your selected  ${userSlot} slot is already booked `);
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

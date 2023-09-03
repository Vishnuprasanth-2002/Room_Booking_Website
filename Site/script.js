const selected = document.querySelector("#rooms");
const date_time = document.querySelector("#datetime");
const serial = document.querySelector("#sl-no");
let bookings = [];

// Load existing bookings from local storage
const storedBookingsString = localStorage.getItem("bookings");
if (storedBookingsString) {
  bookings = JSON.parse(storedBookingsString);
}

document.querySelector(".btn").addEventListener("click", function () {
  let selected_value = selected.value;
  let date_time_value = new Date(date_time.value);
  let end_time = new Date(date_time_value.getTime() + 30 * 60000);
  const para = document.querySelector("#details");

  if (!selected_value || date_time_value == "Invalid Date") {
    alert("Please select the details properly.");
  } else {
    // Check if the selected slot is already booked
    const isSlotBooked = bookings.some((booking) => {
      const startTime = new Date(booking.startTime);
      const endTime = new Date(booking.endTime);
      return (
        booking.room === selected_value &&
        date_time_value >= startTime &&
        date_time_value <= endTime
      );
    });

    if (isSlotBooked) {
      alert("This slot is already booked. Please choose another slot.");
    } else {
      let newBooking = {
        room: selected_value,
        startTime: date_time_value.toString(),
        endTime: end_time.toString(),
      };
      bookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      display_booking();
    }
  }
});
// Assuming you have already loaded the bookings array from local storage as shown in your previous code

document.querySelector("#cancel-btn").addEventListener("click", function () {
  let serialNumber = serial.value;
  if (
    !isNaN(serialNumber) &&
    serialNumber >= 0 &&
    serialNumber < bookings.length
  ) {
    // Remove the booking at the specified serial number
    bookings.splice(serialNumber, 1);

    // Update local storage with the modified bookings array
    localStorage.setItem("bookings", JSON.stringify(bookings));

    display_booking();

    // Clear the input field
    document.querySelector("#sl-no").value = "";
  } else {
    alert("Please enter a valid serial number.");
  }
});
function display_booking() {
  // Display the updated booking list
  const para = document.querySelector("#details");
  const array_text = bookings
    .map((booking, index) => {
      return (
        index.toString() +
        ". " +
        booking.room +
        "=>" +
        new Date(booking.startTime).toLocaleString() +
        "-" +
        new Date(booking.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    })
    .join("<br>");
  para.innerHTML = array_text;
}

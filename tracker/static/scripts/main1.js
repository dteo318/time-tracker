// To trigger modal card for adding event
const add_event_icon = document.getElementById("add-event-icon");
const add_event_modal_cancel_button = document.getElementById(
  "add-event-modal-card-cancel-button"
);
const add_event_modal_close_button = document.getElementById(
  "add-event-modal-card-close-button"
);

add_event_icon.addEventListener("click", function () {
  const modal_div = document.getElementById("add-event-modal-div");
  modal_div.classList.add("is-active");
});

add_event_modal_cancel_button.addEventListener("click", function () {
  const modal_div = document.getElementById("add-event-modal-div");
  modal_div.classList.remove("is-active");
});

add_event_modal_close_button.addEventListener("click", function () {
  const modal_div = document.getElementById("add-event-modal-div");
  modal_div.classList.remove("is-active");
});

// To handle saving an event - Temp logging to console as JSON
const add_event_modal_save_button = document.getElementById(
  "add-event-modal-card-save-button"
);

add_event_modal_save_button.addEventListener("click", function () {
  console.log("SAVED EVENT");
  const add_event_modal_date_select = document.getElementById("event-date");
  const add_event_modal_time_select = document.getElementById("event-time");
  const add_event_modal_desc_select = document.getElementById("event-desc");

  const selected_event_date = add_event_modal_date_select.value;
  const selected_event_time = add_event_modal_time_select.value;
  const selected_event_desc = add_event_modal_desc_select.value;

  const add_event_data = {
    selected_event_date: selected_event_date,
    selected_event_time: selected_event_time,
    selected_event_desc: selected_event_desc,
  };

  console.log(add_event_data);

  // Closing add event modal after saving
  const modal_div = document.getElementById("add-event-modal-div");
  modal_div.classList.remove("is-active");
});

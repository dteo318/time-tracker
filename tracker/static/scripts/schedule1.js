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

  // Set modal date selector to current date
  const day_date = document.getElementById("day-date");
  const add_event_modal_date_select = document.getElementById("event-date");
  add_event_modal_date_select.value = day_date.value;

  // Set modal time selector to current time
  const add_event_modal_time_select = document.getElementById("event-time");
  let current_time = new Date();
  const current_hours = current_time.getHours(); // => 9
  const current_minutes = current_time.getMinutes(); // =>  30

  current_time = current_hours + ":" + current_minutes;
  add_event_modal_time_select.value = current_time;

  console.log("MODAL CURRENT DATE AND TIME SET");
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

function formatDate(event_date) {
  // 2021-06-03 -> 3 Jun 2021
  const year = event_date.split("-")[0];
  const day = parseInt(event_date.split("-")[2]);
  let month = "";

  switch (parseInt(event_date.split("-")[1])) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }

  return `${day} ${month} ${year}`;
}

function buildCard(event_date, event_time, event_duration, event_desc) {
  const card_container = document.createElement("div");
  card_container.className = "card";

  const card_image = document.createElement("div");
  card_image.className = "card-image";
  const card_image_figure = document.createElement("figure");
  card_image_figure.className = "image is-4by3";
  const card_image_img = document.createElement("img");
  card_image_img.src = "https://bulma.io/images/placeholders/1280x960.png";
  card_image_img.alt = "Placeholder image";

  card_image_figure.appendChild(card_image_img);
  card_image.appendChild(card_image_figure);
  card_container.appendChild(card_image);

  const card_content = document.createElement("div");
  card_content.className = "card-content";

  const card_content_media = document.createElement("div");
  card_content_media.className = "media";
  //   Removed media left portion
  //   const card_content_media_left = document.createElement("div");
  //   card_content_media_left.className = "media-left";
  //   const card_content_media_figure = document.createElement("figure");
  //   card_content_media_figure.className = "image is-48x48";
  //   const card_content_media_img = document.createElement("img");
  //   card_content_media_img.src = "https://bulma.io/images/placeholders/96x96.png";
  //   card_content_media_img.alt = "Placeholder image";
  //   card_content_media_figure.appendChild(card_content_media_img);
  //   card_content_media_left.appendChild(card_content_media_figure);
  //   card_content_media.appendChild(card_content_media_left);

  const card_content_media_content = document.createElement("div");
  card_content_media_content.className = "media-content";
  const card_content_media_content_title = document.createElement("p");
  card_content_media_content_title.className = "title is-4";
  card_content_media_content_title.innerHTML = event_time;
  card_content_media_content.appendChild(card_content_media_content_title);
  const card_content_media_content_sub_title = document.createElement("p");
  card_content_media_content_sub_title.className = "subtitle is-6";
  card_content_media_content_sub_title.innerHTML =
    "Duration: " + event_duration + "mins";
  card_content_media_content.appendChild(card_content_media_content_sub_title);
  card_content_media.appendChild(card_content_media_content);

  card_content.appendChild(card_content_media);

  const card_content_content = document.createElement("div");
  card_content_content.className = "content";
  card_content_content.innerHTML = event_desc;

  const card_content_content_br = document.createElement("br");
  card_content_content.appendChild(card_content_content_br);
  const card_content_content_time = document.createElement("time");
  card_content_content_time.innerHTML = formatDate(event_date);
  card_content_content.appendChild(card_content_content_time);

  card_content.appendChild(card_content_content);

  card_container.appendChild(card_content);

  return card_container;
}

function addEventCard(add_event_data) {
  const day_event_column_1 = document.getElementById("day-event-column-1");
  const day_event_column_2 = document.getElementById("day-event-column-2");
  const day_event_column_3 = document.getElementById("day-event-column-3");
  const day_event_column_4 = document.getElementById("day-event-column-4");

  const event_date = add_event_data.selected_event_date;
  const event_time = add_event_data.selected_event_time;
  const event_desc = add_event_data.selected_event_desc;
  const event_duration = add_event_data.selected_event_duration;
  const event_card = buildCard(
    event_date,
    event_time,
    event_duration,
    event_desc
  );

  const event_tile = document.createElement("div");
  event_tile.className = "tile is-child";
  event_tile.appendChild(event_card);

  const event_time_bracket = add_event_data.selected_event_time_bracket;
  switch (event_time_bracket) {
    case 1:
      day_event_column_1.appendChild(event_tile);
      break;
    case 2:
      day_event_column_2.appendChild(event_tile);
      break;
    case 3:
      day_event_column_3.appendChild(event_tile);
      break;
    case 4:
      day_event_column_4.appendChild(event_tile);
      break;
  }

  console.log("CARD ADDED!");
}

function inTimeBracket(time) {
  const hours = time.split(":")[0];
  const mins = time.split(":")[1];

  if (hours >= 7 && hours < 12) {
    return 1;
  } else if (hours >= 12 && hours < 17) {
    return 2;
  } else if (hours >= 17 && hours < 22) {
    return 3;
  } else {
    return 4;
  }
}

// TODO Allow for deletion of events

add_event_modal_save_button.addEventListener("click", function () {
  console.log("SAVED EVENT");
  const add_event_modal_date_select = document.getElementById("event-date");
  const add_event_modal_time_select = document.getElementById("event-time");
  const add_event_modal_duration_select = document.getElementById(
    "event-duration"
  );
  const add_event_modal_desc_select = document.getElementById("event-desc");

  const selected_event_date = add_event_modal_date_select.value;
  const selected_event_time = add_event_modal_time_select.value;
  const selected_event_duration = add_event_modal_duration_select.value;
  const selected_event_desc = add_event_modal_desc_select.value;

  const add_event_data = {
    selected_event_date: selected_event_date,
    selected_event_time: selected_event_time,
    selected_event_duration: selected_event_duration,
    selected_event_desc: selected_event_desc,
    selected_event_time_bracket: inTimeBracket(selected_event_time),
  };

  $.ajax({
    url: "/ajax/add_event",
    data: add_event_data,
    dataType: "json",
    success: function (data) {
      // Reading response data
      console.log(data.result);

      addEventCard(add_event_data);

      // Clearing previous event description
      add_event_modal_desc_select.value = "";

      //   Clearing previous event duration
      const add_event_modal_duration_select = document.getElementById(
        "event-duration"
      );
      add_event_modal_duration_select.value = "";

      // Closing add event modal after saving
      const modal_div = document.getElementById("add-event-modal-div");
      modal_div.classList.remove("is-active");
    },
  });
});

// Setting date to current date on load
function setCurrentDayDate() {
  const day_date = document.getElementById("day-date");
  let current_date = new Date();
  const dd = String(current_date.getDate()).padStart(2, "0");
  const mm = String(current_date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = current_date.getFullYear();

  current_date = yyyy + "-" + mm + "-" + dd;

  day_date.value = current_date;
  console.log("CURRENT DATE SET!");

  loadDayEvents();
}

function loadDayEvents() {
  console.log("Date has changed! Loading events for the day...");

  const day_date = document.getElementById("day-date");

  $.ajax({
    url: "/ajax/read_day_events",
    data: {
      date: day_date.value,
    },
    dataType: "json",
    success: function (data) {
      const response_events = JSON.parse(data.events);
      console.log(response_events);
      console.log("Working");
      //   Clearing previous event cards
      const day_event_column_1 = document.getElementById("day-event-column-1");
      const day_event_column_2 = document.getElementById("day-event-column-2");
      const day_event_column_3 = document.getElementById("day-event-column-3");
      const day_event_column_4 = document.getElementById("day-event-column-4");

      day_event_column_1.innerHTML = "";
      day_event_column_2.innerHTML = "";
      day_event_column_3.innerHTML = "";
      day_event_column_4.innerHTML = "";

      //   Loading events as cards

      console.log("Loading event cards");

      for (i = 0; i < response_events.length; i++) {
        event_obj = response_events[i];
        console.log(event_obj);
        const event_data = {
          selected_event_date: data.date,
          selected_event_time: event_obj.fields.task_start_time,
          selected_event_duration: event_obj.fields.task_duration,
          selected_event_desc: event_obj.fields.task_done,
          selected_event_time_bracket: inTimeBracket(
            event_obj.fields.task_start_time
          ),
        };

        addEventCard(event_data);
      }
    },
  });
}

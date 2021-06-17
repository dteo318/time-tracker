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

function formatTime24To12(time) {
  const hours_24 = time.split(":")[0];
  const mins = time.split(":")[1];
  const am_pm = hours_24 > 12 ? "PM" : "AM";

  const hours_12 = hours_24 % 12;

  return hours_12 + ":" + mins + " " + am_pm;
}

function buildCard(
  event_date,
  event_time,
  event_duration,
  event_desc,
  event_pk
) {
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
  const card_content_content_edit_icon = document.createElement("i");
  card_content_content_edit_icon.className = "fas fa-edit ml-3";
  card_content_content_edit_icon.id = "edit-" + event_pk;
  card_content_content.appendChild(card_content_content_edit_icon);
  const card_content_content_delete_icon = document.createElement("i");
  card_content_content_delete_icon.className =
    "fas fa-trash-alt is-pulled-right mt-1";
  card_content_content_delete_icon.id = "delete-" + event_pk;
  card_content_content.appendChild(card_content_content_delete_icon);

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
  const event_time = formatTime24To12(add_event_data.selected_event_time);
  const event_desc = add_event_data.selected_event_desc;
  const event_duration = add_event_data.selected_event_duration;
  const event_pk = add_event_data.selected_event_pk;
  const event_card = buildCard(
    event_date,
    event_time,
    event_duration,
    event_desc,
    event_pk
  );

  const event_tile = document.createElement("div");
  event_tile.className = "tile is-child";
  event_tile.appendChild(event_card);
  event_tile.addEventListener("click", function (e) {
    if (!e.target.id) {
      return;
    }

    const tile_click_type = e.target.id.split("-")[0];
    const tile_pk = e.target.id.split("-")[1];

    switch (tile_click_type) {
      case "delete":
        $.ajax({
          url: "/ajax/delete_event",
          data: {
            event_pk: tile_pk,
          },
          dataType: "json",
          success: function (data) {
            console.log("Event deleted");
          },
        });

        this.remove();
        console.log("Event card removed");
        break;

      case "edit":
        //   Triggering edit event modal
        const edit_event_modal_div = document.getElementById(
          "edit-event-modal-div"
        );
        edit_event_modal_div.classList.add("is-active");

        const edit_event_modal_cancel_button = document.getElementById(
          "edit-event-modal-card-cancel-button"
        );
        const edit_event_modal_close_button = document.getElementById(
          "edit-event-modal-card-close-button"
        );
        edit_event_modal_cancel_button.addEventListener("click", function () {
          const modal_div = document.getElementById("edit-event-modal-div");
          modal_div.classList.remove("is-active");
        });

        edit_event_modal_close_button.addEventListener("click", function () {
          const modal_div = document.getElementById("edit-event-modal-div");
          modal_div.classList.remove("is-active");
        });

        // Setting modal fields to current values
        const edit_event_date_field = document.getElementById("new-event-date");
        const edit_event_time_field = document.getElementById("new-event-time");
        const edit_event_duration_field = document.getElementById(
          "new-event-duration"
        );
        const edit_event_desc_field = document.getElementById("new-event-desc");
        $.ajax({
          url: "/ajax/get_event_info",
          data: {
            event_pk: tile_pk,
          },
          dataType: "json",
          success: function (data) {
            edit_event_date_field.value = data.date;
            edit_event_time_field.value = data.time;
            edit_event_duration_field.value = data.duration;
            edit_event_desc_field.value = data.desc;
          },
        });

        // Updating database
        const edit_tile_save_changes_button = document.getElementById(
          "edit-event-modal-card-save-button"
        );
        edit_tile_save_changes_button.onclick = function () {
          const new_event_data = {
            event_pk: tile_pk,
            event_date: edit_event_date_field.value,
            event_time: edit_event_time_field.value,
            event_duration: edit_event_duration_field.value,
            event_desc: edit_event_desc_field.value,
          };

          $.ajax({
            url: "/ajax/edit_event_info",
            data: new_event_data,
            dataType: "json",
            success: function (data) {
              const event_data = {
                selected_event_date: data.event_date,
                selected_event_time: data.event_time,
                selected_event_duration: data.event_duration,
                selected_event_desc: data.event_desc,
                selected_event_time_bracket: inTimeBracket(data.event_time),
                selected_event_pk: data.event_pk,
              };

              addEventCard(event_data);
              e.target.parentNode.parentNode.parentNode.parentNode.remove();
            },
          });

          edit_event_modal_div.classList.remove("is-active");
          console.log("Tile changes saved");
        };

        break;
    }
  });

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
      // Loading weather
      const weather_avg_temp = data.weather_avg_temp;
      const weather_icon = data.weather_icon;
      const weather_location = data.weather_location;

      if (weather_avg_temp) {
        updateWeatherIcon(weather_avg_temp, weather_icon, weather_location);
      } else {
        getLocation();
      }

      // Loading current summary
      const selected_summary = data.summary;

      if (selected_summary) {
        const day_summary_input = document.getElementById("day-summary");
        day_summary_input.value = selected_summary;
      }

      // Loading feeling selected
      const selected_feeling = data.feeling;

      if (selected_feeling) {
        const selected_feeling_id = "feeling-selector-" + selected_feeling;
        const selected_feeling_elem = document.getElementById(
          selected_feeling_id
        );

        selected_feeling_elem.classList.add("has-text-primary");
        current_feeling_selected = selected_feeling_id;
      }

      const response_events = JSON.parse(data.events);
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
        console.log(event_obj.pk);
        const event_data = {
          selected_event_date: data.date,
          selected_event_time: event_obj.fields.task_start_time,
          selected_event_duration: event_obj.fields.task_duration,
          selected_event_desc: event_obj.fields.task_done,
          selected_event_time_bracket: inTimeBracket(
            event_obj.fields.task_start_time
          ),
          selected_event_pk: event_obj.pk,
        };

        addEventCard(event_data);
      }
    },
  });
}

// Setting feeling for the day
const feeling_selector = document.getElementById("feeling-selector");
let current_feeling_selected = null;

feeling_selector.addEventListener("click", function (e) {
  const selected_feeling_id = e.target.id;
  console.log(`${selected_feeling_id} feeling selected...`);

  const selected_feeling = document.getElementById(selected_feeling_id);

  if (!selected_feeling) {
    return;
  }

  if (current_feeling_selected === selected_feeling_id) {
    const previous_selected_feeling = document.getElementById(
      current_feeling_selected
    );

    previous_selected_feeling.classList.remove("has-text-primary");

    current_feeling_selected = null;
  } else if (current_feeling_selected) {
    const previous_selected_feeling = document.getElementById(
      current_feeling_selected
    );

    previous_selected_feeling.classList.remove("has-text-primary");
    selected_feeling.classList.add("has-text-primary");

    current_feeling_selected = selected_feeling_id;
  } else {
    selected_feeling.classList.add("has-text-primary");

    current_feeling_selected = selected_feeling_id;
  }

  const day_date = document.getElementById("day-date");
  const update_type = current_feeling_selected
    ? "set-feeling"
    : "remove-feeling";

  $.ajax({
    url: "/ajax/update_day_feeling",
    data: {
      update_type: update_type,
      date: day_date.value,
      selected_feeling: current_feeling_selected,
    },
    dataType: "json",
    success: function (data) {
      console.log("Feeling updated in database");
    },
  });
});

// Handling day summary
const day_summary_input = document.getElementById("day-summary");

day_summary_input.addEventListener("focusin", function () {
  day_summary_input.classList.add("has-background-primary-light");
});

day_summary_input.addEventListener("focusout", function () {
  day_summary_input.classList.remove("has-background-primary-light");

  const day_summary = day_summary_input.value;
  const day_date = document.getElementById("day-date");

  $.ajax({
    url: "/ajax/update_day_summary",
    data: {
      date: day_date.value,
      summary: day_summary,
    },
    dataType: "json",
    success: function (data) {
      console.log("Day summary has been updated");
    },
  });
});

// Getting day weather
function getLocation() {
  console.log("Loading weather...");
  // Getting current location
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      getWeather_LongLat,
      console.log
    );
  }
}

function updateWeatherIcon(avg_temp, icon_src, location) {
  const day_weather_div = document.getElementById("day-weather");
  day_weather_div.innerHTML = "";

  const weather_img = document.createElement("img");
  weather_img.src = "https:" + icon_src;
  const weather_temp = document.createElement("p");
  weather_temp.innerHTML = avg_temp + " | " + location;

  day_weather_div.appendChild(weather_img);
  day_weather_div.appendChild(weather_temp);

  console.log("Weather set!");
}

function getWeather_LongLat(location_obj) {
  const latitude = location_obj.coords.latitude;
  const longitude = location_obj.coords.longitude;

  const day_date = document.getElementById("day-date");
  const location = latitude + ", " + longitude;

  const weather_api_key = "110afb9ef708408bac442550211506";
  const weather_req_url =
    "http://api.weatherapi.com/v1/history.json?key=" +
    weather_api_key +
    "&q=" +
    location +
    "&dt=" +
    day_date.value;

  $.ajax({
    url: weather_req_url,
    success: function (data) {
      console.log("Weather found!");
      const day_avg_temp = data.forecast.forecastday[0].day.avgtemp_f;
      const day_weather_img_src =
        data.forecast.forecastday[0].day.condition.icon;
      const location_name = data.location.name;
      const location_region = data.location.region;
      const location_display_name = location_name + ", " + location_region;

      updateWeatherIcon(
        day_avg_temp,
        day_weather_img_src,
        location_display_name
      );

      $.ajax({
        url: "/ajax/update_weather",
        data: {
          date: day_date.value,
          weather_avg_temp: day_avg_temp,
          weather_icon: day_weather_img_src,
          weather_location: location_display_name,
        },
        dataType: "json",
        success: function (data) {
          console.log("Weather updated in database");
        },
      });
    },
    error: function () {
      console.log("Unable to find weather...");
      const day_weather_div = document.getElementById("day-weather");
      day_weather_div.innerHTML = "";

      const no_weather_temp = document.createElement("p");
      no_weather_temp.innerHTML = "Unknown...";

      day_weather_div.appendChild(no_weather_temp);

      console.log("Unknown weather set!");
    },
  });
}

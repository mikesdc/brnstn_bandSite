//compiling HTML elements in shows section

const showsContainer = document.querySelector(".shows");

// clearing current shows list

const clearShowsContainer = () => {
  showsContainer.innerHTML = "";

  const showsHeader = document.createElement("h2");
  showsContainer.append(showsHeader);
  showsHeader.className = "heading";
  showsHeader.innerText = "Shows";
};

clearShowsContainer();

// convert date format

const convertDateFormat = (input) => {
  let conversion = new Date(input);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ddd = daysOfWeek[conversion.getDay()];
  const mmm = months[conversion.getMonth()];
  const DD = conversion.getDate();
  const YYYY = conversion.getFullYear();

  let DDformatted;
  if (DD.toString().length == 2) {
    DDformatted = DD.toString();
  } else {
    DDformatted = `0${DD}`;
  }

  return `${ddd} ${mmm} ${DDformatted} ${YYYY}`;
};

// create tour cards

let insertShowsRow = function (index) {
  const tourRow = document.createElement("div");
  showsContainer.append(tourRow);
  tourRow.className = "tour-row";

  const dateCol = document.createElement("div");
  tourRow.append(dateCol);
  dateCol.className = "date-column";

  const dateHeader = document.createElement("div");
  dateCol.append(dateHeader);
  dateHeader.className = "date-header";
  dateHeader.innerText = "date";

  const date = document.createElement("div");
  dateCol.append(date);
  date.className = "date";
  date.innerText = convertDateFormat(shows[index].date);

  const venueCol = document.createElement("div");
  tourRow.append(venueCol);
  venueCol.className = "venue-column";

  const venueHeader = document.createElement("div");
  venueCol.append(venueHeader);
  venueHeader.className = "venue-header";
  venueHeader.innerText = "venue";

  const venue = document.createElement("div");
  venueCol.append(venue);
  venue.className = "venue";
  venue.innerText = shows[index].place;

  const locationCol = document.createElement("div");
  tourRow.append(locationCol);
  locationCol.className = "location-column";

  const locationHeader = document.createElement("div");
  locationCol.append(locationHeader);
  locationHeader.className = "location-header";
  locationHeader.innerText = "location";

  const locationProperty = document.createElement("div");
  locationCol.append(locationProperty);
  locationProperty.className = "location";
  locationProperty.innerText = shows[index].location;

  const buttonCol = document.createElement("div");
  tourRow.append(buttonCol);
  buttonCol.className = "button-column";

  const buttonHeader = document.createElement("div");
  buttonCol.append(buttonHeader);
  buttonHeader.className = "button-header";
  buttonHeader.innerText = "empty";

  const button = document.createElement("div");
  buttonCol.append(button);
  button.className = "button";

  const buttonElement = document.createElement("button");
  button.append(buttonElement);
  buttonElement.innerText = "BUY TICKETS";
};

// create column headers (tablet and desktop views)

let insertTopRow = function () {
  const topRow = document.createElement("div");
  showsContainer.append(topRow);
  topRow.className = "top-row";

  const dateCol = document.createElement("div");
  topRow.append(dateCol);
  dateCol.className = "date-column";

  const dateHeader = document.createElement("div");
  dateCol.append(dateHeader);
  dateHeader.className = "date-header show";
  dateHeader.innerText = "date";

  const venueCol = document.createElement("div");
  topRow.append(venueCol);
  venueCol.className = "venue-column";

  const venueHeader = document.createElement("div");
  venueCol.append(venueHeader);
  venueHeader.className = "venue-header show";
  venueHeader.innerText = "venue";

  const locationCol = document.createElement("div");
  topRow.append(locationCol);
  locationCol.className = "location-column";

  const locationHeader = document.createElement("div");
  locationCol.append(locationHeader);
  locationHeader.className = "location-header show";
  locationHeader.innerText = "location";

  const buttonCol = document.createElement("div");
  topRow.append(buttonCol);
  buttonCol.className = "button-column";

  const buttonHeader = document.createElement("div");
  buttonCol.append(buttonHeader);
  buttonHeader.className = "button-header";
  buttonHeader.innerText = "empty";
};

// get shows data from API, then build shows rows

let shows = [];

function displayShowsArray() {
  for (i = 0; i < shows.length; i++) {
    insertShowsRow(i);
  }
}

axios
  .get(
    "https://project-1-api.herokuapp.com/showdates/?api_key=76939858-13a2-4b72-aac5-8a04f51020bd"
  )

  .then((result) => {
    shows = result.data;
    clearShowsContainer();
    insertTopRow();

    displayShowsArray();

    // event listener for selected row
    const rowsList1 = document.querySelectorAll(".tour-row");

    for (let i = 0; i < rowsList1.length; i++) {
      rowsList1[i].addEventListener("click", function () {
        rowsList1.forEach((element) => element.classList.remove("active"));
        rowsList1[i].classList.add("active");
      });
    }
  });

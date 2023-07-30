let shows = [
    {
        id: 1,
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
      },
      {
        id: 2,
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
      },
      {
        id: 3,
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA",
      },
      {
        id: 4,
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
      },
      {
        id: 5,
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA",
      },
      {
        id: 6,
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA",
      },
];

//compiling HTML elements in shows section

const showsContainer = document.querySelector(".shows")

showsContainer.innerHTML = "";

const showsHeader = document.createElement("h2");
showsContainer.append(showsHeader);
showsHeader.className = "heading"
showsHeader.innerText = "Shows";




// create tour cards

let insertShowsRow = function (index) {
const tourRow = document.createElement("div");
showsContainer.append(tourRow);
tourRow.className = "tourRow";

    const dateCol = document.createElement("div");
    tourRow.append(dateCol);
    dateCol.className = "dateCol";

        const dateHeader = document.createElement("div");
        dateCol.append(dateHeader);
        dateHeader.className = "dateHeader";
        dateHeader.innerText = "date"

        const date = document.createElement("div");
        dateCol.append(date);
        date.className = "date";
        date.innerText = shows[index].date;

    const venueCol = document.createElement("div");
    tourRow.append(venueCol);
    venueCol.className = "venueCol";

        const venueHeader = document.createElement("div");
        venueCol.append(venueHeader);
        venueHeader.className = "venueHeader";
        venueHeader.innerText = "venue"

        const venue = document.createElement("div");
        venueCol.append(venue);
        venue.className = "venue";
        venue.innerText = shows[index].venue;

    const locationCol = document.createElement("div");
    tourRow.append(locationCol);
    locationCol.className = "locationCol";

        const locationHeader = document.createElement("div");
        locationCol.append(locationHeader);
        locationHeader.className = "locationHeader";
        locationHeader.innerText = "location"

        const locationProperty = document.createElement("div");
        locationCol.append(locationProperty);
        locationProperty.className = "location";
        locationProperty.innerText = shows[index].location;

    const buttonCol = document.createElement("div");
    tourRow.append(buttonCol);
    buttonCol.className = "buttonCol";

        const buttonHeader = document.createElement("div");
        buttonCol.append(buttonHeader);
        buttonHeader.className = "buttonHeader";
        buttonHeader.innerText = "empty";
        

        const button = document.createElement("div");
        buttonCol.append(button);
        button.className = "button";

        const buttonElement = document.createElement("button");
        button.append(buttonElement);
        buttonElement.innerText = "BUY TICKETS";
    };


// replicate cards for each array object

function displayShowsArray() {
    for (i = 0; i < shows.length; i++) {
        insertShowsRow(i);
        }
};

displayShowsArray();


// event listener for selected row

const rowsList1 = document.querySelectorAll(".tourRow");
console.log(rowsList1);
for (let i = 0; i < rowsList1.length; i++) {
  rowsList1[i].addEventListener("click", function () {

    rowsList1.forEach(element=> element.classList.remove("active"));

    rowsList1[i].classList.add("active");
  });
};


const firstDateHeader = document.querySelector(".dateHeader");
firstDateHeader.classList.add("show");

const firstVenueHeader = document.querySelector(".venueHeader");
firstVenueHeader.classList.add("show");

const firstLocationHeader = document.querySelector(".locationHeader");
firstLocationHeader.classList.add("show");

const firstButtonHeader = document.querySelector(".buttonHeader");
firstButtonHeader.classList.add("show");
// starting comments array
let comments = [
  {
    id: 3,
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    id: 2,
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    id: 1,
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

//compiling comments onto HTML

//function to clear all comments
function clearCommentsContainer() {
  commentsContainer.innerHTML = "";
}

//function to generate a comment card element, and add comment contents
const commentsContainer = document.querySelector(
  ".comments__comments-container"
);

let displayComment = function (index) {
  const cardDiv = document.createElement("div");
  commentsContainer.append(cardDiv);
  cardDiv.className = "comments__comment-card";

  const photoDiv = document.createElement("div");
  cardDiv.append(photoDiv);
  photoDiv.className = "comments__comment-photo";

  const contentDiv = document.createElement("div");
  cardDiv.append(contentDiv);
  contentDiv.className = "comments__comment-content";

  const contentHeaderDiv = document.createElement("div");
  contentDiv.append(contentHeaderDiv);
  contentHeaderDiv.className = "comments__comment-header";

  const headerNameDiv = document.createElement("div");
  contentHeaderDiv.append(headerNameDiv);
  headerNameDiv.className = "comments__comment-header-name";
  headerNameDiv.innerText = comments[index].name;

  const headerDateDiv = document.createElement("div");
  contentHeaderDiv.append(headerDateDiv);
  headerDateDiv.className = "comments__comment-header-date";
  headerDateDiv.innerHTML = comments[index].date;

  const commentDiv = document.createElement("div");
  contentDiv.append(commentDiv);
  commentDiv.className = "comments__comment-comment";
  commentDiv.innerText = comments[index].comment;
};

function displayCommentsArray() {
  clearCommentsContainer();

  for (i = 0; i < comments.length; i++) {
    displayComment(i);
  }
}

displayCommentsArray();

//Section for adding new comment to array

//setting up functions for event listener

let addCommentToArray = function () {
  const nameField = document.getElementById("nameField");
  let formNameValue = nameField.value;

  const commentField = document.getElementById("commentField");
  let formCommentValue = commentField.value;

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  let monthTimestamp;
  if (month.toString().length == 2) {
    monthTimestamp = month.toString();
  } else {
    monthTimestamp = `0${month}`;
  }

  let dateNumTimestamp;
  if (date.toString().length == 2) {
    dateNumTimestamp = date.toString();
  } else {
    dateNumTimestamp = `0${date}`;
  }

  const dateTimestamp = `${monthTimestamp}/${dateNumTimestamp}/${year}`;

  const newComment = {
    id: comments[0].id + 1,
    name: formNameValue,
    date: dateTimestamp,
    comment: formCommentValue,
  };

  comments.unshift(newComment);
};

// Button Behaviour - including form validation

function formButtonHandler(event) {
  event.preventDefault();

  //add error states when field is blank
  if (!nameField.value) {
    nameField.classList.add("error");
    nameField.setAttribute("placeholder", "");
  }

  if (!commentField.value) {
    commentField.classList.add("error");
    commentField.setAttribute("placeholder", "");
  }

  //if both fields are filled, proceed with posting comment

  if (nameField.value && commentField.value) {
    addCommentToArray();
    displayCommentsArray();

    //clear form contents and any error states

    const allInputs = document.querySelectorAll(".comments-field");
    allInputs.forEach((instance) => (instance.value = ""));

    nameField.classList.remove("error");
    commentField.classList.remove("error");
  }
}

const formButton = document.querySelector(".formButton");
formButton.addEventListener("click", formButtonHandler);

//clear error states on click

nameField.addEventListener("click", () => {
  nameField.classList.remove("error");
  nameField.setAttribute("placeholder", "Enter your name");
});

commentField.addEventListener("click", () => {
  commentField.classList.remove("error");
  commentField.setAttribute("placeholder", "Add a new comment");
});

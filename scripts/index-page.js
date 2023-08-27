//function to clear all comments from the page

const commentsContainer = document.querySelector(
  ".comments__comments-container"
);

function clearCommentsContainer() {
  commentsContainer.innerHTML = "";
}

// Getting comments data from API

//separating apiKey in order to change API keys when needed

let apiKey = "16980c9b-44c4-40fb-8942-b040eccfbdc3";

let apiMainURL = "https://project-1-api.herokuapp.com/?api_key=" + apiKey;
let commentsURL =
  "https://project-1-api.herokuapp.com/comments/?api_key=" + apiKey;

//https://project-1-api.herokuapp.com/?api_key=76939858-13a2-4b72-aac5-8a04f51020bd

//function to pull comments from API and display on page

const displayComments = () => {
  axios
    .get(commentsURL)
    .then((result) => {
      const commentData = result.data;
      commentData.sort((a, b) => b.timestamp - a.timestamp);

      clearCommentsContainer();

      let displayAPIComment = function (index) {
        // function for creating dynamic timestamp

        const relativeTimestamp = function (timestamp) {
          const rightNow = new Date();
          const pastDate = new Date(timestamp);

          let dateDifference = (rightNow - pastDate) / 1000;

          if (dateDifference < 120) {
            return "A few seconds ago";
          } else if (dateDifference < 3600) {
            return `${Math.ceil(dateDifference / 60)} minutes ago`;
          } else if (dateDifference < 86400) {
            return `${Math.ceil(dateDifference / 60 / 60)} hours ago`;
          } else if (dateDifference < 518400) {
            return `${Math.ceil(dateDifference / 60 / 60 / 24)} days ago`;
          } else if (dateDifference < 1209600) {
            return `${Math.ceil(dateDifference / 60 / 60 / 24 / 7)} weeks ago`;
          } else if (dateDifference < 3628800) {
            return "About a month ago";
          } else if (dateDifference < 4838400) {
            return `${Math.ceil(
              dateDifference / 60 / 60 / 24 / 30
            )} months ago`;
          } else {
            const month = pastDate.getMonth() + 1;
            const date = pastDate.getDate();
            const year = pastDate.getFullYear();

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
            return dateTimestamp;
          }
        };

        // building comment card and inserting comment details with relative date

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
        headerNameDiv.innerText = commentData[index].name;

        const headerDateDiv = document.createElement("div");
        contentHeaderDiv.append(headerDateDiv);
        headerDateDiv.className = "comments__comment-header-date";
        headerDateDiv.innerText = relativeTimestamp(
          commentData[index].timestamp
        );

        const commentDiv = document.createElement("div");
        contentDiv.append(commentDiv);
        commentDiv.className = "comments__comment-comment";
        commentDiv.innerText = commentData[index].comment;
      };

      function displayAPICommentsArray() {
        clearCommentsContainer();

        for (i = 0; i < commentData.length; i++) {
          displayAPIComment(i);
        }
      }

      clearCommentsContainer();
      displayAPICommentsArray();
    })
    .catch((error) => {
      console.log(error);
    });
};

displayComments();

//function for posting new comment to API and refreshing comments on page

let addCommentToArray = function () {
  const nameField = document.getElementById("nameField");
  let formNameValue = nameField.value;

  const commentField = document.getElementById("commentField");
  let formCommentValue = commentField.value;

  const newComment = {
    name: formNameValue,
    comment: formCommentValue,
  };

  axios.post(commentsURL, newComment).then(() => {
    displayComments();
  });
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



// function to load a fresh group of comments (only present for ease of review)

function getNewApiKey() {
  apiKeyTest = axios
    .get("https://project-1-api.herokuapp.com/register/")
    .then((result) => {
      apiKeyNew = result.data.api_key;

      apiMainURL = "https://project-1-api.herokuapp.com/?api_key=" + apiKeyNew;
      commentsURL =
        "https://project-1-api.herokuapp.com/comments/?api_key=" + apiKeyNew;

      console.log("Getting new API key:");
      console.log(result.data.api_key);
      displayComments();
      console.log("Comments from new API key loaded");
    });
}

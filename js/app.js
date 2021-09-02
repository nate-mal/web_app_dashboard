//test timeout

// notifications
const notificationSection = document.getElementById("notifications");

//not bell alert
function notifyAlert() {
  function checkForNotificationsAlert() {
    notificationContainers = notificationSection.children;
    if (notificationContainers) {
      for (each of notificationContainers) {
        if (!each.classList.contains("canceled")) {
          if (
            !document
              .querySelector(".notifications-bell")
              .className.includes("alert")
          )
            document.querySelector(".notifications-bell").className += " alert";
          return true;
        }
      }
    }
    return false;
  }

  if (!checkForNotificationsAlert()) {
    if (
      document.querySelector(".notifications-bell").className.includes("alert")
    )
      document.querySelector(".notifications-bell").className = document
        .querySelector(".notifications-bell")
        .className.replace("alert", "");
  }
}
notifyAlert();
notificationSection.addEventListener("click", (e) => {
  const element = e.target;

  if (element.classList.contains("notification-container-close")) {
    const notificationContainer = element.parentNode;
    notificationContainer.classList += " canceled";
    $(notificationContainer).slideUp(300);
    notifyAlert();
  }
});
// function hasNotifications(notificationSection) {
//   notifyContainers = notificationSection.children;
//   for (eachContainer of notifyContainers) {
//     if (eachContainer.style.display !== "none") return true;
//   }
//   return false;
// }
// notificationSection.addEventListener("change", () => {
//   if (hasNotifications(notificationSection)) {
//     if (!notificationSection.parentNode.className.includes("hasNotifications"))
//       notificationSection.parentNode.className += " hasNotifications";
//   } else
//     notificationSection.parentNode.className.replace("hasNotifications", "");
// });

//ALERT BANNER
const alertBanner = document.getElementById("alert");
// create the html for the banner
alertBanner.innerHTML = `
<div class="alert-banner">
<p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
to complete</p>
<p class="alert-banner-close">x</p>
</div>
`;
$(alertBanner).hide().delay(600).slideDown();

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    $(alertBanner).slideUp(500);
  }
});

let trafficCanvas = document.querySelector("#traffic-chart");
const canvasContainer = trafficCanvas.parentNode;
let trafficDataHourly = {
  labels: [
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
  ],
  datasets: [
    {
      data: [50, 12, 10, 20, 15, 17, 50, 18, 22, 15, 25],
      backgroundColor: "rgba(116, 119, 191, .5)",
      borderWidth: 1,
    },
  ],
};
let trafficDataDaily = {
  labels: [
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ],
  datasets: [
    {
      data: [75, 50, 100, 200, 1500, 150, 250, 150, 250, 500, 500],
      backgroundColor: "rgba(116, 119, 191, .5)",
      borderWidth: 1,
    },
  ],
};
let trafficDataWeekly = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31",
  ],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
      backgroundColor: "rgba(116, 119, 191, .5)",
      borderWidth: 1,
    },
  ],
};
let trafficDataMonthly = {
  labels: [
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
  ],
  datasets: [
    {
      data: [
        750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500, 1500,
      ],
      backgroundColor: "rgba(116, 119, 191, .5)",
      borderWidth: 1,
    },
  ],
};
let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 1000,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficDataWeekly,
  options: trafficOptions,
});

// Set daily  Barchart

const dailyCanvas = document.getElementById("daily-chart");
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: "#7477BF",
      borderWidth: 1,
    },
  ],
};
const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions,
});

// Set Doughnut Chart
const mobileCanvas = document.getElementById("mobile-chart");
const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "# of Users",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"],
    },
  ],
};
const mobileOptions = {
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 20,
        fontStyle: "bold",
      },
    },
  },
};
let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions,
});

// ///show back-home anc when scroling

$(window).scroll(function () {
  if ($(window).scrollTop() == 0) {
    $("#back-home").hide(100);
  } else {
    $("#back-home").fadeIn(1000);
  }
});

//traffic section
function resetCanvas(canvasContainer) {
  let newTrafficCanvas = document.createElement("canvas");
  newTrafficCanvas.id = canvasContainer.querySelector("canvas").id;
  canvasContainer.innerHTML = "";
  canvasContainer.appendChild(newTrafficCanvas);

  return newTrafficCanvas;
}
const trafficSection = document.querySelector(".traffic");

trafficSection.addEventListener("click", (e) => {
  if (e.target.className.includes("btn")) {
    const button = e.target;
    const buttonContainer = button.parentNode;
    for (eachButton of buttonContainer.children) {
      eachButton.className = eachButton.className.replace("btn-selected", "");
    }
    button.className += " btn-selected";
    // if (button.textContent === "Hourly") {
    //   let trafficData = trafficDataHourly;}
    let trafficData;
    switch (button.textContent.toLowerCase()) {
      case "hourly":
        trafficData = trafficDataHourly;
        break;
      case "daily":
        trafficData = trafficDataDaily;
        break;
      case "weekly":
        trafficData = trafficDataWeekly;
        break;
      default:
        trafficData = trafficDataMonthly;
    }

    let trafficChart = new Chart(resetCanvas(canvasContainer), {
      type: "line",
      data: trafficData,
      options: trafficOptions,
    });
  }
});

// Messaging Section
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
send.addEventListener("click", () => {
  // ensure user and message fields are filled out
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
  } else if (message.value === "") {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});
var search_terms = [
  "Victoria Chambers",
  "Dale Byrd",
  "Dawn Wood",
  "Dan Oliver",
  "Peter Fox",
  "William Sonoma",
];
autocomplete(user, search_terms);

// SETTINGS
const settingsContainer = document.querySelector("#settings-section");
const sendEmailNotifications = settingsContainer.querySelector(
  "#sendEmailNotification"
);
const setProfilePublic = settingsContainer.querySelector("#setProfilePublic");
const timeZone = settingsContainer.querySelector("#timezone");
const saveSettings = settingsContainer.querySelector("#save");
const resetSettings = settingsContainer.querySelector("#cancel");
const defaultSettingsData = {
  sendEmailNotifications: false,
  setProfilePublic: false,
  timeZone: "default",
};
function pushSettingsToLocalStorage(settingsDataToPush) {
  localStorage.setItem("settingsData", JSON.stringify(settingsDataToPush));
}
if (!localStorage.getItem("settingsData")) {
  pushSettingsToLocalStorage(defaultSettingsData);
}

function displaySavedSettings(settingsData) {
  function setTimeZone() {
    const value = settingsData["timeZone"];
    timeZone.querySelector("option[value=" + value + "]").selected = true;
  }
  sendEmailNotifications.checked = settingsData["sendEmailNotifications"];
  setProfilePublic.checked = settingsData["setProfilePublic"];
  setTimeZone();
}

window.onload = () => {
  displaySavedSettings(JSON.parse(localStorage.getItem("settingsData")));
};

saveSettings.addEventListener("click", () => {
  let settingsData = {};
  if (sendEmailNotifications.checked == 1) {
    settingsData.sendEmailNotifications = true;
  } else settingsData.sendEmailNotifications = false;
  if (setProfilePublic.checked == 1) {
    settingsData.setProfilePublic = true;
  } else settingsData.setProfilePublic = false;
  var timeZoneValue = timeZone.options[timeZone.selectedIndex].value;
  settingsData.timeZone = timeZoneValue;
  pushSettingsToLocalStorage(settingsData);
});
resetSettings.addEventListener("click", () => {
  displaySavedSettings(defaultSettingsData);
});

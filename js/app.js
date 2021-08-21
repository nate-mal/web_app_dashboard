// notifications
const notificationSection = document.getElementById("notifications");

notificationSection.addEventListener("click", (e) => {
  const element = e.target;

  if (element.classList.contains("notification-container-close")) {
    const notificationContainer = element.parentNode;
    $(notificationContainer).slideUp(300);
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

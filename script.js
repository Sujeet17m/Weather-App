// console.log("Welcome to Magic notes app. Write your notes here.");
// showNotes();

// let myBtn = document.getElementById('myBtn');

// myBtn.addEventListener('click', function (e) {
//     let textArea = document.getElementById('textarea');
//     let notes = localStorage.getItem('notes');
//     if (notes == null) {
//         notesObj = [];
//     } else {
//         notesObj = JSON.parse(notes);
//     }
//     notesObj.push(textArea.value);
//     localStorage.setItem("notes", JSON.stringify(notesObj));

//     textArea.value = " ";
//     showNotes();
// })

// function showNotes() {

//     let notes = localStorage.getItem('notes');
//     if (notes == null) {
//         notesObj = [];
//     }
//     else {
//         notesObj = JSON.parse(notes);
//     }
//     console.log(notesObj);
//     let html = "";
//     notesObj.forEach(function (element, index) {

//         html += `<div class="noteBox">
//         <h3 class="noteHeading">Note ${index + 1}</h3>
//         <p class="paraHeading">${element}</p>
//         <button class="buttonHeading" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
//         </div>`;

//     });

//     let notesElem = document.getElementById('notes');
//     if (notesObj.length !== 0) {
//         notesElem.innerHTML = html;
//     } else {
//         notesElem.innerHTML = `Nothing to show, create a new note from "Add a note" section above.`;
//     }

// }




// function deleteNote(index) {
    

//     let notes = localStorage.getItem('notes');

//     if (notes == null) {
//         notesObj = [];
//     } else {
//         notesObj = JSON.parse(notes);
//     }

//     notesObj.splice(index, 1);
//     localStorage.setItem('notes', JSON.stringify(notesObj));
//     showNotes();
// }

// let search = document.getElementById('search');
// search.addEventListener('input', function () {

//     let inputVal = search.value;
    

//     let noteBoxs = document.getElementsByClassName('noteBox');
//     Array.from(noteBoxs).forEach(function (element) {
//         let boxTxt = document.getElementsByTagName('p')[0].innerHTML;
//         if (boxTxt.includes(inputVal)) {
//             element.style.display = "block";
//         } else {
//             element.style.display = "none";
//         }

//     })
// })

let weather = {
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Rourkela");
  
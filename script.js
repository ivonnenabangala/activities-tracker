let activities = []

let activityId = 1
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("goToForm").addEventListener("click", function () {
        document.querySelector(".body").style.display = "none";
        document.querySelector(".body-form").style.display = "flex";
    });

    document.querySelector(".remove-icon button").addEventListener("click", function () {
        document.querySelector(".body").style.display = "flex";
        document.querySelector(".body-form").style.display = "none";
    });
});


const addActivity = () => document.getElementById("activityForm").onsubmit()
const form = document.getElementById("activityForm")
form.onsubmit = (event) => {
    event.preventDefault()

    const name = document.getElementById("activityName").value
    const image = document.getElementById("activityImg").value
    const date = document.getElementById("activityDate").value

    console.log(
        name,
        image,
        date
    )

    const myActivity = {
        id: activityId++,
        name: name,
        image: image,
        date: date
    }
    activities.push(myActivity)
    form.reset()
    console.log(activities);
    displayActivity(myActivity)

}

const displayActivity = () => {
    let container = document.getElementById("cards");
    container.innerHTML = "";
    for (let activity of activities) {
        const activityDate = new Date(activity.date);
        const currentDate = new Date();

        const time = currentDate - activityDate;
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const containerCard = document.createElement('div');
        containerCard.className = 'card';

        containerCard.innerHTML = `
            <img src="${activity.image}" alt="activity image" class="card-image">
            <p>${activity.date}</p>
            <p>${activity.name}</p>
            <p>${days} days</p>
        `;
        containerCard.onclick = () => {
            const popUpCard = document.getElementById('popUpCard');
            popUpCard.innerHTML = `
            <img id="popupImage" src="${activity.image}" alt="image">
            <h3 id="popupTitle">${activity.name}</h3>
            <p id="popUpDate">${activity.date}</p>
            <p>${days} days</p>
            <div class="popUp-btns">
                <button onclick="closePopUp()" class="close-btn">Close</button>
                <button onclick="deleteActivity(${activity.id}); closePopUp()" class="delete-btn">Delete</button>
            </div>
            `
            popUpCard.style.display = 'block';
        };


        container.appendChild(containerCard);
    }
};
const openPopUp = () => {
    
}

const deleteActivity = (id) => {
    let index = activities.map(myActivity => {
        return myActivity.id
    }).indexOf(id)
    activities.splice(index, 1)
    displayActivity()
}


const closePopUp = () => document.querySelector(".popupCard").style.display = "none";

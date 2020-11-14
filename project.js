const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body");
const clear = document.getElementById("clear-films");



//UI objesini başlatma
const ui = new UI();

//Storage Objesi üret
const storage = new Storage();



//Tüm eventleri yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    cardBody.addEventListener("click", deleteFilm);

    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmFromStorage();
        ui.loadAllFilms(films);
    });

        clear.addEventListener("click", clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //hata
        ui.displayMessages("Tüm alanları doldurun", "danger");
    } 
    else{
        //Yeni Film
        const newFilm = new Film(title, director, url);
        ui.addFilmtoUI(newFilm); //arayüze film ekleme
        storage.addFilmToStoarage(newFilm); // Storage ye film ekleme
        ui.displayMessages("film başarıyla eklendi", "success");
    }


    ui.clearInputs(titleElement, urlElement, directorElement);




    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-item"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages ("silme işlemi başarılı","success")
    }
    e.preventDefault();
}

function clearAllFilms(){

    if (confirm("Emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}
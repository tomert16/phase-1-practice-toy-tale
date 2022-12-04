 let addToy = false;
 let toyCollection = document.getElementById('toy-collection');
 let createToy = document.getElementsByClassName("add-toy-form");
 const newToyName = document.getElementsByClassName("input-text");
 const newToyImage = document.getElementsByClassName("input-text");
 
 document.addEventListener("DOMContentLoaded", () => {
   const addBtn = document.querySelector("#new-toy-btn");
   const toyFormContainer = document.querySelector(".container");
   addBtn.addEventListener("click", () => {
     // hide & seek with the form
    addToy = !addToy;
     if (addToy) {
       toyFormContainer.style.display = "block";
     } else {
       toyFormContainer.style.display = "none";
     }
   });
 });

//////////////////////Displaying toys in web browser////////////////////////////////
 function renderToys(toys){
  //Toy Name
  let h2 = document.createElement("h2");
  h2.innerText = toys.name;
  //Toy Image
  let img = document.createElement("img");
  img.src = toys.image;
  img.setAttribute("class","toy-avatar");
  //Toy Likes
  let p = document.createElement("p");
  p.innerText = `${toys.likes} Likes`;
  //Toy Like Button
  let likeBtn = document.createElement("button");
  likeBtn.setAttribute("class", "like-btn");
  likeBtn.setAttribute("id",`${toys.id}`);
  likeBtn.innerText = "Like Me";
  //Delete Toy Button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.innerText = "Delete Toy"
    //Toy Card
    let div = document.createElement("div");
    div.className = "card";
    div.append(h2, img, p, likeBtn, deleteBtn);
    toyCollection.append(div);


/////////////////Like button event listener to update likes////////////////
    likeBtn.addEventListener('click', () => {
      toys.likes++;
      p.innerText = `${toys.likes} Likes`;
      updateLikes(toys);
    });
//////////////////// Delete button event listener to delete toys //////////////////////
    deleteBtn.addEventListener('click', () => {
      div.remove();
      deleteToys(toys.id);
    })
 }
///////////////////fetching toy information from db.json//////////////////////
 function getAllToys(){
   fetch("http://localhost:3000/toys")
   .then(res => res.json())
   .then(toyData => toyData.forEach(toy => renderToys(toy)))
  }
  /////////Adding new toys to database and browser using POST////////////////////////////////
  function addNewToy(toys){
    toys.preventDefault();
    const newToy = {
      name: toys.target.name.value,
      image: toys.target.image.value,
      likes: 0
    }
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
       },
       body: JSON.stringify(newToy)
      })
      renderToys(newToy);
      toys.target.reset();
    }
  ////////////////////submitting new toy information////////////////////////////////
 document.querySelector(".add-toy-form").addEventListener("submit", (e) => addNewToy(e));

 /////////////////Updating likes using PATCH////////////////
 function updateLikes(toys){
   fetch(`http://localhost:3000/toys/${toys.id}`,{
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
       Accept: "aplication/json"
     },
     body: JSON.stringify(toys)
   })
    .then(res => res.json())
    .then(toy => console.log(toy))
 }
  
///////////////////////////Deleting toys using DELETE /////////////////////////
function deleteToys(id){
   fetch(`http://localhost:3000/toys/${id}`,{
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       Application: "application/json"
     }
   })
   .then(res => res.json())
   .then(toy => console.log(toy))
 }  
///////////////////////////////////////////////////////////////////////////////////
function initialize(){
  getAllToys();
}
initialize();
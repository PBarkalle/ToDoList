var listItemsArr = [];

function displayItems() {
  let str = "";
  let ul = document.getElementById("myUL");
  //Check if listItems is not empty.
  if (localStorage.getItem("listItems")) {
    //Copying array from local storage.
    let listItemsArrStr = localStorage.getItem("listItems");
    listItemsArr = JSON.parse(listItemsArrStr);
    //Adding each listItem array element to str.
    listItemsArr.forEach((element, index) => {
      // if task is not completed.
        if (element[1] == 1) {
        str += `<li><span class='left'>${index + 1}). &nbsp;&nbsp;${element[0]} </span><span class='right'><i class='fa fa-check-circle  fa-2x' style='color: green;' onclick='checked(${index})'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-trash  fa-2x' style='color: red;'onclick='deleted(${index})'></i></span></li>`;
      }
      //Task completed. 
      else {
        str += `<li class><span class='left done'>${index + 1}). &nbsp;&nbsp;${element[0]} </span><span class='right'>&nbsp;&nbsp;&nbsp;<i class='fa fa-trash  fa-2x' style='color: red;'onclick='deleted(${index})'></i></span></li>`;
      }
    });
  }
  ul.innerHTML = str;
}

function addItem() {
  let item = document.getElementById("myInput").value;
  if (item == "") {
    window.alert("Task cannot be empty.");
    return;
  }
  //Check if listItems is empty. If it is then it creates listItems object in local storage.
  if (localStorage.getItem("listItems") == null) {
    listItemsArr.push([item, 1]);
    localStorage.setItem("listItems", JSON.stringify(listItemsArr));
  }
  //Fetches listItems object from local storage and updates it.
  else {
    let listItemsArrStr = localStorage.getItem("listItems");
    listItemsArr = JSON.parse(listItemsArrStr);
    //Pushing 1 to keep track if task is completed or not. 1=Task pending
    listItemsArr.push([item, 1]);
    localStorage.setItem("listItems", JSON.stringify(listItemsArr));
  }
  //After adding the task, making input field empty.
  document.getElementById("myInput").value = "";
  displayItems();
}

function removeAll() {
  if (localStorage.getItem("listItems")) {
    let listItemsArrStr = localStorage.getItem("listItems");
    listItemsArr = JSON.parse(listItemsArrStr);
    listItemsArr = [];
    localStorage.setItem("listItems", JSON.stringify(listItemsArr));
  }
  displayItems();
}
//adding task if user presses Enter key  in input field.
document.getElementById("myInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      addItem();
    }
});


function deleted(index) {
  let listItemsArrStr = localStorage.getItem("listItems");
  listItemsArr = JSON.parse(listItemsArrStr);
  listItemsArr.splice(index, 1);
  localStorage.setItem("listItems", JSON.stringify(listItemsArr));
  displayItems();
}

function checked(index) {
  let listItemsArrStr = localStorage.getItem("listItems");
  listItemsArr = JSON.parse(listItemsArrStr);
  //Marking Task Completed
  listItemsArr[index][1] = -1;
  localStorage.setItem("listItems", JSON.stringify(listItemsArr));
  displayItems();
}

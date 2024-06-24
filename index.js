let selectedRow = null;

function onFormSubmit() {
  if (validate()) {
    let formData = readFormData();
    if (selectedRow == null) {
      insertNewData(formData);
      saveToLocalStorage(formData);
    } else {
      updateRecord(formData);
    }
    resetForm();
  }
}

function readFormData() {
  let formData = {};
  formData.name = document.getElementById("name").value;
  formData.id = document.getElementById("id").value;
  formData.email = document.getElementById("email").value;
  formData.contact = document.getElementById("contact").value;
  return formData;
}

function insertNewData(data) {
  let table = document
    .getElementsByTagName("table")[0]
    .getElementsByTagName("tbody")[0];

  if (
    table.rows.length === 1 &&
    table.rows[0].classList.contains("empty-message")
  ) {
    table.deleteRow(0);
  }

  insertRow(table, data);
}

//Task6:- Functionality to add new student records.
function insertRow(table, data) {
  let newRow = table.insertRow(table.rows.length);
  newRow.insertCell(0).innerHTML = data.name;
  newRow.insertCell(1).innerHTML = data.id;
  newRow.insertCell(2).innerHTML = data.email;
  newRow.insertCell(3).innerHTML = data.contact;
  newRow.insertCell(4).innerHTML = `<button onclick="editRow(this)">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onclick="onDelete(this)">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>`;
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("id").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
  selectedRow = null;
}

//Task6: Use of Local Storage
function saveToLocalStorage(data) {
  let storedData = localStorage.getItem("formData");
  if (storedData) {
    storedData = JSON.parse(storedData);
  } else {
    storedData = [];
  }
  storedData.push(data);
  localStorage.setItem("formData", JSON.stringify(storedData));
}

function loadData() {
  let storedData = localStorage.getItem("formData");
  if (storedData) {
    storedData = JSON.parse(storedData);
    let table = document
      .getElementsByTagName("table")[0]
      .getElementsByTagName("tbody")[0];
    if (
      table.rows.length === 1 &&
      table.rows[0].classList.contains("empty-message")
    ) {
      table.deleteRow(0);
    }
    storedData.forEach((data) => insertRow(table, data));
  }
}

//Task6:- edit existing records.
function editRow(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("id").value = selectedRow.cells[1].innerHTML;
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("contact").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.id;
  selectedRow.cells[2].innerHTML = formData.email;
  selectedRow.cells[3].innerHTML = formData.contact;

  // Update local storage
  let storedData = JSON.parse(localStorage.getItem("formData"));
  storedData[selectedRow.rowIndex - 1] = formData;
  localStorage.setItem("formData", JSON.stringify(storedData));
}

//Task6:- Deleting records.
function onDelete(td) {
  if (confirm("Are you sure to delete this record?")) {
    let row = td.parentElement.parentElement;
    let table = row.parentNode;
    row.parentNode.removeChild(row);

    // Remove from local storage
    let storedData = JSON.parse(localStorage.getItem("formData"));
    storedData.splice(row.rowIndex - 1, 1);
    localStorage.setItem("formData", JSON.stringify(storedData));

    resetForm();

    // If the table is empty, show the empty message
    if (table.rows.length === 0) {
      let newRow = table.insertRow(0);
      newRow.classList.add("empty-message");
      let cell = newRow.insertCell(0);
      cell.colSpan = 5;
      cell.innerHTML = "Enter new student";
    }
  }
}

//Contact validation to cleck and print the error message
function validate() {
  let isValid = true;
  let contactValue = document.getElementById("contact").value;
  if (contactValue.length < 10) {
    isValid = false;
    document.getElementById("contactError").classList.remove("hide");
  } else {
    isValid = true;
    if (!document.getElementById("contactError").classList.contains("hide")) {
      document.getElementById("contactError").classList.add("hide");
    }
  }
  return isValid;
}

// Load data from local storage when the page loads
window.onload = loadData;

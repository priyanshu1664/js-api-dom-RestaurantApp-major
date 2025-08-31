let apiUrl =
  "https://crudcrud.com/api/b0af1e83786045e3b022fa8e1ea8b323/customerOrders";

function handleFormSubmit(e) {
  e.preventDefault();
  console.log(e.target.table_opt.value);

  const customerOrder = {
    price: e.target.price.value,
    details: e.target.details.value,
    table: e.target.table_opt.value,
  };

  axios
    .post(`${apiUrl}`, customerOrder)
    .then((response) => {
      displayUserOnScreen(response.data);
      console.log("Order Added Succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
  document.querySelector("#price").value = "";
  document.querySelector("#details").value = "";
  document.querySelector("#table_opt").value = "";
}

function displayUserOnScreen(customerOrder) {
  let userItem = document.createElement("li");

  userItem.textContent = `${customerOrder.price} - ${customerOrder.details} - ${customerOrder.table}`;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "azure";
  deleteBtn.style.marginLeft = "150px";
  deleteBtn.style.height = "1.3rem";
  deleteBtn.style.width = "4rem";

  userItem.append(deleteBtn);

  let tableListId;
  if (customerOrder.table === "table1") {
    tableListId = "t1List";
  } else if (customerOrder.table === "table2") {
    tableListId = "t2List";
  } else {
    tableListId = "t3List";
  }
  let userItemList = document.getElementById(tableListId);
  userItemList.append(userItem);

  // delete functionality
  deleteBtn.addEventListener("click", () => {
    axios
      .delete(`${apiUrl}/${customerOrder._id}`)
      .then(() => {
        userItem.remove(); // remove from UI
        console.log("Order Deleted");
      })
      .catch((err) => {
        console.error("Error Deleting:", err);
      });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(apiUrl)
    .then((response) => {
      response.data.forEach((order) => {
        displayUserOnScreen(order);
      });
    })
    .catch((err) => {
      console.error("Error Fetching Orders:", err);
    });
});

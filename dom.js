let orders = $("#orders")
let details = $("#details")

let searchTextBox = $('#searchTextBox')
let searchBtn = $('#searchBtn')
let allBtn = $('#allBtn')

let orderEmailTextBox = $('#orderEmailTextBox')
let orderTextBox = $('#orderTextBox')
let postBtn = $('#postBtn')

fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/').then(function(response){
  return response.json()
}).then(function(json){
  for (let order in json){
  generateCard(json[order])
}


searchBtn.click(function(){
  search(searchTextBox.val())
  searchTextBox.val('')
})

allBtn.click(function(){
  orders.html('')
  for (let order in json){
      generateCard(json[order])
}
})

postBtn.click(function(){
  makeOrder(orderEmailTextBox.val(), orderTextBox.val())
  orderEmailTextBox.val('')
  orderTextBox.val('')
})

}) //end of the fetch command

function generateCard(order){
  let entry = $("<div>").html(`
    <div class="card horizontal">
      <div class="card-image">
      </div>
        <div class="card-stacked">
            <div class="card-content">
              <h5>${order['emailAddress']}</h5>
              <p>${order['coffee']} <br> <small class="text-muted">${order['_id']}</small></p>
            `)

            let deleteBtn = $("<div>").html(`
          <a href="#">ORDER COMPLETE!</a>
          </div>`).addClass("card-action")
          deleteBtn.click(function(){
            deleteOrder(order['emailAddress'])
          })
          entry.append(deleteBtn)
        entry.append(`</div>
        </div>
      </div>`)

orders.append(entry)
}

/*function generateCard1(order){
  let entry = $("<div>").html(`<div class="card horizontal">
      <div class="card-image">
      </div>
      <div class="card-stacked">
          <div class="card-content">
            <h5>${order['emailAddress']}</h5>
            <p>${order['coffee']} <br> <small class="text-muted">${order['_id']}</small></p>
        </div>
        <div class="card-action">
          <a href="#">ORDER COMPLETE</a>
        </div>
      </div>
    </div>`)
    let deleteBtn = $("#card-action")
    deleteBtn.click(function(){
      deleteOrder(order['emailAddress'])
    })

orders.append(entry)
}*/

function search(email){
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/'+email).then(function(response){
    return response.json()
  }).then(function(json){
    orders.html('')
    generateCard(json)

  })
}

function deleteOrder(email){
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/'+email, {
    method: 'DELETE'
  }).then(function(response){
    return response.json()
  }).then(function(json){
    console.log(json)
  })
}

function makeOrder(orderEmail, orderDetails){
  let postOrder = {
    coffee: orderDetails,
    emailAddress: orderEmail
  }
  sendPOST(postOrder)
}


function sendPOST(postOrder){
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postOrder)
  }).then(function(response){
    return response.json()
  }).then(function(json){
    console.log(json)
  })
}

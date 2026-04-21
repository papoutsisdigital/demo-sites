const menu = [
  {id:1, name:"Burger", price:8, img:"https://picsum.photos/200?1"},
  {id:2, name:"Pizza", price:10, img:"https://picsum.photos/200?2"},
  {id:3, name:"Σαλάτα", price:6, img:"https://picsum.photos/200?3"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const menuDiv = document.getElementById("menu");

if(menuDiv){
  menu.forEach(item => {
    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>${item.price}€</p>
        <button onclick="add(${item.id})">+</button>
      </div>
    `;
  });
}

function add(id){
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const cartDiv = document.getElementById("cart");
  if(!cartDiv) return;

  cartDiv.innerHTML = "";

  cart.forEach(id => {
    const item = menu.find(i => i.id === id);
    cartDiv.innerHTML += `<li>${item.name} - ${item.price}€</li>`;
  });
}

renderCart();

function checkout(){
  alert("Demo παραγγελία ολοκληρώθηκε!");
  localStorage.removeItem("cart");
  location.reload();
}

const items = [
  {id:1, name:"Burger", price:8, cat:"burger", img:"https://picsum.photos/300?1"},
  {id:2, name:"Pizza", price:10, cat:"pizza", img:"https://picsum.photos/300?2"},
  {id:3, name:"Σαλάτα", price:6, cat:"salad", img:"https://picsum.photos/300?3"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentFilter = "all";

function renderMenu(){
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  items
  .filter(i => currentFilter === "all" || i.cat === currentFilter)
  .forEach(item => {
    menu.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>${item.price}€</p>
        <div class="actions">
          <button onclick="add(${item.id})">+</button>
        </div>
      </div>
    `;
  });
}

function add(id){
  const found = cart.find(i => i.id === id);
  if(found) found.qty++;
  else cart.push({id, qty:1});

  save();
}

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const cartDiv = document.getElementById("cart");
  const totalDiv = document.getElementById("total");

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(c => {
    const item = items.find(i => i.id === c.id);
    total += item.price * c.qty;

    cartDiv.innerHTML += `
      <li>
        ${item.name} x${c.qty}
        <button onclick="remove(${c.id})">-</button>
      </li>
    `;
  });

  totalDiv.innerText = "Σύνολο: " + total + "€";
}

function remove(id){
  const found = cart.find(i => i.id === id);
  if(found.qty > 1) found.qty--;
  else cart = cart.filter(i => i.id !== id);

  save();
}

function filter(cat){
  currentFilter = cat;
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  renderMenu();
}

function scrollToMenu(){
  document.getElementById("menu-section").scrollIntoView({behavior:"smooth"});
}

function openCheckout(){
  document.getElementById("checkoutModal").style.display = "flex";
}

function submitOrder(){
  alert("Η παραγγελία στάλθηκε! (demo)");
  cart = [];
  save();
  document.getElementById("checkoutModal").style.display = "none";
}

renderMenu();
renderCart();

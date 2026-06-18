document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute('href'))
      if(target) target.scrollIntoView({behavior: 'smooth'})
    })
  })

  const form = document.querySelector('form')
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault()
      const inputs = form.querySelectorAll('input, textarea')
      let empty = false
      inputs.forEach(input => {
        if(!input.value.trim()){
          empty = true
        }
      })
      if(empty){
        alert('Fill all fields')
      }else{
        alert('Form submitted')
      }
    })
  }

  const orderBtn = document.querySelector('#orderBtn')
  if(orderBtn){
    orderBtn.addEventListener('click', () => {
      alert('Order page coming soon')
    })
  }
})
// Part 2.2 Dynamic Content - Cake Menu Loop
const cakes = [
  {name: "Red Velvet Dream", price: 450, category: "birthday", img: "images/red-velvet.jpg", desc: "Rich red velvet with cream cheese frosting"},
  {name: "Lemon Drizzle Cupcakes", price: 18, category: "cupcakes", img: "images/lemon-cupcake.jpg", desc: "Zesty lemon cupcakes, box of 6"},
  {name: "3-Tier Wedding Classic", price: 2800, category: "wedding", img: "images/wedding-cake.jpg", desc: "Vanilla & chocolate tiers"},
  {name: "Vegan Chocolate Fudge", price: 420, category: "vegan", img: "images/vegan-chocolate.jpg", desc: "Dairy-free chocolate cake"}
];

function loadCakes() {
  const container = document.getElementById('cakeContainer');
  if (!container) return;
  container.innerHTML = '';
  cakes.forEach(cake => {
    container.innerHTML += `
      <div class="cake-card" data-category="${cake.category}">
        <img src="${cake.img}" alt="${cake.name}">
        <h3>${cake.name}</h3>
        <p>${cake.desc}</p>
        <p class="price">R${cake.price}</p>
        <button class="btn order-btn">Order Now</button>
      </div>
    `;
  });
}
document.addEventListener('DOMContentLoaded', loadCakes);

// Part 4.2 JS Form Validation + AJAX for enquiry.html
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  document.getElementById('date').min = new Date().toISOString().split('T')[0];

  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
      document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
      isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Enter a valid email address';
      isValid = false;
    }

    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      document.getElementById('phoneError').textContent = 'Enter valid SA number: 0712345678';
      isValid = false;
    }

    const date = new Date(document.getElementById('date').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (!document.getElementById('date').value || date < today) {
      document.getElementById('dateError').textContent = 'Select a future date';
      isValid = false;
    }

    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Please add more details, minimum 10 characters';
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData(this);
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {'Accept': 'application/json'}
      })
     .then(response => {
        if (response.ok) {
          document.getElementById('successMsg').style.display = 'block';
          enquiryForm.reset();
        } else {
          document.getElementById('errorMsg').style.display = 'block';
        }
      })
     .catch(() => {
        document.getElementById('errorMsg').style.display = 'block';
      });
    }
  });
}

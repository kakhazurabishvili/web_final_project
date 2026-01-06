// ------------------------- Sticky Header -------------------------
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// ------------------------- Cached Movies -------------------------
let moviesData = [];

// ------------------------- Fetch Movies -------------------------
async function getMovies() {
    try {
        const response = await fetch('movies.json');
        if (!response.ok) throw new Error("ფაილი ვერ მოიძებნა");

        const data = await response.json();
        moviesData = data; // შენახვა ძებნისთვის
        displayMovies(moviesData);

    } catch (error) {
        console.error("შეცდომა მონაცემების წამოღებისას:", error);
    }
}

// ------------------------- Display Movies -------------------------
function displayMovies(movies) {
    const grid = document.querySelector('.movies-grid');
    grid.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = `
            <article class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="rating"><span>⭐</span> ${movie.rating}</span>
                </div>
            </article>
        `;
        grid.innerHTML += movieCard;
    });
}

// გამოიძახე ფუნქცია
getMovies();

// ------------------------- Burger Menu -------------------------
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});


// ------------------------- Search Bar -------------------------
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );
    displayMovies(filtered);
});

// ------------------------- Login Modal -------------------------
document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('loginModal');
    const modalClose = document.querySelector('.close');
    const modalLoginBtn = document.getElementById('modalLoginBtn');
    const modalUsername = document.getElementById('modalUsername');
    const modalPassword = document.getElementById('modalPassword');
    const loginBtn = document.querySelector('.login-btn');

    // დარწმუნება, რომ modal დამალულია თავიდან
    modal.style.display = 'none';

    // Open modal მხოლოდ click-ზე
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    // Close modal ღილაკით X
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal click-ით body-ზე
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Login ღილაკი modal-ში
    modalLoginBtn.addEventListener('click', () => {
        const username = modalUsername.value.trim();
        const password = modalPassword.value.trim();

        if (!username || !password) {
            alert('გთხოვთ შეავსოთ ყველა ველი!');
            return;
        }

        console.log("Username:", username);
        console.log("Password:", password);
        alert(`Welcome, ${username}!`);

        modal.style.display = 'none';
        modalUsername.value = '';
        modalPassword.value = '';
    });

});

// ------------------ Home button ------------------
const homeBtn = document.querySelector('.nav-menu a.active'); // თუ "Home" არის active კლასი
homeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // თავიდან ავიცილოთ link–ის default ქმედება
    window.scrollTo({ top: 0, behavior: 'smooth' }); // გლუვი scroll ზედა ნაწილში

    // search bar–ის გასუფთავება
    searchInput.value = '';

    // ყველა ფილმის ჩვენება
    displayMovies(moviesData);
});

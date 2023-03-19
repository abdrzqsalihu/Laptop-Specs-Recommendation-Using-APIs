const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
const searchTerm = searchInput.value;
console.log(searchTerm);
window.location.assign(`index.html?term=${searchTerm}`)
});

// Get the URL parameter string
const queryString = window.location.search;

// Parse the query string to get the parameters as an object
const urlParams = new URLSearchParams(queryString);

// Get the value of the "id" parameter
const idSearch = urlParams.get('term');

// Log the ID to the console
// console.log(idSearch);

if (idSearch === null) {
    idSearchTerm = 'all';
}else{
    idSearchTerm = idSearch;
}

// Fetch data from API
fetch(`https://salesman-api.onrender.com/search/${idSearchTerm}`)
.then(response => response.json())
.then(data => {
    // Loop through array using forEach
    console.log(data);

    data.recommendations.forEach(item => {
        // Do something with each item
        imageUrl = item.images[0].url;
        // console.log(imageUrl);
        const markup = `
            <div class="col l4 m4 s12">
                <img style="width: 100%;" src="${imageUrl}" alt="">
                <h5 style="font-weight:bold">${item.name}</h5>
                <p style="font-weight:500">${item.info}</p>
                <button>view</button>
                <br/><br/><br/><br/></div>
                
            `;
            document.getElementById('data').insertAdjacentHTML('beforeend', markup);
        // console.log(item);
    
        });
}
).catch(error => console.error(error));

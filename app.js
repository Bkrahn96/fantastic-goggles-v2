document.getElementById('findRestaurant').onclick = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = 'AIzaSyAQOuogIYyjxwC1VtkoCSzuA6IHyRVFxlI';
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const results = document.getElementById('results');
                results.innerHTML = '';
                data.results.forEach(restaurant => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h2>${restaurant.name}</h2><p>${restaurant.vicinity}</p>`;
                    results.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });
};

const apiUrl = 'https://localhost:32768/api';

async function fetchBoats(apiUrl) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Use async/await to wait for the data
async function processBoats() {
    try {
        const data = await fetchBoats(apiUrl);
        return data;
    } catch (error) {
        console.error('Error processing data:', error);
        // Handle the error
    }
}

function getBoatArray(){
    processBoats().then(data => {
        const array = data;
        console.log(array);
        return array;
    })
}

function PlaceBoat() {
    const data = 'YourBoatData';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // If the API returns JSON data
        })
        .then(responseData => {
            console.log('Response Data:', responseData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

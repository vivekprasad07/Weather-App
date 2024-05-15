// const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Mumbai';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'a97a95aa22msh95cf7129c9a5fbbp13c0b9jsnea6d013f0bab',
// 		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com',
// 		'Content-Type': 'application/json'
// 	}
// };

// async function fetchWeather() {
// 	try {
// 		const response = await fetch(url, options);
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const result = await response.text();
// 		console.log(result);
// 	} catch (error) {
// 		console.error('Error:', error);
// 	}
// }

// // Call the async function
// fetchWeather();
////---------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a97a95aa22msh95cf7129c9a5fbbp13c0b9jsnea6d013f0bab',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};
	const getWeather = (city) => {
		fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				cityName.innerHTML = city;
				cloud_pct.innerHTML = response.cloud_pct;
				temp.innerHTML = response.temp;
				feels_like.innerHTML = response.feels_like;
				humidity.innerHTML = response.humidity;
				min_temp.innerHTML = response.min_temp;
				max_temp.innerHTML = response.max_temp;
				wind_speed.innerHTML = response.wind_speed;
				wind_degrees.innerHTML = response.wind_degrees;
				speed.innerHTML = response.wind_speed;
				humid.innerHTML = response.humidity;

				// Process sunrise and sunset
				function convertTimestamp(timestamp) {
					const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
					// Convert to IST (Indian Standard Time)
					const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

					// 24-hour format
					const hours24 = String(istDate.getHours()).padStart(2, '0');
					const minutes24 = String(istDate.getMinutes()).padStart(2, '0');
					const seconds24 = String(istDate.getSeconds()).padStart(2, '0');
					const time24Hour = `${hours24}:${minutes24}:${seconds24}`;

					// 12-hour format
					let hours12 = istDate.getHours();
					const ampm = hours12 >= 12 ? 'PM' : 'AM';
					hours12 = hours12 % 12 || 12; // Convert to 12-hour format
					const hours12Str = String(hours12).padStart(2, '0');
					const minutes12 = String(istDate.getMinutes()).padStart(2, '0');
					const seconds12 = String(istDate.getSeconds()).padStart(2, '0');
					const time12Hour = `${hours12Str}:${minutes12}:${seconds12} ${ampm}`;

					return { time24Hour, time12Hour };
				}

				const { time24Hour: sunrise24, time12Hour: sunrise12 } = convertTimestamp(response.sunrise);
				const { time24Hour: sunset24, time12Hour: sunset12 } = convertTimestamp(response.sunset);

				sunR12.innerHTML = sunrise12;
				sunS12.innerHTML = sunset12;
				// sunR12.innerHTML = sunrise12;
				// sunS12.innerHTML = sunset12;

				console.log('24-hour format (IST) sunrise :', sunrise24);
				console.log('12-hour format (IST) sunrise :', sunrise12);
				console.log('24-hour format (IST) sunset :', sunset24);
				console.log('12-hour format (IST) sunset :', sunset12);
			})
			.catch(err => console.error(err));
	}

	submit.addEventListener("click", (e)=>{
		e.preventDefault()
		getWeather(city.value)
	})
	refresh.addEventListener("click", (e) =>{
		e.preventDefault()
		getWeather(city.value)
	})


	getWeather("Jamshedpur");
});
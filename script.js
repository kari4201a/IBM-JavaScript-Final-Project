
const imagesData = [
  { 
    country: 'Canada', 
    imageUrl: 'images/Canada/AlbertaCanada.jpg', 
    keywords: ['canada','alberta'],
    timezone: 'America/Edmonton'  
  },
  { 
    country: 'Japan', 
    images: [
      'images/Japan/Japan-temple1.jpg',
      'images/Japan/Japan-temple2.jpg'
    ],
    keywords: ['japan','temple', 'temples'],
    timezone: 'Asia/Tokyo'  
  },
  { 
    country: 'Indonesia', 
    images: [
      'images/Indonesia/BaliBeach.jpg',
      'images/Indonesia/KutaIndonesia.jpg'
    ],
    keywords: ['bali','indonesia','beach', 'beaches'],
    timezone: 'Asia/Jakarta'  
  },
  { 
    country: 'Greece', 
    images: [
      'images/Greece/MykonosBeach.jpg',
      'images/Greece/LefkadaBeach.jpg'
    ],
    keywords: ['greece','beach', 'beaches'],
    timezone: 'Europe/Athens'  
  },
  { 
    country: 'China', 
    images: [
      'images/China/China1.jpg',
      'images/China/China2.jpg'
    ],
    keywords: ['china','temple', 'temples'],
    timezone: 'Asia/Shanghai'  
  },
  { 
    country: 'United States of America', 
    images: [
      'images/USA/NewYork.jpeg',
    ],
    keywords: ['new york','usa', 'united states of america'],
    timezone: 'America/New_York'
  }
];


async function fetchCurrentTime(city) {
  try {
    const response = await fetch(`http://worldtimeapi.org/api/timezone/${city}`);
    if (!response.ok) {
      throw new Error('Failed to fetch time');
    }
    const data = await response.json();
    
    
    console.log(`Fetched time data for ${city}:`, data);

    return data.datetime; // Returns datetime string in ISO format
  } catch (error) {
    console.error('Error fetching current time:', error.message);
    return null;
  }
}


function formatTime(datetime) {
  const date = new Date(datetime);
  return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
}


async function searchCountry() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const countryImagesDiv = document.getElementById('countryImages');
  countryImagesDiv.innerHTML = '';

  
  const filteredImages = imagesData.filter(image => {
    return image.country.toLowerCase() === searchTerm ||
           (image.keywords && image.keywords.includes(searchTerm));
  });

  
  for (const image of filteredImages) {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'country-container';

    
    const time = await fetchCurrentTime(image.timezone);
    if (time) {
      const timeFormatted = formatTime(time);
      const timeElement = document.createElement('p');
      timeElement.textContent = `${image.country} - Current local time: ${timeFormatted}`;
      containerDiv.appendChild(timeElement);
    } else {
      const timeElement = document.createElement('p');
      timeElement.textContent = `Time information not available for ${image.country}`;
      containerDiv.appendChild(timeElement);
    }

    if (Array.isArray(image.images)) {
      for (const imageUrl of image.images) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = image.country;
        imgElement.onclick = function() {
          displayImage(imageUrl);
        };
        containerDiv.appendChild(imgElement);
      }
    } else {
      const imgElement = document.createElement('img');
      imgElement.src = image.imageUrl;
      imgElement.alt = image.country;
      imgElement.onclick = function() {
        displayImage(image.imageUrl);
      };
      containerDiv.appendChild(imgElement);
    }

    countryImagesDiv.appendChild(containerDiv);
  }
}


function displayImage(imageUrl) {
  const countryImagesDiv = document.getElementById('countryImages');
  countryImagesDiv.innerHTML = '';

  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = 'Selected Country Image';
  countryImagesDiv.appendChild(imgElement);
}


function clearImages() {
  document.getElementById('countryImages').innerHTML = '';
}

$((curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}') => {
  // Dictionary to store Amenity IDs
  const amenityIds = {};

  // Listen for change on each input checkbox tag
  $('input[type=checkbox]').change(function () {
    // Get the Amenity ID and name from data attribution
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).prop('checked')) {
      // Store the Amenity ID in the directory
      amenityIds[amenityId] = amenityName;
    } else {
      // Remove the Amenity ID from the dictionary
      delete amenityIds[amenityId];
    }

    // Update the h4 tag inside the div Amenities
    const amenitiesList = Object.values(amenityIds).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  // Request API status
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
        $('div#api_status').removeAttr('id');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

  // Request Places data
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}), 
    success: function (response) {
      console.log(response);
      for (const place of response) {
        const article = document.createElement('article');
        article.innerHTML = `
	  <div class="title_box">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">$${place.price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
	    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
	    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
	  </div>
	  <div class="description">
	    ${place.description}
	  </div>
	`;
        $('.section.places').append(article);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
});

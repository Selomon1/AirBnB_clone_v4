$(() => {
  // Dictionary to store Amenity, State & City IDs
  const amenityIds = {};
  const stateIds = {};
  const cityIds = {};

  // Listen for change on each input checkbox tag
  $('input[type=checkbox]').change(function () {
    // Handle City and State checkbox
    if ($(this).closest('.locations').length) {
      const isState = $(this).closest('ul').prev('h2').length > 0;
      const idKey = isState ? 'state_id' : 'city_id';
      const nameKey = isState ? 'state_name' : 'city_name';

      const itemId = $(this).data(idkey);
      const itemName = $(this).data(nameKey);

      // Check if the checkbox is checked
      if ($(this).prop('checked')) {
        // Store the State and City ID in the directory
        if (isState) {
	  stateIds[amenityId] = itemName;
        } else {
	  cityIds[itemId] = itemName;
	}
      } else {
        if (isState) {
	  delete stateIds[itemId];
        } else {
          delete cityIds[itemId];
	}
      }

      // Update the h4 tag inside the div Amenities
      const locationsList = [...Object.values(stateIds), ...Object.values(cityIds)].join(', ');
      $('.locations h4').text(locationsList);
    } else {
      const amenityId = $(his).data('id);
      const amenityName = $(this).data('name');
    
      if ($(this).prop('checked')) {
        amenityIds[amenityId] = amenityName;
      } else {
        delete amenityIds[amenityId];
      }

      const amenitiesList = Object.values(amenityIds).join(', ');
      $('.amenities h4').text(amenitiesList);
    }
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

  //Listen for click on the button tag
  $('Button').click(function () {
    // Request Places data
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 
        amenities: Object.keys(amenityIds),
	states: Object.keys(stateIds),
	cities: Object.keys(cityIds)
      }),
      success: function (response) {
        console.log(response);
	$('.places').empty();
	for (let i = 0; i < response.length; i++) {
	  const place = response[i];
	  displayPlaces(place);
	}
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  function displayPlaces(place) {
    const article = document.createElement('article');
    article.innerHTML = `
      <div class="title_box">
	<h2>${place.name}</h2>
	<div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} ${place.max_guest !== 1 ? 'Guests' : 'Guest'}</div>
	<div class="number_rooms">${place.number_rooms} ${place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom'}</div>
	<div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}</div>
      </div>
      <div class="user"></div>
      <div class="description">${place.description}</div>
    `;
    $('.places').append(article);
  }
});

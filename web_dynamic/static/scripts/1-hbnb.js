$(document).ready(function () {
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
});

<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <?php include 'dashboard-sidebar.php'; ?>
    <div class="lg:col-span-3 space-y-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Address via Map</h1>
            </div>
            <div class="p-6">
                <div id="map" class="h-96 w-full rounded-lg mb-6 border border-gray-300"></div>

                <form id="address-form" class="space-y-4">
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Address Line 1</label>
                        <input type="text" id="address" name="address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
                        <input type="text" id="city" name="city" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-200">State/Province</label>
                        <input type="text" id="state" name="state" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="postal_code" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Postal Code</label>
                        <input type="text" id="postal_code" name="postal_code" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    </div>

                    <div>
                        <label for="lat" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Latitude</label>
                        <input type="text" id="lat" name="lat" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" readonly>
                    </div>
                    <div>
                        <label for="lng" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Longitude</label>
                        <input type="text" id="lng" name="lng" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" readonly>
                    </div>

                    <button type="submit" class="te-btn te-btn-primary">Save Address</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk&libraries=places&callback=initMap" async defer></script>

<?php include 'footer.php'; ?>

<script>
    let map;
    let geocoder;
    let marker;

    function initMap() {
        // Initialize the map centered on a default location
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 34.052235,
                lng: -118.243683
            }, // Default center (e.g., Los Angeles)
            zoom: 12,
        });

        // Initialize the geocoder service
        geocoder = new google.maps.Geocoder();

        // Add a marker that can be moved
        marker = new google.maps.Marker({
            map: map,
            position: map.getCenter(),
            draggable: true
        });

        // Initial population of the lat/lng fields
        updateLatLngInputs(map.getCenter());

        // Listen for a click on the map
        map.addListener("click", (e) => {
            geocodeLatLng(e.latLng);
            updateLatLngInputs(e.latLng);
        });

        // Listen for the marker to be dragged
        marker.addListener("dragend", () => {
            geocodeLatLng(marker.getPosition());
            updateLatLngInputs(marker.getPosition());
        });
    }

    function geocodeLatLng(latLng) {
        geocoder.geocode({
            location: latLng
        }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    // Update the marker position and zoom level
                    map.setZoom(16);
                    marker.setPosition(latLng);

                    // Call a function to fill the form fields
                    fillFormWithAddress(results[0].address_components);
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    }

    // New function to update the latitude and longitude input fields
    function updateLatLngInputs(latLng) {
        document.getElementById('lat').value = latLng.lat();
        document.getElementById('lng').value = latLng.lng();
    }

    function fillFormWithAddress(components) {
        // Clear previous form data
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
        document.getElementById('postal_code').value = '';

        // Extract and fill address components
        let streetNumber = '';
        let route = '';

        for (const component of components) {
            const type = component.types[0];
            switch (type) {
                case 'street_number':
                    streetNumber = component.long_name;
                    break;
                case 'route':
                    route = component.long_name;
                    break;
                case 'locality':
                    document.getElementById('city').value = component.long_name;
                    break;
                case 'administrative_area_level_1':
                    document.getElementById('state').value = component.short_name;
                    break;
                case 'postal_code':
                    document.getElementById('postal_code').value = component.long_name;
                    break;
            }
        }
        document.getElementById('address').value = `${streetNumber} ${route}`.trim();
    }
</script>
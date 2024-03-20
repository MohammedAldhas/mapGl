// import React, { useState } from 'react';
import ShowMap from './ShowMap'; // Assuming ShowMap component is in a separate file

function ParentComponent() {
  const handleMapClick = (clickedLngLat) => {
    console.log("Clicked on map:", clickedLngLat);
    // Perform any other actions with the clickedLngLat if needed
  };

  return (
    <div>
      <ShowMap onMapClick={handleMapClick} />
      {/* Other components or content */}
    </div>
  );
}

export default ParentComponent;
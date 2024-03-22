// import React, { useState } from 'react';
import ShowMap from "./ShowMap";

function ParentComponent() {
  const handleMapClick = (clickedLngLat) => {
    console.log("Clicked on map:", clickedLngLat);
  };

  return (
    <div>
      <ShowMap onMapClick={handleMapClick} />
    </div>
  );
}

export default ParentComponent;

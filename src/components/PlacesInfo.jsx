/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

function PlacesInfo(props) {
  return (
    <>
      <ul
        // key={i}
        className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl cursor-pointer hover:scale-[1.01]"
        onClick={props.handel}
      >
        <li>Name: {props.name}</li>
        <li>Location: {props.address_name}</li>
        <li>Type: {props.type}</li>
        <li>region:{props.region}</li>
      </ul>
    </>
  );
}

export default PlacesInfo;

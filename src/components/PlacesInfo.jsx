/* eslint-disable react/prop-types */
export default function PlacesInfo(props) {
  const lists = [
    { id: 1, text: "Name:", data: props.name },
    { id: 2, text: "Location:", data: props.address_name },
    { id: 3, text: "Type:", data: props.type },
    { id: 4, text: "region:", data: props.region },
  ];

  const listsElement = lists.map((list) => {
    return (
      <li key={list.id}>
        {list.text} {list.data}
      </li>
    );
  });
  return (
    <>
      <ul
        className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl cursor-pointer hover:scale-[1.01]"
        onClick={props.handel}
      >
        {listsElement}
      </ul>
    </>
  );
}

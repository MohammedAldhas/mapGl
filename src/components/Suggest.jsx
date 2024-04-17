/* eslint-disable react/prop-types */
export default function Suggest(props) {
  return (
    <>
      <p
        className="box-border cursor-pointer hover:bg-slate-400 px-[5px] w-full"
        key={props.id}
        onClick={props.handle}
        title={props.address_name}
      >
        {props.name}
      </p>
    </>
  );
}

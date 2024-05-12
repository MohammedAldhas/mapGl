/* eslint-disable react/prop-types */
export default function Suggest({data, clickOnSuggestion, searchInput, setclassN, setsearchInput, setPlaces, setclasspopup, classN, loading}) {
  return (
    <>
        <input
            value={searchInput}
            type="text"
            placeholder="search here..."
            id="search"
            className="box-border m-1 p-2 border border-solid border-[#a68cfa75]"
            onChange={(e) => {
                if (e.target.value != "") {
                    setclassN("visible");
                    setsearchInput(e.target.value);
                } else {
                    setclassN("invisible");
                    setsearchInput("");
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setPlaces(data?.items);
                    setclasspopup("left-0");
                    setclassN("invisible");
                }
            }}
        />
        <div id="suggest" className={`${classN} text-center font-semibold`}>
            {loading ? (
                <h3>loading...</h3>
            ) : data ? (
                data?.items.map((res, id) => {
                    return (
                        <div key={id}>
                            <p
                                className="box-border cursor-pointer hover:bg-slate-400 px-[5px] w-full"
                                key={res.id}
                                onClick={() => {clickOnSuggestion([res.point.lon, res.point.lat])}}
                                title={res.address_name}
                            >
                                {res.name}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p>No suggestions available.</p>
            )}
        </div>
    </>
  );
}

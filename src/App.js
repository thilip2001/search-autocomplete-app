import { useState } from "react";
import "./App.css";
import datas from "./data.json";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [obj, setObj] = useState({});
  const [data, setData] = useState([]);
  const [mean, setMean] = useState(false);

  const onChange = (event) => {
    setSearchWord(event.target.value);
    const newData = datas.filter(
      (data) =>
        event.target.value &&
        data.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    console.log(newData);
    setData(newData);
    setMean(false);
    setMeaning("");
  };

  const onSearch = (dataObj) => {
    setSearchWord(dataObj.name);
    console.log("search", dataObj);
    setData([]);
    setObj(dataObj);
  };

  const setGo = () => {
    setMean(true);
    setMeaning(obj.meaning);
  };

  console.log(searchWord);

  return (
    <>
      <div className="container min-vh-100 py-4">
        <div className="row mt-5">
          <div className="col-md-5 mx-auto">
            <div className="fs-2 fw-bold text-primary text-center pb-3">
              Dev<span className="text-warning">Go</span>
            </div>
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control bg-transparent"
                placeholder="Search"
                value={searchWord}
                onChange={onChange}
              />
              <button
                className="btn btn-dark"
                onClick={() => {
                  setGo();
                }}
              >
                Go
              </button>
            </div>
            <div className="dropdown-content mt-0 bg-white p-1 rounded">
              {data.map((dat, idx) => {
                return (
                  <div className="list" onClick={() => onSearch(dat)} key={idx}>
                    {dat.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
          <p style={{ textAlign: "center", marginTop: "3rem" }}>
            {mean && <p style={{ fontWeight: "700" }}>Meaning</p>}
            {meaning}
          </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

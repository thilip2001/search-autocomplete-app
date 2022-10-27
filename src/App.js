import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [searchWord, setSearchWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [obj, setObj] = useState({});
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [mean, setMean] = useState(false)
  useEffect(() => {
    fetchData();
  }, [searchWord]);
  const fetchData = async () => {
    const datas = await axios.get(
      "http://13.250.41.77:1596/elastic/api/v1/getPossibleSearch?search=" +
        searchWord
    );
    setData(datas.data);
    console.log(datas.data);
  };
  const onChange = (event) => {
    setSearchWord(event.target.value);
    const newData = data.filter(
      (dat) =>
        searchWord &&
        dat.name.toLowerCase().startsWith(searchWord.toLowerCase())
    );
    console.log(newData);
    setData(newData);
    setMeaning("");
    setClick(false);
    setMean(false);
  };
  const onSearch = (dataObj) => {
    setSearchWord(dataObj.name);
    console.log("search", dataObj);
    setObj(dataObj);
    setClick(true);
    setMean(false)
  };
  const setGo = () => {
    setClick(true);
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
            <div className="input-group mb-1" data-placeholder="my placeholder">
              <input
                type="text"
                className="form-control shadow-none bg-transparent"
                placeholder="Search"
                value={searchWord}
                data-placeholder="my placeholder"
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
            <div
              className={
                searchWord && !click
                  ? `dropdown-content mt-0 bg-white p-1 rounded`
                  : ""
              }
            >
              {searchWord &&
                !click &&
                data.map((dat, idx) => {
                  return (
                    <div
                      className="list"
                      onClick={() => onSearch(dat)}
                      key={idx}
                    >
                      {dat.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              {mean && <strong style={{ fontWeight: "700" }}>Meaning</strong>}
              <br />
              <span>{meaning}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;

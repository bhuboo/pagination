import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [Data, setdata] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [search, setsearch] = useState("");
  const [recordsPerPage, setrecordsPerPage] = useState(5);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setdata(response.data.products);
    });
  }, [setdata]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentpage(currentPage + 1);
    }
  };

  const changeCpage = (id) => {
    setCurrentpage(id);
  };
  return (
    <>
      <div className="col row justify-content-center " role="search">
        <div className="col-4 ">
          <input
            className="form-control me-2"
            type="search"
            aria-label="Search"
            name=""
            id=""
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search...."
          />
        </div>
        <div className="col-2 ">
          <button className="btn btn-secondary " type="button">
            Total Record:{Data.length}
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <th>ID</th>
          <th>Description</th>
          <th>Brand Name</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Stock</th>
        </thead>
        <tbody>
          {records &&
            records
              .filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.brand.toLocaleLowerCase().includes(search);
              })
              .map((item) => (
                <>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>{item.stock}</td>
                  </tr>
                </>
              ))}
        </tbody>
      </table>
      <div className="container">
        <div className="col-12 ">
          <div className="row justify-content-evenly align-content-center">
            <div className="col-4 ">
              <ul className="pagination">
                <li className="page-link">
                  <button className="page-link" onClick={prePage}>
                    Prev
                  </button>
                </li>
                {numbers.map((num, key) => (
                  <>
                    <li
                      className={`page-link ${
                        currentPage === num ? "active" : ""
                      }`}
                      key={key}
                    >
                      <button
                        className="page-link"
                        onClick={() => changeCpage(num)}
                      >
                        {num}
                      </button>
                    </li>
                  </>
                ))}
                <li className="page-link">
                  <button className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-4 ">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show : {recordsPerPage}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setrecordsPerPage(5)}
                    >
                      5
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setrecordsPerPage(10)}
                    >
                      10
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setrecordsPerPage(15)}
                    >
                      15
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => setrecordsPerPage(20)}
                    >
                      20
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => setrecordsPerPage(Data.length)}
                    >
                      Full Data
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

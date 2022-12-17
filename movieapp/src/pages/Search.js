import React, { useState, useEffect } from "react";

import Logo from "../image/dsclogo.png";
import { Badge, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  let navigate = useNavigate();

  const textHandler = (e) => {
    setSearchText(e.target.value);
  };
  const searchHandler = () => {
    navigate("/searchresult/" + searchText);
  };

  return (
    <>
      <img
        src={Logo}
        width="150 px"
        style={{ marginBottom: "15px", marginTop: "200px" }}
      ></img>{" "}
      <br></br>
      <input
        type="text"
        placeholder="Lütfen bir film adı girin..."
        style={{
          width: "350px",
          textAlign: "center",
          borderRadius: "25px",
          height: "40px",
        }}
        onChange={textHandler}
      ></input>{" "}
      <Button color="" onClick={searchHandler}>
        🔎
      </Button>
    </>
  );
}

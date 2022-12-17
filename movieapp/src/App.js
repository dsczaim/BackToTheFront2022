import { Button } from "reactstrap";
import "./App.css";
import Logo from "./image/dsclogo.png";

function App() {
  return (
    <div className="App">
      <img src={Logo} width="100 px"></img>
      <p>
        Google Developer Student Clubs<br></br>
        Istanbul Sabahattin Zaim University<br></br>
        <hr></hr>
        React.js API Kullanımı Workshop
      </p>
      <br></br>
      Hoş Geldiniz
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from "./Navbar"
import Routing from "./components/Routing"

function App() {
  // const [coins, setCoins] = useState([]);

  // useEffect(() => {
    // fetch('http://localhost:5000/coins')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setCoins(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  // }, []);

  return (
    <>
      <Navbar />
      <Routing />
    </>
  )
}

export default App;
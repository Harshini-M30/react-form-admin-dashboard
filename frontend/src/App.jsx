// testing by creating a admin dashboard
// import Admin from "./Admin";

// function App(){
//   return <Admin />;
// }

// export default App;
import { Routes, Route, Link } from "react-router-dom"
import Form from "./Form"
import Admin from "./Admin"

function App(){

  return (

    <div>

      <nav style={{marginBottom:"20px"}}>
        <Link to="/">Form</Link> | {" "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

    </div>

  )
}

export default App
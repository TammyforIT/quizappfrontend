import { useNavigate } from "react-router-dom";
//tokens are for backend
export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    //simply logs out. 
    navigate("/auth");
  } 

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome!</p>

      {}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

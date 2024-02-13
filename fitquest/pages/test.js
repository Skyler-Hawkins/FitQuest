import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



// Sample other page, 
const Dashboard = () => {
  return (
    <>
    <div>
      <h1>Dashboard Page</h1>
      {/* return Link */}
      <h2><Link href="/">Back to main file</Link></h2>
      <p>Welcome to the dashboard!</p>
    </div>

    


    </>
  );

};

export default Dashboard;
  
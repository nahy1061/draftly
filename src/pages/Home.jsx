import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Home() {

  return (
    <div className="mx-2">
      <h1>Draftly</h1>
      <p className="mb-5">Your career, drafted to perfection</p>
      <ThemeToggle />
      {/* TODO: add a Link (or button) that navigates to "/builder" */}
      <Link to='/builder' className="bg-green-500 px-4 py-2 rounded-2xl text-white active:scale-95 hover:bg-green-600">Builder</Link>
   
    </div>
  );
}

export default Home;
import "./index.css";
import Scissor from "./components/Scissor";

function App() {
  return (
    <>
      <div className="grid mt-10 max-width ">
        <div>
          <h1 className="text-5xl lg:text-6xl mb-5 font-semibold text-slate-800 px-5">
            Is the URL too long? Worry not, we've got you covered.
          </h1>
          <p className="lg:text-lg text-slate-400 mb-10 max-width">
            With Scissor we make your URLs as short as possible.
          </p>
        </div>
        <div>
          <Scissor />
        </div>
      </div>
    </>
  );
}

export default App;

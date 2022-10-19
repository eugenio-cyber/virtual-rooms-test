import Header from "../../components/Header";
import "./styles.css";

function App() {
  return (
    <div className='container'>
      <Header />
      <main className='home'>
        <section className='home__video'></section>
        <section className='home__chat'></section>
      </main>
    </div>
  );
}

export default App;

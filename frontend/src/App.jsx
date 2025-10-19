import { AthleteProvider, useAthletes } from "./context/AthleteContext";
import AthleteForm from "./components/AthleteForm";
import AthleteList from "./components/AthleteList";
import "./index.css";

function Toolbar() {
  const { setFilter, filter } = useAthletes();
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <h1 className="text-3xl font-bold">Urheilijat</h1>
      <div className="flex gap-2">
        <input
          placeholder="Haku (nimi, saavutukset)"
          className="input"
          value={filter.q}
          onChange={(e) => setFilter({ q: e.target.value })}
        />
        <input
          placeholder="Laji"
          className="input"
          value={filter.sport}
          onChange={(e) => setFilter({ sport: e.target.value })}
        />
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Toolbar />
      <AthleteForm />
      <AthleteList />
    </div>
  );
}

export default function App() {
  return (
    <AthleteProvider>
      <Page />
    </AthleteProvider>
  );
}

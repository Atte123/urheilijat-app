import { useAthletes } from "../context/AthleteContext";
import AthleteCard from "./AthleteCard";

export default function AthleteList() {
  const { athletes, loading, error } = useAthletes();
  if (loading) return <p>Ladataan…</p>;
  if (error) return <p className="text-red-600">Virhe: {error}</p>;
  if (!athletes.length) return <p>Ei urheilijoita vielä.</p>;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {athletes.map((a) => (
        <AthleteCard key={a.id} athlete={a} />
      ))}
    </div>
  );
}

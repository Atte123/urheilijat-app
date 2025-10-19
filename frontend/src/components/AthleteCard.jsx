import { useState } from "react";
import { useAthletes } from "../context/AthleteContext";
import AthleteForm from "./AthleteForm";

export default function AthleteCard({ athlete }) {
  const { deleteAthlete } = useAthletes();
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl shadow bg-white/70 dark:bg-black/30 overflow-hidden">
      {athlete.image_url && (
        <img
          src={athlete.image_url}
          alt={`${athlete.first_name} ${athlete.last_name}`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {athlete.first_name} {athlete.last_name}
            {athlete.nickname ? ` ("${athlete.nickname}")` : ""}
          </h3>
          <span className="text-sm opacity-70">{athlete.sport}</span>
        </div>
        <p className="text-sm opacity-80">
          Syntynyt: {new Date(athlete.birthdate).toLocaleDateString()}
        </p>
        <p className="text-sm opacity-80">Paino: {athlete.weight} kg</p>
        {athlete.achievements && (
          <p className="text-sm">{athlete.achievements}</p>
        )}
        <div className="flex gap-2 pt-2">
          {athlete.image_url && (
            <a
              href={athlete.image_url}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-2xl bg-gray-200 dark:bg-gray-800 text-sm"
            >
              Kuva
            </a>
          )}
          <button
            onClick={() => setEditing((v) => !v)}
            className="px-3 py-1 rounded-2xl bg-amber-500 text-white text-sm"
          >
            Muokkaa
          </button>
          <button
            onClick={() => deleteAthlete(athlete.id)}
            className="px-3 py-1 rounded-2xl bg-red-600 text-white text-sm"
          >
            Poista
          </button>
        </div>
        {editing && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <AthleteForm edit={athlete} onDone={() => setEditing(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

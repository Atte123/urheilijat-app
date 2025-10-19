import { useEffect, useState } from "react";
import { useAthletes } from "../context/AthleteContext";

const empty = {
  first_name: "",
  last_name: "",
  nickname: "",
  birthdate: "",
  weight: "",
  image_url: "",
  sport: "",
  achievements: "",
};

export default function AthleteForm({ edit, onDone }) {
  const [form, setForm] = useState(edit || empty);
  const { addAthlete, updateAthlete } = useAthletes();

  useEffect(() => {
    setForm(edit || empty);
  }, [edit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, weight: Number(form.weight) };
    if (edit?.id) await updateAthlete(edit.id, payload);
    else await addAthlete(payload);
    onDone?.();
    setForm(empty);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/60 dark:bg-black/20 p-4 rounded-2xl shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="Etunimi"
          className="input"
          required
        />
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Sukunimi"
          className="input"
          required
        />
        <input
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="Kutsumanimi"
          className="input"
        />
        <input
          type="date"
          name="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="number"
          step="0.01"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Paino (kg)"
          className="input"
          required
        />
        <input
          name="sport"
          value={form.sport}
          onChange={handleChange}
          placeholder="Laji"
          className="input"
          required
        />
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Kuvan URL"
          className="input col-span-full"
        />
        <textarea
          name="achievements"
          value={form.achievements}
          onChange={handleChange}
          placeholder="Saavutukset"
          className="input col-span-full"
          rows={3}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-2xl shadow bg-blue-600 text-white hover:opacity-90"
        >
          {edit?.id ? "Päivitä" : "Lisää"} urheilija
        </button>
      </div>
    </form>
  );
}

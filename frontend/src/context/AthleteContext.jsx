import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../services/api";

const AthleteContext = createContext();

const initialState = {
  athletes: [],
  loading: false,
  error: null,
  filter: { q: "", sport: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SET":
      return { ...state, athletes: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };
    default:
      return state;
  }
}

export function AthleteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchAthletes() {
    dispatch({ type: "LOADING" });
    try {
      const params = {};
      if (state.filter.q) params.q = state.filter.q;
      if (state.filter.sport) params.sport = state.filter.sport;
      const res = await api.get("/athletes", { params });
      dispatch({ type: "SET", payload: res.data });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  }

  async function addAthlete(data) {
    await api.post("/athletes", data);
    await fetchAthletes();
  }

  async function updateAthlete(id, data) {
    await api.put(`/athletes/${id}`, data);
    await fetchAthletes();
  }

  async function deleteAthlete(id) {
    await api.delete(`/athletes/${id}`);
    await fetchAthletes();
  }

  useEffect(() => {
    fetchAthletes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter.q, state.filter.sport]);

  const value = {
    ...state,
    fetchAthletes,
    addAthlete,
    updateAthlete,
    deleteAthlete,
    setFilter: (f) => dispatch({ type: "FILTER", payload: f }),
  };

  return (
    <AthleteContext.Provider value={value}>{children}</AthleteContext.Provider>
  );
}

export function useAthletes() {
  return useContext(AthleteContext);
}

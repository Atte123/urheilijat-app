import * as Athletes from "../models/athleteModel.js";
import { validateAthlete } from "../validators/athleteValidator.js";

export async function list(req, res, next) {
  try {
    const { sport, q, limit, offset } = req.query;
    const rows = await Athletes.findAll({ sport, q, limit, offset });
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const row = await Athletes.findById(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = validateAthlete(req.body);
    const created = await Athletes.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const existing = await Athletes.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    const data = validateAthlete(req.body);
    const updated = await Athletes.updateById(req.params.id, data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const existing = await Athletes.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    await Athletes.removeById(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

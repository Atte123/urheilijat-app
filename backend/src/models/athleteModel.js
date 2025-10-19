import { query } from "../db.js";

export async function findAll({ sport, q, limit = 50, offset = 0 }) {
  const where = [];
  const params = [];

  const sportTrim = typeof sport === "string" ? sport.trim() : "";
  const qTrim = typeof q === "string" ? q.trim() : "";

  // Laji: osittainen ja case-insensitive
  if (sportTrim) {
    where.push("LOWER(sport) LIKE LOWER(?)");
    params.push(`%${sportTrim}%`);
  }

  // Yleishaku: mukana myös laji
  if (qTrim) {
    where.push(`(
      first_name   LIKE ?
      OR last_name LIKE ?
      OR nickname  LIKE ?
      OR achievements LIKE ?
      OR sport     LIKE ?
    )`);
    const like = `%${qTrim}%`;
    params.push(like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  params.push(Number(limit), Number(offset));

  const rows = await query(
    `SELECT * FROM athletes ${whereSql}
     ORDER BY last_name, first_name
     LIMIT ? OFFSET ?`,
    params
  );
  return rows;
}

export async function findById(id) {
  const rows = await query("SELECT * FROM athletes WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function create(ath) {
  const sql = `INSERT INTO athletes
    (first_name, last_name, nickname, birthdate, weight, image_url, sport, achievements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    ath.first_name,
    ath.last_name,
    ath.nickname,
    ath.birthdate,
    ath.weight,
    ath.image_url,
    ath.sport,
    ath.achievements,
  ];
  const res = await query(sql, params);
  return { id: res.insertId, ...ath };
}

export async function updateById(id, ath) {
  const sql = `UPDATE athletes SET
    first_name=?, last_name=?, nickname=?, birthdate=?, weight=?, image_url=?, sport=?, achievements=?, updated_at=NOW()
    WHERE id=?`;
  const params = [
    ath.first_name,
    ath.last_name,
    ath.nickname,
    ath.birthdate,
    ath.weight,
    ath.image_url,
    ath.sport,
    ath.achievements,
    id,
  ];
  await query(sql, params);
  return await findById(id);
}

export async function removeById(id) {
  await query("DELETE FROM athletes WHERE id = ?", [id]);
}

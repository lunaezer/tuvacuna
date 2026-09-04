import { query } from "../db.js";

/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 */

const getPacientes = async (_, res) => {
    const result = await query("SELECT * FROM pacientes");
    res.json(result.rows);
};

const pacientes = {
    getPacientes
};

export default pacientes;
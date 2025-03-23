const express = require("express");
const apicache = require("apicache");

const pacienteController = require("../../controllers/pacienteController");

const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: query
 *         id: id
 *         schema:
 *           type: string
 *         description: La cedula del paciente
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Paciente"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/", cache("2 minutes"), pacienteController.getAllPacientes);
/**
 * @openapi
 * /api/v1/pacientes/:id:
 *   get:
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: La cedula del paciente que desea buscar.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Paciente"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/:idPaciente", pacienteController.getOnePaciente);

router.post("/", pacienteController.createNewPaciente);

router.patch("/:idPaciente", pacienteController.updateOnePaciente);

module.exports = router;
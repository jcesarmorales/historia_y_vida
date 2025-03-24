const express = require("express");
const apicache = require("apicache");

const historiaClinicaController = require("../../controllers/historiaClinicaController");

const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/HistoriasClinicas:
 *   get:
 *     tags:
 *       - HistoriasClinicas
 *     parameters:
 *       - in: query
 *         idHc: idHc
 *         schema:
 *           type: string
 *         description: La cedula del HistoriaClinica
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
 *                     $ref: "#/components/schemas/HistoriaClinica"
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
router.get("/", cache("2 minutes"), historiaClinicaController.getAllHistoriasClinicas);
/**
 * @openapi
 * /api/v1/HistoriasClinicas/:idHc:
 *   get:
 *     tags:
 *       - HistoriasClinicas
 *     parameters:
 *       - in: query
 *         name: idHc
 *         schema:
 *           type: string
 *         description: La cedula del HistoriaClinica que desea buscar.
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
 *                     $ref: "#/components/schemas/HistoriaClinica"
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

router.get("/:idHc", historiaClinicaController.getOneHistoriaClinica);

router.get("/hcpaciente/:idPaciente", historiaClinicaController.getAllHcForPacient);

router.post("/", historiaClinicaController.createNewHistoriaClinica);

router.patch("/:idHc", historiaClinicaController.updateOneHistoriaClinica);

module.exports = router;
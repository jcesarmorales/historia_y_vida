const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const v1AuthRouter = require("./src/v1/routes/authRoutes");
const v1PacienteRoutes = require("./src/v1/routes/pacienteRoutes");
const v1HistoriaClinicaRoutes = require("./src/v1/routes/historiaClinicaRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/pacientes", v1PacienteRoutes);
app.use("/api/v1/HistoriasClinicas", v1HistoriaClinicaRoutes)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);

  V1SwaggerDocs(app, PORT);
});

import { app } from "./app"; 

const port = 5500;


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
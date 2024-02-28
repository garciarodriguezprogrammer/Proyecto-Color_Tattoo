import app from "./app";
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log("Server is running in port "+ port);
});

//Para evitar que  el servidor crashee cuando se reinicia solo 
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed');
        // Aquí puedes también cerrar conexiones de base de datos o realizar otras tareas de limpieza
        process.exit(0);
    });
});


import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Versão do Postgres
  const databaseVersionCheck = await database.query("SHOW server_version");
  const databaseVersion = databaseVersionCheck.rows[0].server_version;

  // Max connections
  const maxConnectionCheck = await database.query("SHOW max_connections");
  const maxConnections = maxConnectionCheck.rows[0].max_connections;

  // Current active connections
  const databaseName = process.env.POSTGRES_DB;
  const currentConnectionsCheck = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity where datname = $1",
    values: [databaseName],
  });

  const activeConnections = currentConnectionsCheck.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: activeConnections,
      },
    },
  });
}

// Versão do postgres
// Quantidade de conexões máximas
// Conexões utilizadas

export default status;

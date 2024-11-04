test(" GET to /api/v1/status should return 200", async () => {
  // Connection test
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // See if there is any data
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  // Check if a date is null
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  // Postgres' version
  expect(responseBody.dependencies.database.version).toBe("16.4");

  // Postgres max amount of connections
  expect(responseBody.dependencies.database.max_connections).toBe(100);

  // Postgress current connections
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});

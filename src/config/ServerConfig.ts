
function ServerConfig() {
  const port = process.env.SERVER_PORT;
  return { port };
}

const { port } = ServerConfig();

export { port };

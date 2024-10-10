function status(request, response) {
  response.status(200).json({
    chave: "exemplo"
  });
}

export default status;

interface ApiResponse {
    data: any; // El tipo de datos que se envían en la respuesta
    message: string; // Mensaje de información o error
    error: boolean; // Indica si hubo un error (true) o no (false)
  }
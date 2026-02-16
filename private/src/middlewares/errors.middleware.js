import { ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  console.error(err);

  // Erro de validação (Zod)
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Erro de validação",
      details: err.errors.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }

  // Erros controlados (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Erros inesperados
  return res.status(500).json({
    error: "Erro interno do servidor"
  });
}

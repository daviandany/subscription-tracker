import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20, // máximo 20 requests por IP nesse tempo
    standardHeaders: true,
    legacyHeaders: false,
})
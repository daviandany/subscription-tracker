import jwt from 'jsonwebtoken'

export default function auth(req, res, next){

    const authHeader = req.header('Authorization');
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não encontrado" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next()
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' })
    }
}
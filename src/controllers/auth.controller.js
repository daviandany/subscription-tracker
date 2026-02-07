import jwt from 'jsonwebtoken';

jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}, 
    (err, token) => {
        if(err) throw err;
        res.json( { token })
    }
)



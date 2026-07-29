import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/userRoutes.js'
import listingRoutes from '../routes/listingRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "API UniMarket funcionando!" })
})

app.use('/users', userRoutes)
app.use('/anuncios', listingRoutes);

export default app;
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/user', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            }
        });
        res.status(201).send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/user', async (req, res) => {

    console.log(req)

    let userss = []

    if (req.query) {
        userss = await prisma.user.findMany({
            where: {
                age: req.query.age
            }
        })
    } else {
        userss = await prisma.user.findMany();
    }

    res.status(200).json(userss);
});

app.put('/user/:id', async (req, res) => {

    console.log(req)

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })
});

app.delete('/user/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    console.log("usuario ", req.params.name, "deletado com sucesso")
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
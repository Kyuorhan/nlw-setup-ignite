import Fastify from 'fastify';
import Cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(Cors)

/* Metodo HTTP: Get, Post, Put, Patch, Delete */

app.get('/hello', async () => {
    const habits = await prisma.habit.findMany({
        // where: {
        //     title: {
        //         startsWith: 'Exerc'
        //     }
        // }

    })

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server running!')
})
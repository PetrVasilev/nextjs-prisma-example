import { PrismaClient } from '@prisma/client'

import { prisma } from '../../utils/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title } = JSON.parse(req.body)
        if (!title) {
            return res.status(400).json({
                message: 'bad-request'
            })
        }
        const created = await prisma.todo.create({
            data: { title }
        })
        return res.json({
            message: 'success',
            todo: created
        })
    }
    if (req.method === 'PUT') {
        const { id } = JSON.parse(req.body)
        const todo = await prisma.todo.findUnique({ where: { id } })
        if (todo) {
            const updated = await prisma.todo.update({
                where: { id },
                data: { done: !todo.done }
            })
            return res.json({
                message: 'success',
                todo: updated
            })
        }
    }
    if (req.method === 'DELETE') {
        const { id } = JSON.parse(req.body)
        const todo = await prisma.todo.findUnique({ where: { id } })
        if (todo) {
            const deleted = await prisma.todo.delete({
                where: { id }
            })
            return res.json({
                message: 'success',
                todo: deleted
            })
        }
    }
    return res.status(404).json({
        message: 'not-found'
    })
}

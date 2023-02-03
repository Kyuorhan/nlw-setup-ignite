import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from  'zod'
import { prisma } from './lib/prisma'

/* Metodo HTTP: Get, Post, Put, Patch, Delete */

export async function appRoutes(app: FastifyInstance) {
    // verificar requisição: title, weekDays    
    app.post('/habits', async (request) => {
        
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    }
                )}
            }
        })
    })

    // todos habitos possiveis 
    // hábito que ja foram completados 
    app.get('/day', async (request) => {
        const getDayParams =z.object({
            date: z.coerce.date()
        })
        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        const possibleHabits = await prisma.habit .findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }          
            }

        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
              dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits
        }

    })
    
    // completar / não-completar um habito
    app.patch('/habits/:id/toggle', async (request) => {
      // route param => parâmetros de identificação

      const toggleHabitParams = z.object({
       id: z.string().uuid(),     
      })

      const { id } = toggleHabitParams.parse(request.params)

      const today = dayjs().startOf('day').toDate()

      let day = await prisma.day.findUnique({
        where: {
          date: today,
        }
      })

      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          }
        })
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          }
        }
      })

      if (dayHabit) {
        // Remover o hábito completado
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          }
        })
      } else {
        // Completar o hábito 
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          }
        })
      }

    })

    // retorna todo resumo dos dias
    app.get('/summary', async () => {
      // Se query for mais complexa, mais condições e mais relacionamentos => Fazer SQL na mão / Chamado de (RAW)
      // Prisma ORM: Qnd for escrever RAW SQL => Só funciona para banco especifico SQLite

      // Exemplo para retorna [ { date: 17/01, amount: 5, completed: 1 }, {date: 18/01, amount: 2, completed: 2 }, {} ] 

      const summary = await prisma.$queryRaw`
        SELECT 
          D.id, 
          D.date,
          (
            SELECT 
              cast(count(*) as float)
            FROM day_habit DH
            WHERE DH.day_id = D.id
          ) as completed,
          (
            SELECT
              cast(count(*) as float)
            FROM habit_week_days HDW
            JOIN habits H
              ON H.id = HDW.habit_id
            WHERE
              HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
              AND H.created_at <= D.date
          ) as amount
        FROM days D
      `

       return summary
    })

}


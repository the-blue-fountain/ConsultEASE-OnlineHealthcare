import express, {Express, IRouter, Request, Response} from 'express'
import { detailsRouter } from './Doctor/details';
import { dashRouter } from './Doctor/dashboard';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();

export const docRouter:IRouter=express.Router();
docRouter.use('/details',detailsRouter);
docRouter.use('/dashboard',dashRouter);

docRouter.get('/get/:id',async(req:Request,res:Response)=>{
    const doctorId=req.params.id;
    try{
        const doctor=await prisma.doctor.findFirst({
            where:{id:doctorId}
        })
        return res.json(doctor);
    }catch(e){
        console.log(e);
        res.status(403);
        return res.json({error:"Database Issue"});
    }
})

docRouter.get('/feedback/:id',async(req:Request,res:Response)=>{
    const appointmentid=req.params.id;
    try{
        const offline_appointment=await prisma.offline_Appointment.findFirst({
            where:{
                id:appointmentid
            }
        });
        
        const online_appointment=await prisma.online_Appointment.findFirst({
                where:{
                    id:appointmentid
                }
        });
        if(offline_appointment){
            return res.json(offline_appointment);
        }else{
            return res.json(online_appointment);
        }
    }catch(e){
        console.log(e);
        res.status(403);
        return res.json({error:"Database Issue"});
    }
})
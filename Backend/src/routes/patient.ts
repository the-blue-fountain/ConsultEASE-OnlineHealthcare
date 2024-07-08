import express, {Express, IRouter, Request, Response} from 'express'
import { detailsRouter } from './Patient/details';
import { findDocRouter } from './Patient/finddoc';
import { bookRouter } from './Patient/appointment';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();

export const patRouter:IRouter=express.Router();
patRouter.use('/details',detailsRouter);
patRouter.use('/doctors',findDocRouter);
patRouter.use('/book',bookRouter);

patRouter.get('/get/:id',async(req:Request,res:Response)=>{
    const patientId=req.params.id;
    try{
        const patient=await prisma.patient.findFirst({
            where:{id:patientId}
        })
        return res.json(patient);
    }catch(e){
        console.log(e);
        res.status(403);
        return res.json({error:"Database Issue"});
    }
})
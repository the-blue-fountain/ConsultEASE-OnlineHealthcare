import express, {Express, IRouter, Request, Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { patInfo } from '../../InputType/info';


export const detailsRouter:IRouter=express.Router();
const prisma=new PrismaClient();
detailsRouter.use('/*',async(req:Request,res:Response,next:NextFunction)=>{
    const webtoken=req.header('Authorization');
    if(!webtoken){
        res.status(401);
        return res.json({error:"Unauthorized"});
    }
    const token=webtoken.split(' ')[1];
    try{
        const jwtsecret=process.env.JWT_PASSWORD || 'secret';
        const payload=jwt.verify(token,jwtsecret);
        if(!payload || typeof payload==='string'){
            res.status(401);
            return res.json({error:"Unauthorized"});
        }
        //console.log(payload.id);
        res.set({'patientId':payload.id});
        next();
    }catch(e){
        res.status(403);
        return res.json({
            message:"Not logged in"
        })
    }
})
detailsRouter.post('/add', async (req:Request, res:Response)=>{
    const {success}=patInfo.safeParse(req.body);
    if(!success){
        return res.json({error:"Invalid Input"});
    }
    const patientId=res.get('patientId');
    const body=req.body;
    try{
        await prisma.patient.update({
            where:{id:patientId},
            data:{
                mobile:body.mobile,
                age:body.age,
                gender:body.gender,
                latitude:body.latitude,
                longitude:body.longitude,
                profile_pic:body.profile_pic
            }
        })
        return res.json({message:"Successfully Added"});
    }catch(e){
        console.log(e);
        res.status(403);
        return res.json({error:"Database Issue"});
    }
});

detailsRouter.get('/get', async (req:Request, res:Response)=>{
    const patientId=res.get('patientId');
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


detailsRouter.put('/update', async (req:Request, res:Response)=>{
    const patientId=res.get('patientId');
    const body=req.body;
    try{
        await prisma.patient.update({
            where:{id:patientId},
            data:{
                name:body.name,
                password:body.password,
                age:body.age,
                mobile:body.mobile,
                gender:body.gender,
                latitude:body.latitude,
                longitude:body.longitude,
                profile_pic:body.profile_pic
            }
        })
        return res.json({message:"Successfully Updated"});
    }catch(e){
        console.log(e);
        res.status(403);
        return res.json({error:"Database Issue"});
    }
})
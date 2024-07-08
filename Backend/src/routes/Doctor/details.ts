import express, {Express, IRouter, Request, Response,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { doctorInfo } from '../../InputType/info';

export const detailsRouter:IRouter = express.Router();
const prisma = new PrismaClient();

detailsRouter.use('/*',async(req:Request,res:Response,next:NextFunction)=>{
    const webtoken=req.header('Authorization');
    //console.log(webtoken);
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
        res.set({'doctorId':payload.id});
        next();
    }catch(e){
        res.status(408);
        return res.json({
            message:"Not logged in"
        })
    }
})

detailsRouter.post('/add', async (req:Request, res:Response)=>{
    const {success}=doctorInfo.safeParse(req.body);
    if(!success){
        return res.json({error:"Invalid Input"});
    }
    const doctorId=res.get('doctorId');
    const body=req.body;
    try{
        await prisma.doctor.update({
            where:{id:doctorId},
            data:{
                age:body.age,
                gender:body.gender,
                mobile:body.mobile,
                latitude:body.latitude,
                longitude:body.longitude,
                specialization:body.specialization,
                experience:body.experience,
                clinic:body.clinic,
                fee:body.fee,
                online_fee:body.online_fee,
                clinic_days:body.clinic_days,
                profile_pic:body.profile_pic,
                medical_certificate:body.medical_certificate
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
    const doctorId=res.get('doctorId');
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

detailsRouter.put('/update', async (req:Request, res:Response)=>{
    const doctorId=res.get('doctorId');
    const body=req.body;
    try{
        await prisma.doctor.update({
            where:{id:doctorId},
            data:{
                password:body.password,
                mobile:body.mobile,
                age:body.age,
                gender:body.gender,
                latitude:body.latitude,
                longitude:body.longitude,
                specialization:body.specialization,
                experience:body.experience,
                clinic:body.clinic,
                fee:body.fee,
                online_fee:body.online_fee,
                clinic_days:body.clinic_days,
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
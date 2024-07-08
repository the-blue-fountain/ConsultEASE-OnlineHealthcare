import express, {Express, IRouter, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';
import { signinInput,signupInput} from '../InputType/auth';
import jwt from 'jsonwebtoken';
export const authRouter:IRouter=express.Router();

const prisma=new PrismaClient();

authRouter.post('/signup',async (req:Request,res:Response)=>{
    const {success}=signupInput.safeParse(req.body);
    if(!success){
        return res.json({message:"Invalid Input"});
    }
    try{
        const existinguser1=await prisma.doctor.findFirst({
            where:{email:req.body.email}
        })
        const existinguser2=await prisma.patient.findFirst({
            where:{email:req.body.email}
        })
        if(existinguser1 || existinguser2){
            return res.json({message:"User Already Exists"});
        }
        const body=req.body;
        if(body.type=="Patient"){
            const patient=await prisma.patient.create({
                data:{
                    name:body.name,
                    email:body.email,
                    password:body.password,
                    appointments:{}
                }
            })
            const jwtsecret=process.env.JWT_PASSWORD || 'secret';
            const token=jwt.sign({id:patient.id},jwtsecret);
            return res.json({jwt:token});
        }
        else{
            const doctor=await prisma.doctor.create({
                data:{
                    name:body.name,
                    email:body.email,
                    password:body.password,
                    clinic_days:[],
                    appointments:{}
                }
            })
            const jwtsecret=process.env.JWT_PASSWORD || 'secret';
            const token=jwt.sign({id:doctor.id},jwtsecret);
            return res.json({jwt:token});
        }


    }catch(e){
        res.status(403);
        return res.json({error:"Database Issue"});
    }
});

authRouter.post('/signin',async (req:Request,res:Response)=>{
    const {success}=signinInput.safeParse(req.body);
    if(!success){
        return res.json({message:"Invalid Input"});
    }
    const body=req.body;
    const patient=await prisma.patient.findFirst({
        where:{email:body.email,
            password:body.password}
    });
    if(patient){
        const jwtsecret=process.env.JWT_PASSWORD ||'secret';
        const token=jwt.sign({id:patient.id},jwtsecret);
        return res.json({jwt:token,
                        type:"Patient"});
    }
    else{
        const doctor=await prisma.doctor.findFirst({
            where:{email:body.email,
                password:body.password}
        });
        if(doctor){
            const jwtsecret=process.env.JWT_PASSWORD ||'secret';
            const token=jwt.sign({id:doctor.id},jwtsecret);
            return res.json({jwt:token,
                            type:"Doctor"});
        }
        else{
            return res.json({message:"Password or Email did not match"});
        }
    }


});
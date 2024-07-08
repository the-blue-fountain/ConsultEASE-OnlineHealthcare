import express, {Express, IRouter, Request, Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


export const findDocRouter:IRouter=express.Router();
const prisma=new PrismaClient();
function calculateDistance(lat1:number , lon1:number, lat2:number, lon2:number) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
  }
findDocRouter.use('/*',async(req:Request,res:Response,next:NextFunction)=>{
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
findDocRouter.get('/all',async (req:Request, res:Response)=>{
    const filter=req.query.filter;
    const patientId=res.get('patientId');
    const patient=await prisma.patient.findFirst({
        where:{id:patientId},
        select:{
            latitude:true,
            longitude:true
        }
    });
    if (!patient) {
        return res.status(404).send("Not Logged In");
    }
    const { latitude:patientLat,longitude:patientLon }=patient;
    let doctors;

    if(filter!=""){
        doctors=await prisma.doctor.findMany({
            where:{
                name:{
                    contains:(filter as string)
                }
            },
            select:{
                id:true,
                name:true,
                latitude:true,
                longitude:true,
                specialization:true,
                experience:true,
                clinic:true,
                rating:true,
                fee:true,
                online_fee:true,
                clinic_days:true,
                profile_pic:true
            }
        });
    }
    else{
        doctors=await prisma.doctor.findMany({
            select:{
                id:true,
                name:true,
                latitude:true,
                longitude:true,
                specialization:true,
                experience:true,
                clinic:true,
                rating:true,
                fee:true,
                online_fee:true,
                clinic_days:true,
                profile_pic:true
            }
        });
    }
    if(!patientLat || !patientLon) {
        return res.json(doctors);
    }
    const doctorsWithDist=doctors.map(doctor=>{
        const {latitude,longitude}=doctor;
        if(!latitude || !longitude) {
            return { ...doctor, distance: Number.POSITIVE_INFINITY };
        }
        const distance=calculateDistance(latitude,longitude,patientLat,patientLon);
        return {...doctor,distance:distance};
    });
    const sortedDoctors=doctorsWithDist.sort((a,b)=>a.distance-b.distance);
    return res.json(sortedDoctors);
});


findDocRouter.get('/:type',async (req:Request, res:Response)=>{
    const specialization=req.params.type;
    const patientId=res.get('patientId');
    const patient=await prisma.patient.findFirst({
        where:{id:patientId},
        select:{
            latitude:true,
            longitude:true
        }
    });
    if (!patient) {
        return res.status(404).send("Not Logged In");
    }
    const { latitude:patientLat,longitude:patientLon }=patient;
    const doctors=await prisma.doctor.findMany({
        where:{specialization:specialization},
        select:{
            id:true,
            name:true,
            latitude:true,
            longitude:true,
            specialization:true,
            experience:true,
            clinic:true,
            rating:true,
            fee:true,
            online_fee:true,
            clinic_days:true,
            profile_pic:true
        }
    });
    if(!patientLat || !patientLon) {
        return res.json(doctors);
    }
    const doctorsWithDist=doctors.map(doctor=>{
        const {latitude,longitude}=doctor;
        if(!latitude || !longitude) {
            return { ...doctor, distance: Number.POSITIVE_INFINITY };
        }
        const distance=calculateDistance(latitude,longitude,patientLat,patientLon);
        return {...doctor,distance:distance};
    });
    const sortedDoctors=doctorsWithDist.sort((a,b)=>a.distance-b.distance);
    return res.json(sortedDoctors);
});
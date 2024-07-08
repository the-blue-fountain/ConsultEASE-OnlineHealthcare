import z from"zod";

export const patInfo=z.object({
    mobile:z.string().min(10).max(10),
    age:z.number(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number()
})

export type patInfotype=z.infer<typeof patInfo>;

export const doctorInfo=z.object({
    mobile:z.string().min(10).max(10),
    age:z.number().int(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number(),
    specialization:z.string(),
    experience:z.string(),
    clinic:z.string(),
    fee:z.number(),
    online_fee:z.number(),
    clinic_days:z.array(z.string())

})
export type doctorInfotype=z.infer<typeof doctorInfo>;
export const docUpdate=z.object({
    mobile:z.string().min(10).max(10),
    password:z.string().min(8),
    age:z.number().int(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number(),
    specialization:z.string(),
    experience:z.string(),
    clinic:z.string(),
    fee:z.number(),
    online_fee:z.number(),
    clinic_days:z.array(z.string()),
    profile_pic:z.string(),
})
export type doctorUpdateType=z.infer<typeof docUpdate>;


export const doctorFullInfo=z.object({
    mobile:z.string().min(10).max(10),
    age:z.number().int(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number(),
    specialization:z.string(),
    experience:z.string(),
    clinic:z.string(),
    fee:z.number(),
    online_fee:z.number(),
    clinic_days:z.array(z.string()),
    name:z.string(),
    email:z.string().email(),
    rating:z.number(),
    password:z.string().min(8),
    profile_pic:z.string(),
    medical_certificate:z.string()
})
export type doctorFullInfotype=z.infer<typeof doctorFullInfo>;

export const patientFullInfo=z.object({
    mobile:z.string().min(10).max(10),
    age:z.number().int(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number(),
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8),
    profile_pic:z.string()
})

export type patientFullInfotype=z.infer<typeof patientFullInfo>;

export const patientUpdate=z.object({
    mobile:z.string().min(10).max(10),
    password:z.string().min(8),
    age:z.number().int(),
    gender:z.string(),
    latitude:z.number(),
    longitude:z.number(),
})
export type patientUpdateType=z.infer<typeof patientUpdate>;
import { model,Schema } from "mongoose";

const StartUpSchema= new Schema(
    {
        StartupName:{
            type:String,
            required:[true,"Startup name is required "],
        },
        BusinessRegistrationNumber:{
            type:Number,
            required:[true,"Business Registration Number is required "],
            validate: {
                validator: v => /^[0-9]{7}[A-Za-z]$/.test(v),
                message: 'Business Registration Number must be 7 digits followed by one letter '
            }
            
        },
        Industry:{
            type:String,
            required:[true,"Industry is required "],
        },
        BriefDescription:{
            type:String,
            required:[true,"Description is required "],
        },
        UploadGovernmentIssuedID:{
            type:String,
            required:[true,"Government-Issued ID is required"]
        },
        UploadBusinessRegistrationCertificate:{
            type:String,
            required:[true,"Business Registration Certificate is required"]
        },
        LinkedInorSocialMediaProfile:{
            type:String,
            required:[true,"LinkedIn or Social Media Profile is required"]
        },


    },
    {timestamps:true}
);

const Startup=model("Startup",StartUpSchema);
export default Startup
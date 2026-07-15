const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://agnet:agnet19@ac-noeplyt-shard-00-00.exoivte.mongodb.net:27017,ac-noeplyt-shard-00-01.exoivte.mongodb.net:27017,ac-noeplyt-shard-00-02.exoivte.mongodb.net:27017/petdb?ssl=true&replicaSet=atlas-itatbn-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("mongodb connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)

const Pet=mongoose.model("Pets",new mongoose.Schema(
    {
        bookingId: String,
        petName: String,
        petType: String,
        breed: String,
        age: String,
        weight: String,
        vaccinationStatus: String,
        ownerName: String,
        ownerPhone: String,
        ownerEmail: String,
        checkInDate: String,
        checkOutDate: String,
        kennelNumber: String
    }
))

app.get("/view-pet",async(req,res)=> {
    const pets=await Pet.find()
    res.json(pets);
});

app.post("/add-pet",async (req,res) => {
    await Pet.create(req.body)
    res.json({"status":"success"});
});

app.listen(4000, ()=> {
    console.log("server started")
});
import {Schema,model,models} from 'mongoose'
import { ST } from 'next/dist/shared/lib/utils'

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim:true,
        maxlength: [40,'Title must be less than 40 characters']
    },
    description: {
        type: String,
        required:true,
        trim:true,
        maxlength: [200, 'Descripton must be less than 200 characters']
    }
},{
    timestamps:true,
    versionKey: false
})


export default models.Task || model('Task',taskSchema)
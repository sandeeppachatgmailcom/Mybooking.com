const mongoose = require('mongoose')
const db = require('../model/mongoose')
const controller = require('../controller/adminController')

const newImageRecord = new mongoose.Schema({
    Documentindex: {type: String} ,
    collectionName: { type: String },
    ImageRecordIndex: { type: String },
    imageField: { type: String },
    currentImage: { type: String },
  });
const ImageDoc = db.model('ImageDoc',newImageRecord)


async function saveImage (reqObj){
    const result={
        saved:false,
        update:false,
        delete:false,
        found:false,
        message:''
    }
    if(!reqObj.Documentindex) reqObj.Documentindex =await controller.getIndex('imageDoc')
    newImage = {
        Documentindex:reqObj.Documentindex,
        ImageRecordIndex:reqObj.ImageRecordIndex,
        imageField :reqObj.imageField ,
        currentImage :reqObj.currentImage ,
    }

    console.log(newImage);

    const save = await ImageDoc.updateOne({ 
                ImageRecordIndex:reqObj.ImageRecordIndex,
                imageField :reqObj.imageField ,
                }
                ,{
                $set:newImage 
                },
                {
                    upsert:true
                })
    if(save.modifiedCount>0){
        result.update = true;
        result.message ='Image saved Success '
    }
    else if(save.upsertedCount>0){
        result.saved = true;
        result.message ='Image edited Success '
    }
    else {
        result.found = true;
        result.message ='Image exist, nochanges found  '
    }
    console.log(result);
return result ;
}


module.exports = {ImageDoc,saveImage}
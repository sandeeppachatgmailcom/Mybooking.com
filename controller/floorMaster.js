const express = require('express')
const router = express.Router();
const frontDesk = require('../model/checkIn')
const checkinPlan = require('../model/planMaster')
const Rooms = require('../model/rooms')
const tariffmaster = require('../model/tariff')
const frontoffice = require('../model/checkIn')
const floor =  require('../model/floor')
const token = require('../middleware/jwt')
router.get('/',(req,res)=>{
    res.redirect('/admin')
})
router.post('/loadfloorbypagenumber',async (req, res) => {
    let pagenumber = req.body.index;
    const perpage = 2;
    const data = await floor.floors.find().countDocuments()
    .then(documents => {docCount = documents;
        return floor.floors.find()
        .skip((pagenumber - 1) * perpage)
        .limit(perpage)
        })
    const pagecount = await floor.floors.find()
        .countDocuments()
        .then(tcount => {
        return Math.ceil(tcount / perpage);
    })
    res.render('floor', { data, pagecount })
})
 
router.post('/savefloor',async (req, res) => {
    let index = ''
    if (req.body.floorindex === '') { index = await getIndex('floor') }
    else index = req.body.floorindex;
    const newFloor = {
        floorname: req.body.floorname,
        floornumber: req.body.floornumber,
        floorsize: req.body.floorsize,
        username: req.body.username,
    }
    const isExit = await floor.floors.findOne({$or:[{floorname:req.body.floorname},{floornumber:req.body.floornumber},{floorindex:req.body.floorindex}]})
        console.log(isExit); 
        let saved = '';
         
            const result = await floor.floors.updateOne({ floorindex:index }, newFloor, { upsert: true });
            if (result) {
                saved = { result: 'Saved' }
            }
            else {
                saved = { result: 'false' }
            }
            if(isExit)   saved = { result: 'Updated' }
            res.json(saved)
        }
        )
router.post('/deleteFloor',async (req, res) => {
    const floorindex = req.body.floorindex;
     
    let result = await floor.floors.deleteOne({ floorindex: floorindex });
    if (result.acknowledged) {
        result = { deleted: true }
    }
    else {
        result = { deleted: false }
    }
    res.json(result)
}
 )
// router.post('/loadfloorbypagenumber',controller.loadfloorbypagenumber)
// router.post('/savefloor',controller.postSaveFloor)
// router.post('/deleteFloor',controller.postdeleteFloor)
//router.post('/search',controller.postsearch) 
//router.get('/floors',controller.getfloor)
router.post('/search',async  (req,res)=>{
console.log('backend reached for  file search');
    try {
        const data = await floor.floors.find({$or:[{floorname:{$regex:`${req.body.searchvalue}`,$options:'i'}}]})
        console.log(data);
        const perpage = 10;
        const pagecount = await floor.floors.find({$or:[{floorname:{$regex:`${req.body.searchvalue}`,$options:'i'}}]})
        .countDocuments()
        .then(tcount => {return Math.ceil(tcount / perpage)})
        res.render('floor',{data,pagecount})
    } catch (error) {
    }
})


router.get('/floors',token.verifyToken ,async (req, res) => {
    let docCount = 0;
    let pagenumber = 1
    const perpage = 10;
    const data = await floor.floors.find()
        .countDocuments()
        .then(documents => {
            docCount = documents;
            return floor.floors.find()
                .skip((pagenumber - 1) * perpage)
                .limit(perpage)
        }
        )
    const pagecount = await floor.floors.find()
        .countDocuments()
        .then(tcount => {
            return Math.ceil(tcount / perpage);
        }
        )
    res.render('floor', { data, pagecount })
})


module.exports = router;
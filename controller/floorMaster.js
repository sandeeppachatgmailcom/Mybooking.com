const express = require('express')
const router = express.Router();
const frontDesk = require('../model/checkIn')
const checkinPlan = require('../model/planMaster')
const Rooms = require('../model/rooms')
const tariffmaster = require('../model/tariff')
const frontoffice = require('../model/checkIn')
const floor =  require('../model/floor')
const token = require('../middleware/jwt')
const getRoot = (req,res)=>{
    res.redirect('/admin')
} 
const postloadfloorbypagenumber = async (req, res) => {
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
} 
const postsavefloor = async (req, res) => {
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
const postdeleteFloor = async (req, res) => {
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
const postsearch = async  (req,res)=>{
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
} 
const getfloors = async (req, res) => {
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
} 


module.exports = {getRoot,postloadfloorbypagenumber,postsavefloor,postdeleteFloor,postsearch,getfloors};
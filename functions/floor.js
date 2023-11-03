 
 
  const Modelfloors =require('../model/floor')
  
  async function loadAllFloor(){
    let result =  await Modelfloors.floors.find()
    return result; 
  }
  const floors = Modelfloors.floors
  module.exports = {floors,loadAllFloor}
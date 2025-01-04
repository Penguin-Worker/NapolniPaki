const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
    async create(req,res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req,res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async updateType(req, res){
        try {
          const { id } = req.params; 
          const { name } = req.body; 
      
          const type = await Type.findByPk(id);
          if (!type) {
            return res.status(404).json({ message: 'Type not found' });
          }
      
          type.name = name; 
          await type.save();
      
          return res.json(type);
        } catch (error) {
          console.error('Error updating type:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
}

module.exports = new TypeController()
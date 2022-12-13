const CompaignModel = require('../models/Compaign');
const BaseService = require('./BaseService');

class CompaignService extends BaseService {
      constructor() {
        super();
      }
    
    async create(req) {

        try {

            const errors = this.handleErrors(req);

            if(errors.hasErrors) {
                return errors.body;
            }

            const { name, description, amount, expiresIn } = req.body;

            const compaign = await CompaignModel.create({
                name,
                description,
                amount,
                expiresIn,
                status: 'active'
            });

            return this.response({
                statusCode: 201,
                data: compaign
            })
        } catch (error) {
            return this.serverErrorResponse(error);
        }
        
    }

    async findAllActiveCompaigns() {
         
        try {

            const activeCompaigns = await CompaignModel.findAll({
            where: {
                status: 'active'
            }
            
            });
            return this.response({
                statusCode: 200,
                data: activeCompaigns
            })
        } catch (error) {
            return this.serverErrorResponse(error);
        }
        
  }
}

module.exports = CompaignService;
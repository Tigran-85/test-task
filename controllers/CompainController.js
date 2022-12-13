const CompaignService = require('../services/CompaignService');

class CompaignController {
     constructor() {
        this.compaignService = new CompaignService();
    }

    async createCompaign(req, res) {
        const data = await this.compaignService.create(req);
        res.status(data.statusCode).json(data);

    }

    async findAllActiveCompaigns() {
        const data = await this.findAllActiveCompaigns();
        res.status(data.statusCode).json(data);
  }
}


module.export = CompaignController;
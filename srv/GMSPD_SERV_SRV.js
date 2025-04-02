const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSPD_SERV_SRV = await cds.connect.to("GMSPD_SERV_SRV"); 
      srv.on('READ', 'ContractHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'CapDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'CreateSPSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'HeaderItemConfigSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'OrgDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'SPItemSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'SpHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
      srv.on('READ', 'xGMSxServP_Get', req => GMSPD_SERV_SRV.run(req.query)); 
}
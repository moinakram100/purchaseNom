const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSCONTRACTS_SRV = await cds.connect.to("GMSCONTRACTS_SRV"); 
      srv.on('READ', 'HeaderTableSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'MonthlyQuantitySet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'OrgDetailSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'clauseCodeSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'createContractSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('CREATE', 'createContractSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'customFldSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'serviceProfileSet', req => GMSCONTRACTS_SRV.run(req.query)); 
      srv.on('READ', 'xGMSxFETCHCONTRACTNO', req => GMSCONTRACTS_SRV.run(req.query)); 
}
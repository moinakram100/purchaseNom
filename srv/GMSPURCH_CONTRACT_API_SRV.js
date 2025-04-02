const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSPURCH_CONTRACT_API_SRV = await cds.connect.to("GMSPURCH_CONTRACT_API_SRV"); 
      srv.on('READ', 'xGMSxFETCHPURCHCONT', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
}
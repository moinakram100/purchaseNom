const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSNOMCP_GMS_SRV = await cds.connect.to("GMSNOMCP_GMS_SRV"); 
      srv.on('READ', 'ZNOMMASTER5', req => GMSNOMCP_GMS_SRV.run(req.query)); 
}
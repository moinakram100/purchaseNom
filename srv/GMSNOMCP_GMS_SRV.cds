using GMSNOMCP_GMS_SRV from './external/GMSNOMCP_GMS_SRV.cds';

service GMSNOMCP_GMS_SRVSampleService {
    @readonly
    entity ZNOMMASTER5 as projection on GMSNOMCP_GMS_SRV.ZNOMMASTER5
    {        key Vbeln, key Customer, Vbeln_p, Vbeln_s, CustomerName, Auart, ValidFrom, ValidTo, ContractDescription, DocType     }    
;
}
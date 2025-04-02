using GMSPURCH_CONTRACT_API_SRV from './external/GMSPURCH_CONTRACT_API_SRV.cds';

service GMSPURCH_CONTRACT_API_SRVSampleService {
    @readonly
    entity xGMSxFETCHPURCHCONT as projection on GMSPURCH_CONTRACT_API_SRV.xGMSxFETCHPURCHCONT
    {        key vbeln     }    
;
}
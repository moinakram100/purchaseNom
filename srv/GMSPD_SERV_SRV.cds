using GMSPD_SERV_SRV from './external/GMSPD_SERV_SRV.cds';

service GMSPD_SERV_SRVSampleService {
    @readonly
    entity ContractHeaderSet as projection on GMSPD_SERV_SRV.ContractHeaderSet
    {        key ItemNo, key Vbeln, Dcq, key Material, key DeliveryPt, DeliveryPtText, key RedeliveryPt, RedeliveryPtText, key Path, FuelPercentage, Transmissiontype, DocType     }    
;
    @readonly
    entity CapDetailSet as projection on GMSPD_SERV_SRV.CapDetailSet
    {        key Vbeln, key Item, Material, MaterialText, TargetQty, Uom, DCQ, Plant, PlantText, ServProfile, RedeliveryPt, RedeliveryPtText, DeliveryPt, DeliveryPtText, Transmissiontype, StorageLocation, StorageLocationName     }    
;
    @readonly
    entity CreateSPSet as projection on GMSPD_SERV_SRV.CreateSPSet
    {        key Vbeln     }    
;
    @readonly
    entity HeaderItemConfigSet as projection on GMSPD_SERV_SRV.HeaderItemConfigSet
    {        key Fieldlevel, key Vbeln, key ItemNo, key Material, key ContractField, FieldValue, DocType     }    
;
    @readonly
    entity OrgDetailSet as projection on GMSPD_SERV_SRV.OrgDetailSet
    {        key Vbeln, SoldToParty, SoldToPartyText, ShipToParty, ShipToPartyText, SalesOrg, SalesOrgText, DistributionChannel, DistributionChannelText, Division, DivisionText, Description, CompanyCode, CompanyCodeText, PurchOrg, PurchOrgText, PurchGrp, PurchGrpText, DocType, ValidFrom, ValidTo, Type     }    
;
    @readonly
    entity SPItemSet as projection on GMSPD_SERV_SRV.SPItemSet
    {        DocType, key Path, key Material, ThresholdP, key Vbeln, key ItemNo, key ClauseCode, ValidFrom, ValidTo, ThreshRef, Remark, CalculatedValue     }    
;
    @readonly
    entity SpHeaderSet as projection on GMSPD_SERV_SRV.SpHeaderSet
    {        DocType, FuelPercentage, key ItemNo, key Material, key Path, key ServProfile, key Vbeln, SalesDesc, key ServiceParam, ParamValue, key ParamType, DeliveryPt, RedeliveryPt     }    
;
    @readonly
    entity xGMSxServP_Get as projection on GMSPD_SERV_SRV.xGMSxServP_Get
    {        key Vbeln, key ServProfile, key ServiceParam, key DocType, key Path, key ItemNo, key ClauseCode, key ValidFrom, key ValidTo, ParamValue, ParamType, DeliveryPt, RedeliveryPt, SalesDesc, Material, ThresholdP, ThreshRef, Remark, CalculatedValue     }    
;
}
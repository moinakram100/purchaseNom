using GMSCONTRACTS_SRV from './external/GMSCONTRACTS_SRV.cds';

service GMSCONTRACTS_SRVSampleService {

    entity HeaderTableSet as projection on GMSCONTRACTS_SRV.HeaderTableSet
    {        key Vbeln, key Item, Material, MaterialText, DeliveryPoint, DeliveryText, RedeliveryPoint, RedeliveryText, Plant, PlantText, Uom, DPTargetQty, RPTargetQty, ValidFrom, ValidTo, Profile, DeliveryDcq, RedeliveryDcq, Path, FuelPercentage, FuelLocation, Type, SALES_DESC, Monthlydcq, storagelocation, Contracttype     }    
;

    entity MonthlyQuantitySet as projection on GMSCONTRACTS_SRV.MonthlyQuantitySet
    {        key Vbeln, Createdby, Item, Createddate, Material, Createdtime, Customer, Changedby, Version, Changeddate, McqYear, Changedtime, Uom, Plant, ServiceProfile, Acq, M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12     }    
;

    entity OrgDetailSet as projection on GMSCONTRACTS_SRV.OrgDetailSet
    {        key Vbeln, SoldToParty, SoldToPartyText, ShipToParty, ShipToPartyText, SalesOrg, SalesOrgText, DistributionChannel, DistributionChannelText, Division, DivisionText, Description, CompanyCode, CompanyCodeText, PurchOrg, PurchOrgText, PurchGrp, PurchGrpText, DocType, ValidFrom, ValidTo, Type     }    
;

    entity clauseCodeSet as projection on GMSCONTRACTS_SRV.clauseCodeSet
    {        key Vbeln, key ItemNo, key ClauseCode, key ValidFrom, key ValidTo, ThresholdP, ThreshRef, Remark, CalculatedValue, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;

    entity createContractSet as projection on GMSCONTRACTS_SRV.createContractSet
    {        key Vbeln,toHeaderTable,toCustfld,toClausecode,toservpara     }    
;

    entity customFldSet as projection on GMSCONTRACTS_SRV.customFldSet
    {        key Vbeln, key ItemNo, ContractField, Fieldlevel, FieldValue, DocType     }    
;

    entity serviceProfileSet as projection on GMSCONTRACTS_SRV.serviceProfileSet
    {        key Vbeln, key ItemNo, ServiceParam, ServProfile, ParamType, ParamValue     }    
;

    entity xGMSxFETCHCONTRACTNO as projection on GMSCONTRACTS_SRV.xGMSxFETCHCONTRACTNO
    {        key Vbeln, Description, Contracttype     }    
;
}
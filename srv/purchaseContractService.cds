using {purchaseContractDb} from '../db/purchaseContractSchema';
using {igmsConfigMetaData} from './external/igmsConfigMetaData';
using GMSVALUEHELP_SRV from './external/GMSVALUEHELP_SRV.cds';
using GMSMATERIAL_DATA_CDS from './external/GMSMATERIAL_DATA_CDS.cds';
using GMSPURCH_CONTRACT_API_SRV from './external/GMSPURCH_CONTRACT_API_SRV.cds';
using GMSPD_SERV_SRV from './external/GMSPD_SERV_SRV.cds';
using GMSNOMCP_GMS_SRV from './external/GMSNOMCP_GMS_SRV.cds';
using GMSCONTRACTS_SRV from './external/GMSCONTRACTS_SRV.cds';




service purchasecontract {


    entity DocumentNoProfileMapping      as projection on igmsConfigMetaData.DocumentNoProfileMapping;
    entity HeaderItem_Config             as projection on igmsConfigMetaData.HeaderItem_Config;
    entity serviceParametersItems        as projection on igmsConfigMetaData.serviceParametersItems;
    entity serviceProfileParametersItems as projection on igmsConfigMetaData.serviceProfileParametersItems;


    function getPurchaseDocTypeNServiceProfile()          returns array of {
        DocumentNo : String;
        serviceProfile : String;
    };
    function getSelectedProfileData(serviceProfileName:String) returns array of{
        ThresholdRelevant:String;
        RefrenceRelevant:String;
        AllocationRelevant:String;
        ValueParameter :String;
    };
    
    function getDynamicData(documentType:String) returns array of String;
    function getDynamicFieldAllData(documentType:String) returns array of String;
    

    function getVendorOrgDetails(Supplier : String)       returns array of {
        PurchasingOrganization : String;
        PurchasingOrganizationName : String;
        CompanyCode : String;
    };

    function getDistinctMaterialType()                    returns array of {
        Material : String;
        MaterialDescription : String;
    };
    function PurchaseContractNos()                    returns array of {
        vbeln : String;
    };

    function getMaterialPlantDetails(Material : String)   returns array of {

        Plant : String;
        PlantDescription : String;
    };

    function getMaterialStorageLocDetails(Plant : String) returns array of {
        StorageLocation : String;
        Description : String;
    };


    entity I_Supplier                    as
        projection on GMSVALUEHELP_SRV.I_Supplier {
            key Supplier,
                SupplierName
        };

    entity xGMSxVendPurchOrgCoVH         as
        projection on GMSVALUEHELP_SRV.xGMSxVendPurchOrgCoVH {
            key Supplier,
            key PurchasingOrganization,
                PurchasingOrganizationName,
                PurchasingGroup,
                PurchasingGroupName,
                MaterialPlannedDeliveryDurn,
                PurchasingIsBlockedForSupplier,
                SupplierRespSalesPersonName,
                SupplierPhoneNumber,
                PurchaseOrderCurrency,
                MinimumOrderAmount,
                CalculationSchemaGroupCode,
                PaymentTerms,
                PaymentTermsDescription,
                PricingDateControl,
                SupplierABCClassificationCode,
                ShippingCondition,
                PurOrdAutoGenerationIsAllowed,
                InvoiceIsGoodsReceiptBased,
                IncotermsClassification,
                IncotermsClassificationName,
                to_PurgOrganization
        };

    entity I_PurchasingOrganization      as
        projection on GMSVALUEHELP_SRV.I_PurchasingOrganization {
            key PurchasingOrganization,
                PurchasingOrganizationName,
                CompanyCode
        };

    entity I_PurchasingGroup             as
        projection on GMSVALUEHELP_SRV.I_PurchasingGroup {
            key PurchasingGroup,
                PurchasingGroupName
        };

    entity xGMSxMaterial_Data            as
        projection on GMSMATERIAL_DATA_CDS.xGMSxMaterial_Data {
            key Material,
            key Plant,
            key UOM,
                Des,
                PlantDesc
        };

    entity xGMSxSTRLOCVH                 as
        projection on GMSVALUEHELP_SRV.xGMSxSTRLOCVH {
            key StorageLocation,
            key Plant,
                Description
        };

    entity xGMSxUOM_value                as
        projection on GMSVALUEHELP_SRV.xGMSxUOM_value {
            key Msehi,
                Msehl
        };

        entity xGMSxLocPoint_DP as projection on GMSVALUEHELP_SRV.xGMSxLocPoint_DP
    {        key Locid, Locnam, Loctyp, LoctypText, LoctypLongText     }   

    entity CreatePurchaseSet as projection on GMSPURCH_CONTRACT_API_SRV.CreatePurchaseSet
    {        VperStart, VperEnd, key Number, CompCode, DocType, Vendor, PurchOrg, PurGroup,to_Items  } 

     entity xGMSxFETCHPURCHCONT as projection on GMSPURCH_CONTRACT_API_SRV.xGMSxFETCHPURCHCONT
    {        key vbeln     }       
;

entity ChangePurchaseSet as projection on GMSPURCH_CONTRACT_API_SRV.ChangePurchaseSet
    {        key Number, CompCode, DocType, Vendor, PurchOrg, PurGroup, VperStart, VperEnd     } 
    
    entity ItemsSet as projection on GMSPURCH_CONTRACT_API_SRV.ItemsSet
    {        key Material, key ItemNo, Plant, StgeLoc, TargetQty, PoUnit, PeriodIndExpirationDate     }   

        entity ContractHeaderSet as projection on GMSPD_SERV_SRV.ContractHeaderSet
    {        key ItemNo, key Vbeln, Dcq, key Material, key DeliveryPt, DeliveryPtText, key RedeliveryPt, RedeliveryPtText, key Path, FuelPercentage, Transmissiontype, DocType     }    
;
    
    entity CapDetailSet as projection on GMSPD_SERV_SRV.CapDetailSet
    {        key Vbeln, key Item, Material, MaterialText, TargetQty, Uom, DCQ, Plant, PlantText, ServProfile, RedeliveryPt, RedeliveryPtText, DeliveryPt, DeliveryPtText, Transmissiontype, StorageLocation, StorageLocationName     }    
;
    
    entity CreateSPSet as projection on GMSPD_SERV_SRV.CreateSPSet
    {        key Vbeln,toHeaderItemCfg,toContractHeader,SalesToItemNav,SalesToHeaderNav,toOrgDetail,toCapDetails     }    
;
    
    entity HeaderItemConfigSet as projection on GMSPD_SERV_SRV.HeaderItemConfigSet
    {        key Fieldlevel, key Vbeln, key ItemNo, key Material, key ContractField, FieldValue, DocType     }    
;
    
    entity SPItemSet as projection on GMSPD_SERV_SRV.SPItemSet
    {        DocType, key Path, key Material, ThresholdP, key Vbeln, key ItemNo, key ClauseCode, ValidFrom, ValidTo, ThreshRef, Remark, CalculatedValue     }    
;
    
    entity SpHeaderSet as projection on GMSPD_SERV_SRV.SpHeaderSet
    {        DocType, FuelPercentage, key ItemNo, key Material, key Path, key ServProfile, key Vbeln, SalesDesc, key ServiceParam, ParamValue, key ParamType, DeliveryPt, RedeliveryPt     }    
;
    
    entity xGMSxServP_Get as projection on GMSPD_SERV_SRV.xGMSxServP_Get
    {        key Vbeln, key ServProfile, key ServiceParam, key DocType, key Path, key ItemNo, key ClauseCode, key ValidFrom, key ValidTo, ParamValue, ParamType, DeliveryPt, RedeliveryPt, SalesDesc, Material, ThresholdP, ThreshRef, Remark, CalculatedValue     }  

     entity ZNOMMASTER5 as projection on GMSNOMCP_GMS_SRV.ZNOMMASTER5
    {        key Vbeln, key Customer, Vbeln_p, Vbeln_s, CustomerName, Auart, ValidFrom, ValidTo, ContractDescription, DocType     }   


 
    entity OrgDetailSet as projection on GMSCONTRACTS_SRV.OrgDetailSet
    {        key Vbeln, SoldToParty, SoldToPartyText, ShipToParty, ShipToPartyText, SalesOrg, SalesOrgText, DistributionChannel, DistributionChannelText, Division, DivisionText, Description, CompanyCode, CompanyCodeText, PurchOrg, PurchOrgText, PurchGrp, PurchGrpText, DocType, ValidFrom, ValidTo, Type     }    
;
   
    entity clauseCodeSet as projection on GMSCONTRACTS_SRV.clauseCodeSet
    {        key Vbeln, key ItemNo, key ClauseCode, key ValidFrom, key ValidTo, ThresholdP, ThreshRef, Remark, CalculatedValue, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
   
    entity createContractSet as projection on GMSCONTRACTS_SRV.createContractSet
    {        key Vbeln,toClausecode,toCustfld,toHeaderTable,toservpara,toOrgDetail     }    
;
   
    entity customFldSet as projection on GMSCONTRACTS_SRV.customFldSet
    {        key Vbeln, key ItemNo, ContractField, Fieldlevel, FieldValue, DocType     }    
;
   
    entity serviceProfileSet as projection on GMSCONTRACTS_SRV.serviceProfileSet
    {        key Vbeln, key ItemNo, ServiceParam, ServProfile, ParamType, ParamValue     } 
}

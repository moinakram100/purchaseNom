const cds = require('@sap/cds');

module.exports = async (srv) => {

    const GMSVALUEHELP_SRV = await cds.connect.to("GMSVALUEHELP_SRV");
    srv.on('READ', 'I_Supplier', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xGMSxVendPurchOrgCoVH', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'I_PurchasingOrganization', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'I_PurchasingGroup', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xGMSxSTRLOCVH', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xGMSxUOM_value', req => GMSVALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xGMSxLocPoint_DP', req => GMSVALUEHELP_SRV.run(req.query)); 

    const GMSCONTRACTS_SRV = await cds.connect.to("GMSCONTRACTS_SRV"); 
    srv.on('READ', 'HeaderTableSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('READ', 'OrgDetailSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('READ', 'clauseCodeSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('READ', 'createContractSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('CREATE', 'createContractSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('READ', 'customFldSet', req => GMSCONTRACTS_SRV.run(req.query)); 
    srv.on('READ', 'serviceProfileSet', req => GMSCONTRACTS_SRV.run(req.query)); 




    const GMSMATERIAL_DATA_CDS = await cds.connect.to("GMSMATERIAL_DATA_CDS");
    srv.on('READ', 'xGMSxMaterial_Data', req => GMSMATERIAL_DATA_CDS.run(req.query));
    srv.on('READ', 'xgmsxmatplntsloc', req => GMSMATERIAL_DATA_CDS.run(req.query));
    
    const externalService = await cds.connect.to('igmsConfigMetaData');
    async function readFromExternalService(entity, req) {
        const query = req.query;
    
        try {
            const result = await externalService.run(query);
            return result;
        } catch (err) {
            console.error(`Error fetching data from external service for ${entity}:`, err);
            req.error(500, `Failed to fetch data from external service for ${entity}.`);
        }
    }
    srv.on('READ', 'DocumentNoProfileMapping', async (req) => {
        return await readFromExternalService('DocumentNoProfileMapping', req);
    });
    
    srv.on('READ', 'HeaderItem_Config', async (req) => {
        return await readFromExternalService('HeaderItem_Config', req);
    });
    
    srv.on('READ', 'serviceParametersItems', async (req) => {
        return await readFromExternalService('serviceParametersItems', req);
    });
    
    srv.on('READ', 'serviceProfileParametersItems', async (req) => {
        return await readFromExternalService('serviceProfileParametersItems', req);
    });
    
    const GMSPURCH_CONTRACT_API_SRV = await cds.connect.to("GMSPURCH_CONTRACT_API_SRV"); 
    srv.on('READ', 'CreatePurchaseSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('READ', 'ItemsSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('CREATE', 'CreatePurchaseSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('CREATE', 'ItemsSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('READ', 'ChangePurchaseSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('CREATE', 'ChangePurchaseSet', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 
    srv.on('READ', 'xGMSxFETCHPURCHCONT', req => GMSPURCH_CONTRACT_API_SRV.run(req.query)); 


    const GMSNOMCP_GMS_SRV = await cds.connect.to("GMSNOMCP_GMS_SRV"); 
    srv.on('READ', 'ZNOMMASTER5', async (req) => {
        try {
            const data = await GMSNOMCP_GMS_SRV.run(req.query);
            return {data}; 
        } catch (error) {
            req.error(500, `Error fetching ZNOMMASTER5 data: ${error.message}`);
        }
    });
    

    const GMSPD_SERV_SRV = await cds.connect.to("GMSPD_SERV_SRV"); 
          srv.on('READ', 'ContractHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'CapDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'CreateSPSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'HeaderItemConfigSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'OrgDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'SPItemSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'SpHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('READ', 'xGMSxServP_Get', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'ContractHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'CapDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'CreateSPSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'HeaderItemConfigSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'OrgDetailSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'SPItemSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'SpHeaderSet', req => GMSPD_SERV_SRV.run(req.query)); 
          srv.on('CREATE', 'xGMSxServP_Get', req => GMSPD_SERV_SRV.run(req.query)); 

    srv.on('getSelectedProfileData', async (req) => {
        const { serviceProfileName } = req.data;
    
        try {
            const serviceProfileData = await externalService.run(
                SELECT.from('serviceProfileParametersItems')
                    .where({ serviceProfileName: serviceProfileName, checkedParameter: true })
            );
            
    
            const serviceParametersItems = await externalService.run(
                SELECT.from('serviceParametersItems')
            );
    
            const thresholdRelevant = [];
            const refrenceRelevant = [];
            const allocationRelevant = {};
            const valueParameter = [];
    
            serviceProfileData.forEach(item => {
                if (item.Threshold_Relevance === true && item.ContractRelevant === true) {
                    thresholdRelevant.push({ serviceParameter: item.serviceParameter });
                }
    
                if (item.Referrence_Relevant === true && item.ContractRelevant === true) {
                    refrenceRelevant.push({ serviceParameter: item.serviceParameter });
                }
    
                if (item.Allocation_Relevant === true && item.ContractRelevant === true) {
                    const matchingParam = serviceParametersItems.find(param => param.serviceParameter === item.serviceParameter);
                    const level = matchingParam ? matchingParam.Level : null;
               
                    if (level !== null && level !== undefined) {
                        if (!allocationRelevant[level]) {
                            allocationRelevant[level] = [];
                        }
                        allocationRelevant[level].push({ serviceParameter: item.serviceParameter });
                    }
                }
    
                if (item.Value_Parameter === true && item.ContractRelevant === true) {
                    valueParameter.push({ serviceParameter: item.serviceParameter });
                }
            });
    
            return {
                ThresholdRelevant: thresholdRelevant,
                RefrenceRelevant: refrenceRelevant,
                AllocationRelevant: allocationRelevant,
                ValueParameter: valueParameter
            };
    
        } catch (error) {
            console.error(error);
            return req.reject(500, `An unexpected error occurred: ${error.message}`);
        }
    });


    srv.on("getDynamicData", async (req) => {
        try {
            const selectedDocumentType = req.data.documentType;
    
            const dynamicFieldData = await externalService.run(
                SELECT.from("HeaderItem_Config")
            );
    
            let rawOrg_Details = dynamicFieldData.filter(
                (obj) =>
                    obj.parameterRelevancy === "Org Details" &&
                    obj.documentType === selectedDocumentType
            );
    
            let Org_Details = Array.from(
                new Set(rawOrg_Details.map((a) => a.unique))
            ).map((uniqueValue) => {
                return rawOrg_Details.find((a) => a.unique === uniqueValue);
            });
    
            let rawCapacity_Details = dynamicFieldData.filter(
                (obj) =>
                    obj.parameterRelevancy === "Capacity Details" &&
                    obj.documentType === selectedDocumentType
            );
    
            let Capacity_Details = Array.from(
                new Set(rawCapacity_Details.map((a) => a.unique))
            ).map((uniqueValue) => {
                return rawCapacity_Details.find((a) => a.unique === uniqueValue);
            });
    
            let result = [...Org_Details, ...Capacity_Details];
    
            return { data: result };
        } catch (error) {
            console.error("Error in getDynamicData:", error);
            req.error(500, "Error while fetching dynamic data.");
        }
    }),    
    srv.on("getDynamicFieldAllData", async (req) => {
        try {
            const selectedDocumentType = req.data.documentType;
    
            const dynamicFieldData = await externalService.run(
                SELECT.from("HeaderItem_Config").where({ documentType: selectedDocumentType })
            );
    
            return { data: dynamicFieldData };
        } catch (error) {
            console.error("Error in getDynamicFieldAllData:", error);
            return req.reject(500, "Error while fetching dynamic data.");
        }
    });
       



    // org Details data

    srv.on('getPurchaseDocTypeNServiceProfile', async (req) => {
        try {
            const DocumentProfielData = await externalService.run(
                SELECT.from('DocumentNoProfileMapping')
                    .columns(['DocumentNo', 'serviceProfileName', 'serviceProfileDesc', 'description'])
                    .where({ DocumentDesc: { in: ['K', 'F'] } })
            );

            const groupedData = DocumentProfielData.reduce((acc, item) => {
                if (!acc[item.DocumentNo]) {
                    acc[item.DocumentNo] = {

                        DocumentNo: `${item.DocumentNo} - ${item.description}`,

                        serviceProfile: []
                    };
                }
                acc[item.DocumentNo].serviceProfile.push({
                    serviceProfileName: item.serviceProfileName,
                    serviceProfileDesc: item.serviceProfileDesc
                });
                return acc;
            }, {});

            return Object.values(groupedData);
        } catch (error) {
            req.error({ error });
        }
    });
    srv.on('getVendorOrgDetails', async (req) => {
        const { Supplier } = req.data;

        try {
            const VendorOrgDetails = await GMSVALUEHELP_SRV.run(
                SELECT.from('xGMSxVendPurchOrgCoVH')
                    .columns(['PurchasingOrganization', 'PurchasingOrganizationName'])
                    .where({ Supplier })
            );

            if (!VendorOrgDetails || VendorOrgDetails.length === 0) {
                console.warn(`No data found for Supplier: ${Supplier}`);
                return [];
            }

            const purchasingOrganizations = VendorOrgDetails.map(vendor => vendor.PurchasingOrganization);


            const CompanyCodesData = await GMSVALUEHELP_SRV.run(
                SELECT.from('I_PurchasingOrganization')
                    .columns(['PurchasingOrganization', 'CompanyCode'])
                    .where({ PurchasingOrganization: { in: purchasingOrganizations } })
            );

            const companyCodeMap = CompanyCodesData.reduce((acc, item) => {
                acc[item.PurchasingOrganization] = item.CompanyCode;
                return acc;
            }, {});

            const result = VendorOrgDetails.map(vendor => ({
                PurchasingOrganization: vendor.PurchasingOrganization,
                PurchasingOrganizationName: vendor.PurchasingOrganizationName,
                CompanyCode: companyCodeMap[vendor.PurchasingOrganization] || null
            }));

            return result;
        } catch (error) {
            console.error("Error in getVendorOrgDetails:", error);
            return req.reject(500, `An unexpected error occurred: ${error.message}`);
        }
    });

    srv.on('PurchaseContractNos', async (req) => {
        try {
            const result = await GMSPURCH_CONTRACT_API_SRV.run(
                SELECT.from('xGMSxFETCHPURCHCONT').columns('vbeln')
            );
    
            if (!result || result.length === 0) {
                return req.reject(404, "No records found.");
            }
    
            const vbelnValues = result.map(row => row.vbeln);
    
            return vbelnValues; 
        } catch (error) {
            console.error("Error fetching purchase contract numbers:", error);
            return req.reject(500, "Internal Server Error");
        }
    });
    

    // capacity Details data 
    srv.on('getDistinctMaterialType', async (req) => {
        try {
            const result = await GMSMATERIAL_DATA_CDS.run(
                SELECT.from('xGMSxMaterial_Data').columns(['Material', 'Des'])
            );
    
            if (!result || result.length === 0) {
                return req.reject(404, "No records found.");
            }
    
            const materialMap = new Map();
    
            result.forEach(item => {
                const material = item.Material?.trim();
                const description = item.Des?.trim();
    
                if (material) {
                    if (!materialMap.has(material)) {
                        materialMap.set(material, description);
                    }
                }
            });
    
            const response = Array.from(materialMap, ([Material, MaterialDescription]) => ({
                Material,
                MaterialDescription
            }));
    
            return response;
    
        } catch (error) {
            console.error("Error in getDistinctMaterialType:", error);
            return req.reject(500, "An error occurred while processing your request.");
        }
    });

    srv.on('getMaterialPlantDetails', async (req) => {
        const { Material } = req.data;
    
        try {
            const MaterialDataDetails = await GMSMATERIAL_DATA_CDS.run(
                SELECT.from('xGMSxMaterial_Data')
                    .columns(['Plant', 'PlantDesc'])
                    .where({ Material })
            );
    
            if (!MaterialDataDetails || MaterialDataDetails.length === 0) {
                return req.reject(404, "No sales order details found for the given Material.");
            }
    
            const result = MaterialDataDetails.map(detail => ({
                Plant: detail.Plant,
                PlantDescription: detail.PlantDesc
            }));
    
            return result;
    
        } catch (error) {
            console.error("Error in getMaterialPlantDetails:", error);
            return req.reject(500, `An unexpected error occurred: ${error.message}`);
        }
    });

    srv.on('getMaterialStorageLocDetails', async (req) => {
        const { Plant } = req.data;
    
        try {
            const StorageLocDetails = await GMSVALUEHELP_SRV.run(
                SELECT.from('xGMSxSTRLOCVH')
                    .columns(['StorageLocation', 'Description'])
                    .where({ Plant })
            );
    
            if (!StorageLocDetails || StorageLocDetails.length === 0) {
                return req.reject(404, "No storage location found for given plant.");
            }
    
            const result = StorageLocDetails.map(detail => ({
                StorageLocation: detail.StorageLocation,
                Description: detail.Description
            }));
    
            return result;
    
        } catch (error) {
            console.error( error);
            return req.reject(500, `An unexpected error occurred: ${error.message}`);
        }
    });
}
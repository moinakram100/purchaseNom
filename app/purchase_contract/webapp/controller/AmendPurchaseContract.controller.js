
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/ingenx/purchasecontract/utils/HelperFunction",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  ], (BaseController,HelperFunction,JSONModel,BusyIndicator,MessageBox,MessageToast) => {
    "use strict";
    let NewoGetContrData = new sap.ui.model.json.JSONModel();
    let GetContrData = new sap.ui.model.json.JSONModel();
    let newOData;
    let allocParamArray = [];
    let diffDays;
    let selectedDocumentType;
    let onDP1;
    let onDP2;
    let formattedDate1;
    let formattedDate2;
    let headerModel;
    let uniqueMaterial = [];
    let mloc = [];
    let dloc;
    let ploc;
    let contractNumber;
    let valueHeaderModel;
    let oAllocationModel;
    let oValueModel;
    let data = [];
    let getStorageData = [];
    let valueContract = [];
    let allocationContract = [];
    let dataThreshold = [];
    let DocId = [];
    let emptyTemplate = {
      ClauseCode: "",
      ValidFrom: "",
      ValidTo: "",
      ThresholdP: "",
      ThreshRef: "",
      Remark: ""
    };
    return BaseController.extend("com.ingenx.purchasecontract.controller.AmendPurchaseContract", {
        onInit() {
          this.loadInitialContractValueHelpData()
          let znomMasterModel = new sap.ui.model.json.JSONModel();
          this.getView().setModel(znomMasterModel, "znomMasterModel");
          let saleModel = new sap.ui.model.json.JSONModel();
          this.getView().setModel(saleModel, "saleModel");
          headerModel = new sap.ui.model.json.JSONModel({
            ValidFrom: "",
            ValidTo: "",
            isValidDateRange: false 
          });
          this.getView().setModel(headerModel, "headerModel");
          let threshDataModel = new JSONModel([structuredClone(emptyTemplate)])
          this.getView().setModel(threshDataModel,"threshDataModel" );
        },

      //This method is used to load the purchase contract data in value help. 
      loadInitialContractValueHelpData : async function () {
        let oData = await HelperFunction._getSingleEntityData(this, "PurchaseContractNos");    
        if (Array.isArray(oData)) {
            oData = [...new Set(oData)] 
                .map(num => parseInt(num, 10))
                .sort((a, b) => b - a) 
                .map(num => num.toString()); 
        }
    
        this.getView().setModel(new JSONModel(oData), "purchaseContractModel");
    },
    
        // This method is used for opening the purchase contract value help.
        onAmmendContractValueHelp : function(){
          HelperFunction._openValueHelpDialog(this,"displayPurchaseAgId","PurchaseAmendContractNo")
        },

        // This method is execute after clicked on purchase contract no.
        onConfirmAmendContractNo : async function (oEvent) {
          let selectedContract = HelperFunction._valueHelpSelectedValue(oEvent, this, "purchaseNumber");
          let orgDetailsTab = this.byId("iconTabBarHeader1");
      
          if (selectedContract && selectedContract.title) {
              try {
                  sap.ui.core.BusyIndicator.show(0);
                  let data = await this.loadContractData(selectedContract.title);
                    if(orgDetailsTab)orgDetailsTab.setVisible(true)
              } catch (error) {
                  console.error("Error loading contract data:", error);
              } finally {
                  sap.ui.core.BusyIndicator.hide();
              }
          } else {
            if(orgDetailsTab)orgDetailsTab.setVisible(false)
          }
      },  
      
      // This method is used for fetching the allocation,value paramter and clause code data.
      onGetReleventData : async function() {
            let serviceProfileData =await HelperFunction._getSingleEntityDataWithParam(this,"getSelectedProfileData","serviceProfileName","GSPA001");
            console.log("data",serviceProfileData)
            let ThresholdRelevantData = new JSONModel(serviceProfileData[0].ThresholdRelevant)
            this.getView().setModel(ThresholdRelevantData,"ThresholdRelevantModel")
            let RefrenceRelevantData = new JSONModel(serviceProfileData[0].RefrenceRelevant)
            this.getView().setModel(RefrenceRelevantData,"RefrenceRelevantModel")
            let valueParameterData = new JSONModel(serviceProfileData[0].ValueParameter);
            this.getView().setModel(valueParameterData, "valueParameterModel");

            console.log("relevent data",ThresholdRelevantData.getData())
            let transformedData = Object.entries(serviceProfileData[0].AllocationRelevant).map(
              ([level, params]) => ({
                  Level : level,
                  Parameters : params.map((p) => ({
                  key : p.serviceParameter,
                  text : p.serviceParameter
                })),
                selectedParam: params.length > 0 ? params[0].serviceParameter : ""
              })
            );
            var oAllocModel = new JSONModel({allocLevel: transformedData});
            this.getView().setModel(oAllocModel, "allocModel");
            console.log("alloc data",oAllocModel.getData())
         },  

         
        // This method is used to fetch the data of selected purchase contract no.
        loadContractData : async function (selectedContractNumber) {
          let oModel = this.getOwnerComponent().getModel();      
          let oBindContext = oModel.bindContext(`/createContractSet('${selectedContractNumber}')`, undefined, {
              $expand : "toHeaderTable,toservpara,toClausecode,toCustfld,toOrgDetail"
          });
          try {
              let oData = await oBindContext.requestObject();
              console.log("contract data",oData)
              let contractDataModel = new sap.ui.model.json.JSONModel(oData.toOrgDetail);
              this.getView().setModel(contractDataModel, "orgDetailsDataModel");
              this.getView().setModel(new JSONModel(oData.toHeaderTable[0]),"capacityRelDataModel")
              this.getView().setModel(new JSONModel(oData.toClausecode),"saleitem")
              console.log("sales:", oData);
              this.createDynamicFields(oData.toCustfld)
              let saleData = oData.toservpara || [];
              if(oData){
                this.onGetReleventData()
              }
              let aValueData = saleData.filter(item => item.ParamType === "VALUE");
              this.getView().setModel(new JSONModel(aValueData),"valueModel")
              
              let aAllocationData = saleData.filter(item => item.ParamType === "ALLOCATION");
              this.getView().setModel(new JSONModel(aAllocationData), "allocationModel");

              let oAllocModel = this.getView().getModel("allocModel");
              let existingAllocData = oAllocModel ? oAllocModel.getData().allocLevel : [];
      
              existingAllocData.forEach(level => {
                  let match = aAllocationData.find(item => item.ServiceParam === level.Level);
                  level.selectedParam = match ? match.ParamValue : ""; 
              });
              console.log("exist",existingAllocData)
            
              if(existingAllocData>1)oAllocModel.setProperty("/allocLevel", existingAllocData)
              console.log("allocation model data",aAllocationData)
              let dcqData = saleData.find(item => item.ParamType === "VALUE" && item.ServiceParam === "DCQ");
              if (dcqData) {
                let oDCQModel = new sap.ui.model.json.JSONModel({ DCQ: dcqData.ParamValue });
                this.getView().setModel(oDCQModel, "DCQModel");
                console.log("DCQ Value:", dcqData.ParamValue);
              }
              this.loadZNOMMASTER5Data(selectedContractNumber);
          } catch (error) {
              console.error("Error fetching contract data:", error);
          }
      },    

      // This method is used to create custom dynamic fields.
      createDynamicFields : function (customData) {
        console.log("dynamic data",customData)
        let oVBoxOrg = this.byId("amendOrgDetailsContainer");
        let oVBoxRightOrg = this.byId("amendOrgDetailsContainer2");
        let oVBoxCap = this.byId("amendCapacityReleaseContainer");
        let oVBoxRightCap = this.byId("amendCapacityReleaseContainer2");
    
        // Clear previous items
        oVBoxOrg.removeAllItems();
        oVBoxRightOrg.removeAllItems();
        oVBoxCap.removeAllItems();
        oVBoxRightCap.removeAllItems();
    
        let orgCount = 0, capCount = 0;
    
        customData.forEach((oField) => {
            let oInput = new sap.m.Input({
                value : oField.FieldValue,
                width : "200px",
                required : oField.mandatory
            }).addStyleClass("customInput");
    
            oInput.addCustomData(new sap.ui.core.CustomData({
                key : "service_parameter",
                value : oField.ContractField
            }));
    
            let oLabel = new sap.m.Label({
                text : oField.ContractField + ":",
                labelFor : oInput.getId()
            }).addStyleClass("customLabel");
    
            let oHBox = new sap.m.HBox({
                items : [oLabel, oInput],
                alignItems : "Center"
            }).addStyleClass("singleGroup");
    
            if (oField.Fieldlevel === "ORG") {
                if (orgCount % 2 === 0) {
                    oVBoxOrg.addItem(oHBox);
                } else {
                    oVBoxRightOrg.addItem(oHBox);
                }
                orgCount++;
            } else if (oField.Fieldlevel === "CAP") {
                if (capCount % 2 === 0) {
                    oVBoxCap.addItem(oHBox);
                } else {
                    oVBoxRightCap.addItem(oHBox);
                }
                capCount++;
            }
        });
    },    
      

     
         //This method is used to format the date in desired manner. 
        formatDate : function (sDate) {
          if (!sDate) {
              return ""; 
          }
          let oDate = new Date(sDate);
          let oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
              pattern: "yyyy-MM-dd" 
          });
          return oDateFormat.format(oDate);
      }, 

        //  This method is used for opening the uom value help.
        onUomValueHelp : async function(){
          let oData = await HelperFunction._getSingleEntityData(this, "xGMSxUOM_value");
          this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "amendUomModel");      
          HelperFunction._openValueHelpDialog(this,"amendUomId","AmendUom")
        },

        // This method is used to add the clause code lineitem.
        onCreatePress : function () {
          console.log("add clause code");
          let saleitemModel = this.getView().getModel("saleitem");
          let saleitemData = saleitemModel.getData();  
          let newEmptyItem = structuredClone(emptyTemplate);
          saleitemData.push(newEmptyItem);  
          saleitemModel.setData(saleitemData);
          console.log("saleitemData clause code", saleitemData);
          saleitemModel.refresh();
        },

        //This method is used to get the data of dynamic fields during submission the amend contract. 
        getDynamicFieldData : function () {
          let dynamicFieldData = [];
          let vBoxMapping = [
              { id: "amendOrgDetailsContainer", fieldLevel: "ORG" },
              { id: "amendOrgDetailsContainer2", fieldLevel: "ORG" },
              { id: "amendCapacityReleaseContainer", fieldLevel: "CAP" },
              { id: "amendCapacityReleaseContainer2", fieldLevel: "CAP" }
          ];
          vBoxMapping.forEach((container) => {
              let oVBox = this.byId(container.id);
              if (!oVBox) {
                  return;
              }
              let aItems = oVBox.getItems();
              aItems.forEach((oHBox, hBoxIndex) => {
                  let oInput = oHBox.getItems().find((item) => item instanceof sap.m.Input);
                  if (!oInput) {
                      return;
                  }      
                  let aCustomData = oInput.getCustomData();
                  let fieldValue = null;
                  aCustomData.forEach((oCustomData) => {
                      if (oCustomData.getKey() === "service_parameter") {
                          fieldValue = oCustomData.getValue();
                      }
                  });
                  if (!fieldValue) {
                      return;
                  }
                  let parsedFieldValue;
                  try {
                      parsedFieldValue = JSON.parse(fieldValue); 
                  } catch (e) {
                      parsedFieldValue = null;
                  }
      
                  if (Array.isArray(parsedFieldValue)) {
                      parsedFieldValue.forEach((field) => {
                          dynamicFieldData.push({
                              ContractField : field.ContractField,
                              FieldValue : oInput.getValue(),
                              Fieldlevel : container.fieldLevel,
                              DocType : field.DocType,
                              ItemNo : field.ItemNo,
                              Vbeln : field.Vbeln
                          });
                      });
                  } else {
                      dynamicFieldData.push({
                          ContractField : fieldValue, 
                          FieldValue : oInput.getValue(),
                          Fieldlevel : container.fieldLevel 
                      });
                  }
              });
          });
          console.log("Final Dynamic Fields Data:", dynamicFieldData);
          return dynamicFieldData;
      },      

    //  This method is used to calculate the target qty based on dcq's value.
      deriveNetDCQ : function () {
       let DP1 = this.getView().byId("amend_startDate");
       let DP2 = this.getView().byId("amend_EndDate");
       let oDate1 = DP1.getDateValue();
       let oDate2 = DP2.getDateValue();
       if (!oDate1 || !oDate2) {
        return;
      }
      let timeDiff = Math.abs(oDate2.getTime() - oDate1.getTime());
      let initialDiffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let dcqInput = this.byId("amend_dcq");
      let targetedQty = this.byId("amend_targetQty");
      if (!dcqInput || !targetedQty) return;      
      let dcqValue = parseFloat(dcqInput.getValue()) || 0; 
      let derivedTargetedQty = diffDays?dcqValue * diffDays:dcqValue*initialDiffDays;      
      targetedQty.setValue(derivedTargetedQty);  
      let valueParamModel = this.getView().getModel("valueParameterModel")
      if(valueParamModel){
          let valueParamData = valueParamModel.getData()
          valueParamData.find(item=>item.serviceParameter)
      }
    },      
    
    // This method is used to validate the selected start or end date.
    onSelectDate : function () {
      let DP1 = this.getView().byId("amend_startDate");
      let DP2 = this.getView().byId("amend_EndDate");
      let dateValue1 = DP1.getDateValue();
      let dateValue2 = DP2.getDateValue();
      function isValidDate(selectedDate) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate > today;
      }
      if (dateValue2) {
        if (!isValidDate(dateValue2)) {
          DP2.setValue("");
          sap.m.MessageBox.information("Please select a future date.");
          return;
        }
      }
      if (dateValue1 && dateValue2 && dateValue1 >= dateValue2) {
        MessageBox.error("Valid From date must be smaller than Valid To date.");
        DP1.setDateValue(null);
        DP2.setDateValue(null);
        return;
      }
      var oDateFormatDP1 = sap.ui.core.format.DateFormat.getDateInstance({
        pattern : "yyyy-MM-dd",
      });
      formattedDate1 = oDateFormatDP1.format(dateValue1);
      var oDateFormatDP2 = sap.ui.core.format.DateFormat.getDateInstance({
        pattern : "yyyy-MM-dd",
      });
      formattedDate2 = oDateFormatDP2.format(dateValue2);
      this.onDateDifference();
    },

       // This method is used to extract the time from selected start or end date.
        onDateDifference: function () {
          let oDatePicker1 = this.getView().byId("amend_startDate");
          let oDatePicker2 = this.getView().byId("amend_EndDate");
          let oDate1 = oDatePicker1.getDateValue();
          let oDate2 = oDatePicker2.getDateValue();
          if (!oDate1 || !oDate2) {
            return;
          }
          let timeDiff = Math.abs(oDate2.getTime() - oDate1.getTime());
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        },

        
      //  This method is used to validate the org's details fields.
        validateFields : function() {
          let DP1 = this.getView().byId("amend_startDate");
          let DP2 = this.getView().byId("amend_EndDate");
          let dateValue1 = DP1.getDateValue();
          let dateValue2 = DP2.getDateValue();
      
          const [materialInp, dcqValue, targetQtyInp, uomInp, plantInp, storageInp, delPoint] =
              HelperFunction._getInputValues(this, [
                  "amend_material", "amend_dcq", "amend_targetQty", 
                  "amend_uom", "amend_plant", "amend_storageLocation", "amend_deliveryPoint"
              ]);
      
          let missingFields = [];
      
          if (!dateValue1) { missingFields.push("Start Date"); }
          if (!dateValue2) { missingFields.push("End Date"); }
          if (!materialInp) { missingFields.push("Material"); }
          if (!dcqValue) { missingFields.push("DCQ Value"); }
          if (!targetQtyInp) { missingFields.push("Target Quantity"); }
          if (!uomInp) { missingFields.push("UOM"); }
          if (!plantInp) { missingFields.push("Plant"); }
          if (!storageInp) { missingFields.push("Storage Location"); }
          if (!delPoint) { missingFields.push("Delivery Point"); }
          if (missingFields.length > 0) {
            sap.m.MessageBox.information("Please fill in the following fields:\n" + missingFields.join("\n"));
              return false;  
          }
          return true;
      },    

      // This method is used to refresh the screen after submit the amend contract.
      refreshedScreenAfterSubmit : function(){
         let contractInput = this.byId("purchaseNumber")
         contractInput.setValue("")
          let oLayout =  this.byId("iconTabBarHeader1")
          oLayout.setVisible(false)
          let oIconTabBar = this.byId("iconTabBarHeader1"); 
          if (oIconTabBar) {
              oIconTabBar.setSelectedKey("headerDetails"); 
          }
      },
      
      // This method is used to submit the purchase amend contract.
      submitPurchaseAgreement : async function () {
        try {
            let contractNo = this.byId("purchaseNumber").getValue()
            sap.ui.core.BusyIndicator.show(0);
    
            if (!this.validateFields()) {
                sap.ui.core.BusyIndicator.hide();
                return;
            }
           let that = this
            let contractNumber = await this.submitContract();
            await this.submitServiceParameters(contractNo);
    
            console.log("Both operations completed successfully.");
            MessageBox.success("Successfully Updated", {
                title : "Success",
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                      that.refreshedScreenAfterSubmit()
                    }
                }
            });
        } catch (error) {
            console.error("Error occurred:", error);
            MessageBox.error("Error occurred: " + error.message);
        } finally {
            sap.ui.core.BusyIndicator.hide();
        }
    },
    
    // This method is used to submit the amend contract's header data and calling from 'submitPurchaseAgreement'.
    submitContract : async function () {
        try {
            let that = this;
            let [Number, Material, TargetQty, dcq, UOM, Plant, compCode, Vendor, PurchOrg, PurGroup, StgeLoc] =
                HelperFunction._getInputValues(this, [
                    "purchaseNumber", "amend_material", "amend_targetQty", "amend_dcq", "amend_uom",
                    "amend_plant", "amend_companyCode", "amend_vendorID", "amend_purchaseOrg",
                    "amend_purchaseGroup", "amend_storageLocation"
                ]);
    
            const VperStart = this.getView().byId("amend_startDate").getDateValue();
            const VperEnd = this.getView().byId("amend_EndDate").getDateValue();
            const formattedVperStart = VperStart ? VperStart.toISOString().split('T')[0] : null;
            const formattedVperEnd = VperEnd ? VperEnd.toISOString().split('T')[0] : null;
    
            let oData = {
                "VperStart" : formattedVperStart,
                "VperEnd" : formattedVperEnd,
                "Number" : Number,
                "CompCode" : compCode || "",
                "DocType" : "GSPA",
                "Vendor" : Vendor || "",
                "PurchOrg" : PurchOrg || "",
                "PurGroup" : PurGroup || "",
                "to_Items" : [
                    {
                        "ItemNo" : "10",
                        "Material" : Material || "",
                        "Plant" : Plant || "",
                        "StgeLoc" : StgeLoc || "",
                        "TargetQty" : TargetQty || "",
                        "PoUnit" : UOM || "",
                        "PeriodIndExpirationDate" : "D"
                    }
                ]
            };
    
            let oModel = that.getOwnerComponent().getModel();
            let oBindList = oModel.bindList("/CreatePurchaseSet");
            let response = await oBindList.create(oData, true);
            console.log("Backend Response:", response);
            return Number; 
        } catch (error) {
            console.error("Error in submitContract:", error);
            MessageBox.error("Error submitting contract: " + error.message);
            throw error;
        }
    },
    
    // This method is used to submit the amend contract's  data and calling from 'submitPurchaseAgreement'.
    submitServiceParameters : async function (purchaseNumber) {
        try {
            const [materialInp, dcqValue, targetQtyInp, uomInp, plantInp, deliveryInp, profiletype] =
                HelperFunction._getInputValues(this, [
                    "amend_material", "amend_dcq", "amend_targetQty", "amend_uom",
                    "amend_plant", "amend_deliveryPoint", "amend_serviceProfile"
                ]);
    
            let valueParamData = this.getView().getModel("valueModel").getData();
            let clasueCodeData = this.getView().getModel("saleitem").getData();
            clasueCodeData.forEach(item => {
                if (item.ThresholdP) {
                    item.CalculatedValue = ((parseFloat(item.ThresholdP) * dcqValue) / 100).toString();
                } else {
                    item.CalculatedValue = "";
                }
            });

            this.getView().getModel("saleitem").setData(clasueCodeData);
            this.getView().getModel("saleitem").refresh();

            let dynamicData = this.getDynamicFieldData();
            let startDateInput = this.byId("amend_startDate");
            let validFrom = startDateInput.getDateValue();
            let endDateInput = this.byId("amend_EndDate");
            let validTo = endDateInput.getDateValue();
            let allocData = this.extractTableData();
    
            function convertToODataDate(date) {
                if (date instanceof Date && !isNaN(date)) {
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0');
                    let day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}T00:00:00Z`;
                }
                return null;
            }
    
            let dynamicFieldData = dynamicData.map(item => ({
                Vbeln : purchaseNumber,
                ItemNo : "000010",
                ContractField : item.ContractField || "",
                Fieldlevel : item.Fieldlevel || "",
                FieldValue : item.FieldValue || "",
                DocType : "",
            }));
    
            let allocationData = allocData.map(item => ({
                Vbeln : purchaseNumber,
                ItemNo : "000010",
                ServiceParam : item.SelectedText || "",
                ServProfile : profiletype || "",
                ParamType : "ALLOCATION",
                ParamValue : item.Level || ""
            }));
    
            let headerData = [{
                Vbeln : purchaseNumber,
                Item : "000010",
                Material : materialInp || "",
                DeliveryPoint : deliveryInp || "",
                DeliveryText : "",
                RedeliveryPoint : "",
                RedeliveryText : "",
                Plant : plantInp || "",
                Uom : uomInp || "",
                DPTargetQty : targetQtyInp || "",
                ValidFrom : convertToODataDate(validFrom),
                ValidTo : convertToODataDate(validTo),
                Profile : profiletype || "",
                DeliveryDcq : dcqValue || "",
                RedeliveryDcq : "",
                Type : "",
                SALES_DESC : "",
                Contracttype : "P"
            }];
    
            let oPayload = {
                Vbeln : purchaseNumber,
                toClausecode : clasueCodeData,
                toCustfld : dynamicFieldData,
                toHeaderTable : headerData,
                toservpara : [...valueParamData, ...allocationData]
            };
    
            console.log("Payload data:", oPayload);
            let proModel = this.getOwnerComponent().getModel();
            let oBindList = proModel.bindList("/createContractSet");
            let response = await oBindList.create(oPayload, true);
            console.log("Service parameters submitted successfully:", response);
        } catch (error) {
            console.error("Error in submitServiceParameters:", error);
            MessageBox.error("Service parameter submission failed: " + error.message);
            throw error;
        }
    },    
 
      //  This method is used to get the allocation data.
        extractTableData: function () {
          let oTable = this.byId("allocTable2"); 
          let aTableItems = oTable.getItems(); 
          let extractedData = [];
      
          aTableItems.forEach((oItem) => {
              let aCells = oItem.getCells(); 
      
              let levelText = aCells[0].getText(); 
              let oSelect = aCells[1]; 
      
              let selectedKey = oSelect.getSelectedKey(); 
              let selectedText = ""; 
      
              let aItems = oSelect.getItems();
              aItems.forEach((oItem) => {
                  if (oItem.getKey() === selectedKey) {
                      selectedText = oItem.getText();
                  }
              });
      
              extractedData.push({
                  Level : levelText,
                  SelectedKey : selectedKey,
                  SelectedText : selectedText
              });
          });
          console.log("Extracted Table Data:", extractedData);
          return extractedData;
      },      

        paramvalue : function (oEvent) {
          let oInput = oEvent.getSource();
          let sNewValue = oInput.getValue();
          let oModel = this.getView().getModel("allocationModel");
          oModel.setProperty("/ParamValue", sNewValue);
        },

        clausecode : function (oEvent) {
          let oControl = oEvent.getSource();
          let sNewValue;
          if (oControl instanceof sap.ui.core.Item) {
            sNewValue = oControl.getKey();
          } else {
            sNewValue = oControl.getValue();
          }
          let oModel = this.getView().getModel("saleitem");
          oModel.setProperty("/ClauseCode", sNewValue);
          oModel.setProperty("/ValidFrom", sNewValue);
          oModel.setProperty("/ValidTo", sNewValue);
          oModel.setProperty("/Remark", sNewValue);
          oModel.setProperty("/ThresholdP", sNewValue);
          oModel.setProperty("/ThresholdP", sNewValue);
          console.log("updated", sNewValue, oModel);
        },

        onInputChange : function () {
          let startDate = this.getView().byId("amend_startDate").getDateValue(); 
          let endDate = this.getView().byId("amend_EndDate").getDateValue();  
          let targetQuantityInput = this.getView().byId("amend_targetQty").getValue();
          let targetQuantity = parseFloat(targetQuantityInput);
  
          if (targetQuantityInput === "" || isNaN(targetQuantity) || targetQuantity <= 0) {
            this.getView().byId("amend_targetQty").setValueState("Error");
            this.getView().byId("amend_targetQty").setValueStateText("Target Quantity must be a positive numerical value and cannot be empty");
            this.getView().byId("amend_dcq").setValue("");
            return;
          } else {
            this.getView().byId("amend_targetQty").setValueState("None");
          }
  
          if (startDate && endDate) {
            if (endDate < startDate) {
              sap.m.MessageToast.show("End Date cannot be earlier than Start Date.");
              this.getView().byId("amend_dcq").setValue("");
              this.getView().byId("amend_startDate").setValue("");
              this.getView().byId("amend_startDate").setValueState("Error");
              this.getView().byId("amend_startDate").setValueStateText("End Date cannot be earlier than Start Date.");
              return;
            }
            let timeDiff = endDate.getTime() - startDate.getTime();
            let totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log("Total Days between Start and End Date:", totalDays);
            if (!isNaN(targetQuantity) && totalDays > 0) {
              var dcq = targetQuantity / totalDays;
              console.log("Daily Consumption Quantity (DCQ):", dcq.toFixed(2));  
              this.getView().byId("amend_dcq").setValue(dcq.toFixed(2)); 
            } else {
              console.log("Invalid target quantity or total days. Ensure target quantity is a positive number and dates are correctly selected.");
              this.getView().byId("amend_dcq").setValue("");
            }
          } else {
            console.log("Start Date or End Date is missing. Please select both dates.");
            this.getView().byId("amend_dcq").setValue("");
          }
          let oView = this.getView();
          let oStartDatePicker = oView.byId("amend_startDate");
          let oEndDatePicker = oView.byId("amend_endDate");  
          let sStartDate = oStartDatePicker.getValue();
          let sEndDate = oEndDatePicker.getValue();
  
          let oDateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;  
          let oStartDate = new Date(sStartDate);
          let oEndDate = new Date(sEndDate);
          let oCurrentDate = new Date();
          let bValid = true; 
          let sErrorMessage = "";  
          if (!sStartDate || !sEndDate) {
            sErrorMessage = "Please fill in both Start Date and End Date.";
            bValid = false;
          }  
          else if (!oDateFormatRegex.test(sStartDate) || !oDateFormatRegex.test(sEndDate)) {
            sErrorMessage = "Please enter dates in the format YYYY-MM-DD.";
            bValid = false;
            oStartDatePicker.setValue("");
            oEndDatePicker.setValue("");
          }  
          else if (oStartDate.getTime() === oEndDate.getTime()) {
            sErrorMessage = "Start Date and End Date cannot be the same.";
            bValid = false;
            oStartDatePicker.setValue("");
            oEndDatePicker.setValue("");
          }  
          else if (oEndDate.getTime() <= oCurrentDate.getTime()) {
            sErrorMessage = "End Date must be a future date from today.";
            bValid = false;
            oEndDatePicker.setValue("");
          }  
          else if (oEndDate.getTime() < oStartDate.getTime()) {
            sErrorMessage = "End Date cannot be earlier than Start Date.";
            bValid = false;
            oEndDatePicker.setValue("");
          }  
          else if (isNaN(oStartDate.getTime()) || isNaN(oEndDate.getTime())) {
            sErrorMessage = "Please enter a valid date.";
            bValid = false;
            oStartDatePicker.setValue("");
            oEndDatePicker.setValue("");
          }  
          if (!bValid) {
            sap.m.MessageToast.show(sErrorMessage);
          }  
          var oModel = this.getView().getModel("headerModel");
          oModel.setProperty("/isValidDateRange", bValid);
          var oModel1 = this.getView().getModel("orgDetailsDataModel");
          oModel1.setProperty("/isValidinput", bValid)
          if (bValid) {
            oModel1.setProperty("/TargetQty", targetQuantity);
            oModel.setProperty("/DCQ", dcq);
          }
          if (bValid) {
            oModel.setProperty("/ValidFrom", sStartDate);
            oModel.setProperty("/ValidTo", sEndDate);
          }
          console.log("Validation Result: ", bValid, "Start Date:", sStartDate, "End Date:", sEndDate);
          console.log("header model update", oModel);
          console.log("item model update", oModel1);
        },

        // This method is used to calculate the target qty based on dcq's value.
        onDCQChange : function (oEvent) {
          let dcqValue = oEvent.getSource().getValue();  
          if (!dcqValue) {
            oEvent.getSource().setValueState("Error");
            oEvent.getSource().setValueStateText("DCQ cannot be empty.");
            return;
          }  
          dcqValue = parseFloat(dcqValue);
          if (isNaN(dcqValue) || dcqValue <= 0) {
            oEvent.getSource().setValueState("Error");
            oEvent.getSource().setValueStateText("Please enter a valid numeric value for DCQ.");
            return;
          } else {
            oEvent.getSource().setValueState("None");
          }  
          let startDate = this.getView().byId("amend_startDate").getDateValue();
          let endDate = this.getView().byId("amend_EndDate").getDateValue();  
          if (startDate && endDate) {
            let timeDiff = endDate.getTime() - startDate.getTime();
            let totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (totalDays > 0) {
              let newTargetQuantity = totalDays * dcqValue;  
              let itemModel = this.getView().getModel("orgDetailsDataModel");
              itemModel.setProperty("/TargetQty", newTargetQuantity);  
              console.log(itemModel, "Item");
            }
          }
        },

        // This method is used for opening the material value help.
        onMaterial : async function(){
          let materialData = await HelperFunction._getSingleEntityData(this, "getDistinctMaterialType");
          this.getView().setModel(new JSONModel(materialData),"materialModel")
          HelperFunction._openValueHelpDialog(this,"amend_material","PurchaseMaterial")
        },

        // This method is execute after selected purchase material.
        onConfirmPurchaseMaterial : async function(oEvent){
          let selectedPurchaseMaterial = HelperFunction._valueHelpSelectedValue(oEvent,this,"amend_material");
          let purchaseMaterialDescInput = this.byId("amend_materialDesc")
          purchaseMaterialDescInput?purchaseMaterialDescInput.setValue(selectedPurchaseMaterial.Desc) && purchaseMaterialDescInput.setVisible(true):"";
          let plantData =await HelperFunction._getSingleEntityDataWithParam(this,"getMaterialPlantDetails","Material",selectedPurchaseMaterial.title);
          let plantDataModel = new JSONModel(plantData)
          this.getView().setModel(plantDataModel,"plantDataModel")
        },

        // This method is used for searching the material in value help.
        onMaterialLiveSearch : function(oEvent){
          HelperFunction._valueHelpLiveSearch(oEvent,["Material","MaterialDescription"])
         },

        //  This method is used for opening the plant value help.
         onPlantValueHelp : function(){
          HelperFunction._openValueHelpDialog(this,"amend_plant","PurchasePlant")
        },

        // This method is execute after selected the plant from value help.
        onConfirmPurchasePlant : async function(oEvent){
          let selectedPurchasePlant = HelperFunction._valueHelpSelectedValue(oEvent,this,"amend_plant");
          let purchasePlantDescInput = this.byId("amend_plantDesc")
          if(selectedPurchasePlant.Desc){
            purchasePlantDescInput?purchasePlantDescInput.setValue(selectedPurchasePlant.Desc) && purchasePlantDescInput.setVisible(true):"";
          }
          let storageLocationData =await HelperFunction._getSingleEntityDataWithParam(this,"getMaterialStorageLocDetails","Plant",selectedPurchasePlant.title);
          let storageLocationDataModel = new JSONModel(storageLocationData)
          this.getView().setModel(storageLocationDataModel,"storageDataModel")
        },

        // This method is used for opening the delivery value help.
        onDeliveryValueHelp : function(){
          HelperFunction._openValueHelpDialog(this,"amend_deliveryPoint","PurchaseDeliveryPoint")
        },

        // This method is used for searching the delivery from value help.
        onDeliveryLiveSearch : function(oEvent){
          HelperFunction._valueHelpLiveSearch(oEvent,["Locid","Locnam"])
         },

        //  This method is execute after selected delivery point.
        onConfirmDeliveryPoint : async function(oEvent){
          let selectedDeliveryPoint = HelperFunction._valueHelpSelectedValue(oEvent,this,"amend_deliveryPoint")
          let deliveryPointInput = this.byId("delivery_Desc")
          deliveryPointInput?deliveryPointInput.setValue(selectedDeliveryPoint.Desc) && deliveryPointInput.setVisible(true):""
        },


        // This method is used to delete the clasue code lineitem.
        onDeleteClauseCodeLineitem : function (oEvent) {
          let saleitemModel = this.getView().getModel("saleitem");
          let saleitemData = saleitemModel.getData();
          let oButton = oEvent.getSource();
          let oSelectedRow = oButton.getParent();
          let oTable = this.getView().byId("amend_clCodeTable");
          let iRowIndex = oTable.indexOfItem(oSelectedRow);
          let oTableModel = this.getView().getModel("saleitem");  
          if (!oTableModel) {
            console.error("Model 'saleitem' is not found.");
            return;
          }
          let aTableData = oTableModel.getData();  
          if (!Array.isArray(aTableData)) {
            console.error("Data in 'saleitem' is not an array:", aTableData);
            return;
          }  
          if (iRowIndex !== -1) {
            aTableData.splice(iRowIndex, 1);
            oTableModel.setData(aTableData);
            oTableModel.refresh();
          } else {
            console.error("Row index is not valid:", iRowIndex);
          }
          saleitemModel.setData(saleitemData);
          console.log("delete sale item", saleitemData);
        },

        // This method is used for opening the storage value help.
        onStorageValueHelp : async function(){
           let sPlant = this.byId("amend_plant").getValue();  
           let oData = await HelperFunction._getSingleEntityData(this,"xGMSxSTRLOCVH");
           let locationData = oData.filter(data=>data.Plant===sPlant)
           this.getView().setModel(new JSONModel(locationData),"PurchaseLocationModel")
           HelperFunction._openValueHelpDialog(this,"storageLocId","AmendStorageLocation")
        },
  
        // This method is used for seaching the storage in value help.
        onValueHelpStorageSearch : function (oEvent) {
          HelperFunction._valueHelpLiveSearch(oEvent,"StorageLocation")
        },
  
        // This method is used to set the value in input after selected storage location.
        onConfirmAmendStorage : function (oEvent) {
              HelperFunction._valueHelpSelectedValue(oEvent,this,"amend_storageLocation")
        },

        // This method is used to set the value in input after selected uom.
        onConfirmAmendUom : function (oEvent) {
              HelperFunction._valueHelpSelectedValue(oEvent,this,"amend_uom")
        },    
  
        // This method is used for seaching the delivery point in value help.
        onAmendDeliveryValueHelpSearch : function (oEvent) {
          HelperFunction._valueHelpLiveSearch(oEvent,"Locid")
        },

        // This method is used for seaching the uom in value help.
        onUomLiveSearch : function (oEvent) {
          HelperFunction._valueHelpLiveSearch(oEvent,"Msehi")
        },
       
  
    });
  });
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/ingenx/purchasecontract/utils/HelperFunction",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator"
], (Controller,HelperFunction,MessageToast,JSONModel,MessageBox,BusyIndicator) => {
    "use strict";

    var formattedDate1;
    var formattedDate2;
    var purchaseNumber;
    var diffDays;
    let selectEndData

    let threshTemplate = {
      clCode: "",
      validFrom: "",
      validTo: "",
      threshold: "",
      threshRef: "",
      remark: "",
    };
    return Controller.extend("com.ingenx.purchasecontract.controller.CreatePurchaseContract", {
      
      onInit : function () {
        this.loadInitialPurcshaseDocType();
        let threshDataModel = new JSONModel([structuredClone(threshTemplate)])
        this.getView().setModel(threshDataModel,"threshDataModel" );
    },
 
      //this method is used to load all initial data on screen.
      loadInitialPurcshaseDocType : async function () {
        try {
            const [oData, materialData,allDynamicFields,dynamicFieldData] = await Promise.all([
                HelperFunction._getSingleEntityData(this, "getPurchaseDocTypeNServiceProfile"),
                HelperFunction._getSingleEntityData(this, "getDistinctMaterialType"),
                HelperFunction._getSingleEntityDataWithParam(this,"getDynamicFieldAllData","documentType","GSPA"),
                HelperFunction._getSingleEntityDataWithParam(this,"getDynamicData","documentType","GSPA")
            ]);
            if (oData?.length) {
                this.getView().setModel(new JSONModel(oData), "docTypeModel");
                this.getView().setModel(new JSONModel(oData[0].serviceProfile || {}), "servicParamModel");
            }
            if (dynamicFieldData && allDynamicFields) {
              this.getView().setModel(new JSONModel(dynamicFieldData), "dynamicFieldModel");
              this.getView().setModel(new JSONModel(allDynamicFields), "allDynamicFieldModel");
              this.createAllOrgStaticField()
              this.createAllCapacityStaticField()
              this.createDynamicFields(); 
          }
            this.getView().setModel(new JSONModel(materialData || {}), "materialModel");
        } catch (error) {
            console.error("Error loading initial purchase document type:", error);
        }
    },
            // This method is used to create org's static fields if input field not created on frontend.
              createAllOrgStaticField : function () {
                let oView = this.getView();
                let oModel = oView.getModel("allDynamicFieldModel"); 
                let aData = oModel.getData()[0].data;
                if (!aData || aData.length === 0) {
                    return; 
                }
                let that = this;
                const fieldMapping = {
                    "Vendor" : ["create_vendorLabel", "create_VendorId"],
                    "Purchase Organisation" : ["create_purchaseOrgLabel", "purchaseOrg_id"],
                    "Company Code" : ["create_companyCodeLabel", "companyCode_id"],
                    "Purchase Group" : ["create_purchaseGroupLabel", "purchase_id"],
                    "Start Date" : ["create_startDateLabel", "create_startDate"],
                    "End Date" : ["create_endDateLabel", "create_endDate"]
                };  
                aData.forEach(function (oEntry) {
                    if (oEntry && oEntry.service_parameter && fieldMapping[oEntry.service_parameter]) {
                        let fields = fieldMapping[oEntry.service_parameter];
                        HelperFunction.inputFieldsDisplayOrNot(that, fields.map(id => ({ id, bool: true })));
                        let oLabel = that.getView().byId(fields[0]);
                        if (oLabel) {
                            oLabel.setText(oEntry.label);
                        }
                    }
                });
            },  

            createAllCapacityStaticField : function(){
              let oView = this.getView();
              let oModel = oView.getModel("allDynamicFieldModel"); 
              let aData = oModel.getData()[0].data;
              if (!aData || aData.length === 0) {
                  return; 
              }
              let that = this;
              const fieldMapping = {
                  "Material" : ["Create_materialLabel", "material_id"],
                  "DCQ" : ["create_dcqLabel", "DCQ_Input"],
                  "Target Quantity" : ["create_targetQtyLabel", "targetQuantity"],
                  "UOM" : ["create_uomLabel", "Uom_id"],
                  "Plant" : ["create_plantLlabel", "plant_id"],
                  "Storage Location" : ["create_storageLocLabel", "storage_id"],
                  "Service Profile" : ["create_serviceProfileLabel", "selectedProfileType"],
                  "Delivery" : ["Delivery", "delivery_id"]
              };  
              aData.forEach(function (oEntry) {
                  if (oEntry && oEntry.service_parameter && fieldMapping[oEntry.service_parameter]) {
                      let fields = fieldMapping[oEntry.service_parameter];
                      HelperFunction.inputFieldsDisplayOrNot(that, fields.map(id => ({ id, bool: true })));
                      let oLabel = that.getView().byId(fields[0]);
                      if (oLabel) {
                          oLabel.setText(oEntry.label);
                      }
                  }
              });
            },

            // This method is used to create custom dynamic fields on both details tab
            createDynamicFields : function () {
              let oModel = this.getView().getModel("dynamicFieldModel");  
              if (!oModel) {
                  console.error("Model 'dynamicFieldModel' not found.");
                  return;
              }
              let aFields = oModel.getData()[0].data;
              console.log("dynamic field", aFields);
              oModel.updateBindings(true);

              let oVBoxOrg = this.byId("orgDetailsContainer");
              let oVBoxRightOrg = this.byId("orgDetailsContainer2");
              let oVBoxCap = this.byId("capacityReleaseContainer");
              let oVBoxRightCap = this.byId("capacityReleaseContainerRight");

              oVBoxOrg.removeAllItems();
              oVBoxRightOrg.removeAllItems();
              oVBoxCap.removeAllItems();
              oVBoxRightCap.removeAllItems();

              const staticFields = [
                  "Vendor", "Purchase Organisation", "Company Code", "Purchase Group",
                  "Start Date", "End Date", "Material", "Target Quantity",
                  "UOM", "Plant", "Storage Location", "Service Profile",
              ];

              aFields.forEach(function (oField, index) {
                let oInput;
                  if (!oField.visible) {
                      return;
                  }
                  if (staticFields.includes(oField.service_parameter)) {
                      return;
                  }
                  if (oField.serviceParameterType === "Date") {
                      oInput = new sap.m.DatePicker({
                          width : "200px",
                          valueFormat : "yyyy-MM-dd", 
                          displayFormat : "dd-MM-yyyy",
                          required : oField.mandatory,
                          visible : oField.visible
                      }).addStyleClass("customInput");
                  } else if (oField.serviceParameterType === "Date and Time") {
                      oInput = new sap.m.DateTimePicker({
                          width : "200px",
                          valueFormat : "yyyy-MM-ddTHH:mm:ss",
                          displayFormat : "dd-MM-yyyy HH:mm:ss",
                          required : oField.mandatory,
                          visible : oField.visible
                      }).addStyleClass("customInput");
                  } else {
                      oInput = new sap.m.Input({
                          width : "200px",
                          required : oField.mandatory,
                          visible : oField.visible
                      }).addStyleClass("customInput");
                  }

                  oInput.addCustomData(new sap.ui.core.CustomData({
                      key : "service_parameter",
                      value : oField.service_parameter
                  }));

                  oInput.addCustomData(new sap.ui.core.CustomData({
                      key : "required",
                      value : oField.mandatory ? "true" : "false"
                  }));

                  oInput.addCustomData(new sap.ui.core.CustomData({
                      key : "visible",
                      value : oField.visible ? true : false
                  }));

                  let oLabel = new sap.m.Label({
                      text : oField.label + ":",
                      labelFor : oInput.getId()
                  }).addStyleClass("customLabel");

                  let oHBox = new sap.m.HBox({
                      items : [oLabel, oInput],
                      alignItems : "Center"
                  }).addStyleClass("singleGroup");

                  if (oField.parameterRelevancy === "Org Details") {
                      if (index % 2 === 0) {
                          oVBoxOrg.addItem(oHBox);
                      } else {
                          oVBoxRightOrg.addItem(oHBox);
                      }
                  } else if (oField.parameterRelevancy === "Capacity Details") {
                      if (index % 2 === 0) {
                          oVBoxCap.addItem(oHBox);
                      } else {
                          oVBoxRightCap.addItem(oHBox);
                      }
                  }
              });
              oModel.updateBindings(true);
          },

          // This method is used to get the org's dynamic fields values during submission the contract data.
                    getOrgDynamicFieldValues : function () {
                      let aFieldValues = []; 
                      let isValid = true; 
                      let oVBoxOrg = this.byId("orgDetailsContainer");
                      let oVBoxRightOrg = this.byId("orgDetailsContainer2");

                      function extractValues(oVBox, relevancyType) {
                          oVBox.getItems().forEach(function (oHBox) {
                              var oInput = oHBox.getItems()[1]; 
                              if (oInput) {
                                  var sServiceParameter = oInput.getCustomData().find(data => data.getKey() === "service_parameter")?.getValue() || "";
                                  var sFieldType = oInput.getCustomData().find(data => data.getKey() === "serviceParameterType")?.getValue();
                                  var isRequired = oInput.getCustomData().find(data => data.getKey() === "required")?.getValue();
                                  var isVisible = oInput.getCustomData().find(data => data.getKey() === "visible")?.getValue();
                                  isRequired = isRequired === "true";      

                                  let fieldValue = "";

                                  if (oInput instanceof sap.m.DatePicker) {
                                      let dateValue = oInput.getDateValue();
                                      if (dateValue) {
                                          fieldValue = dateValue.toISOString().split("T")[0]; 
                                      }
                                  } else if (oInput instanceof sap.m.DateTimePicker) {
                                      let dateTimeValue = oInput.getDateValue();
                                      if (dateTimeValue) {
                                          fieldValue = dateTimeValue.toISOString(); 
                                      }
                                  } else if (oInput instanceof sap.m.Input) {
                                      fieldValue = oInput.getValue();
                                  }

                                  if (isRequired && !fieldValue) {
                                      isValid = false;
                                  }

                                  aFieldValues.push({
                                      label : oHBox.getItems()[0].getText().replace(":", ""), 
                                      value : fieldValue,
                                      relevancy : relevancyType,
                                      service_parameter : sServiceParameter,
                                      serviceParameterType : sFieldType,
                                      required : isRequired,
                                      visible : isVisible
                                  });
                              }
                          });
                      }
                      extractValues(oVBoxOrg, "Org Details");
                      extractValues(oVBoxRightOrg, "Org Details");
                      console.log("Dynamic Field Values:", aFieldValues);
                      return { aFieldValues, isValid }; 
                    },

                // This method is used to get the org's dynamic fields values during submission the contract data.
                  getCapacityDynamicFieldValues : function () {
                    let aFieldValues = []; 
                    let oVBoxCap = this.byId("capacityReleaseContainer");
                    let oVBoxRightCap = this.byId("capacityReleaseContainerRight");
                
                    function extractValues(oVBox, relevancyType) {
                        oVBox.getItems().forEach(function (oHBox) {
                            var oInput = oHBox.getItems()[1]; 
                            if (oInput) {
                                var sServiceParameter = oInput.getCustomData().find(data => data.getKey() === "service_parameter")?.getValue() || "";
                                var isRequired = oInput.getCustomData().find(data => data.getKey() === "required")?.getValue();
                                var isVisible = oInput.getCustomData().find(data => data.getKey() === "visible")?.getValue();
                
                                isRequired = isRequired === "true"; 
                
                                var sValue = "";
                                if (oInput instanceof sap.m.DatePicker) {
                                    sValue = oInput.getDateValue() ? oInput.getDateValue().toISOString().split("T")[0] : "";
                                } else if (oInput instanceof sap.m.DateTimePicker) {
                                    sValue = oInput.getDateValue() ? oInput.getDateValue().toISOString() : "";
                                } else if (oInput instanceof sap.m.Input) {
                                    sValue = oInput.getValue();
                                }
                
                                aFieldValues.push({
                                    label : oHBox.getItems()[0].getText().replace(" :", ""), 
                                    value : sValue,
                                    relevancy : relevancyType,
                                    service_parameter : sServiceParameter,
                                    required : isRequired,
                                    visible : isVisible
                                });
                            }
                        });
                    }
                    extractValues(oVBoxCap, "Capacity Details");
                    extractValues(oVBoxRightCap, "Capacity Details");
                    console.log("Dynamic Field Values:", aFieldValues);
                    return aFieldValues; 
                },
                
    
      //  This method is used to calculate the target qty based on dcq.
        deriveNetDCQ : function () {
          let dcqInput = this.byId("DCQ_Input");
          let targetedQty = this.byId("targetQuantity");
          if (!dcqInput || !targetedQty) return;      
          let dcqValue = parseFloat(dcqInput.getValue()) || 0; 
          let derivedTargetedQty = dcqValue * diffDays;      
          targetedQty.setValue(derivedTargetedQty);  
          let valueParamModel = this.getView().getModel("valueParameterModel")
          if(valueParamModel){
            let valueParamData = valueParamModel.getData()
            valueParamData.find(item=>item.serviceParameter)
          }
      },         

      // This method is used to validate the start date and end date.
        onSelectDate : function () {
          this.orgDetail();
          let DP1 = this.getView().byId("create_startDate");
          let DP2 = this.getView().byId("create_endDate");
          let dateValue1 = DP1.getDateValue();
          let dateValue2 = DP2.getDateValue();
          selectEndData = dateValue2
          function isValidDate(selectedDate) {
            let today = new Date();
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
          let oDateFormatDP1 = sap.ui.core.format.DateFormat.getDateInstance({
            pattern : "yyyy-MM-dd",
          });
          formattedDate1 = oDateFormatDP1.format(dateValue1);
          let oDateFormatDP2 = sap.ui.core.format.DateFormat.getDateInstance({
            pattern : "yyyy-MM-dd",
          });
          formattedDate2 = oDateFormatDP2.format(dateValue2);
          this.onDateDifference();
        },
  
        //This method is used to calculate the difference time bw selected start or end date.
        onDateDifference : function () {
          let oDatePicker1 = this.getView().byId("create_startDate");
          let oDatePicker2 = this.getView().byId("create_endDate");
          let oDate1 = oDatePicker1.getDateValue();
          let oDate2 = oDatePicker2.getDateValue();
          if (!oDate1 || !oDate2) {
            return;
          }
          let timeDiff = Math.abs(oDate2.getTime() - oDate1.getTime());
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        },

        // This method is used to get the input values of org's details.
        orgDetail : function () {
          const [vendorinp,companycodeinp,purchaseorginp,purchaseidinp,datePickerValidFrom,datePickerValidTo] = 
          HelperFunction._getInputValues(this,["create_VendorId","companyCode_id","purchaseOrg_id","purchase_id","create_startDate","create_endDate"])
          if (vendorinp && companycodeinp && purchaseorginp && purchaseidinp && datePickerValidTo && datePickerValidFrom) {
            this.getView().byId("capacityRelIconTabFilter").setEnabled(true);
          } else {
            this.getView().byId("capacityRelIconTabFilter").setEnabled(false);
          }
        },
  

        docTypeSelection : function () {
            this.getView().byId("iconTabBarHeader").setVisible(true);
            // this.loadDynamicFields(); 
            // this.fetchProfile();
          },

          //This method is used to opening vendor value help.
          onVendorValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"vendorId","PurchaseVendor")
          },

          // This method is used to execute the desired code on clicked on selected vendor.
          onSelectVendorNo : async function(oEvent){
            let input = this.byId("vendorDesc")
            let selectedVendor = HelperFunction._valueHelpSelectedValue(oEvent,this,"create_VendorId");
            input ? input.setValue(selectedVendor.Desc): ""
            BusyIndicator.show(0);
            let vendorData =await HelperFunction._getSingleEntityDataWithParam(this,"getVendorOrgDetails","Supplier",selectedVendor.title);
            if(vendorData){
              let vendorDataModel = new JSONModel(vendorData[0])
              this.getView().setModel(vendorDataModel,"vendorDataModel")
              if(vendorDataModel){
                  HelperFunction.inputFieldsDisplayOrNot(this,[{id:"companyDesc",bool:true},{id:"purchOrgDesc",bool:true},{id:"vendorDesc",bool:true}])
              }
              BusyIndicator.hide();
            }
            else{
              BusyIndicator.hide();
            }
          },
          // This method is used to opening purchase group value help
          onPurchaseGroupValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"purchaseGroupId","PurchaseGroup")
          },

          //This method is used to opening material value help.
          onMaterialValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"materialID","PurchaseMaterial")
          },

          //This method is used to opening plant value help.
          onPlantValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"plantID","PurchasePlant")
          },

          //This method is used to opening storage value help.
          onStorageValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"storageLocID","PurchaseStorageLocation")
          },

          //This method is used to opening uom value help.
          onUomValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"uomID","PurchaseUom")
          },

          //This method is used to opening delivery point value help.
          onDeliveryValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"deliveryPointID","PurchaseDeliveryPoint")
          },

          //This method is used for searching the vendor from value help.
          onValueHelpVendorSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["Supplier","SupplierName"])
          },

          //This method is used for searching the purchase group from value help.
          onValueHelpPurchaseGroupSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["PurchasingGroup","PurchasingGroupName"])
          },

          //This method is used for searching the material from value help.
          onMaterialLiveSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["Material","MaterialDescription"])
          },

          //This method is used for searching the uom from value help.
          onUomLiveSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["Msehi","Msehl"])
          },

          //This method is used for searching the plant from value help.
          onPlantLiveSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["Plant","PlantDescription"])
          },

          //This method is used for searching the storage from value help.
          onStorageLiveSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["StorageLocation","Description"])
          },

          //This method is used for searching the delivery from value help.
          onDeliveryLiveSearch : function(oEvent){
           HelperFunction._valueHelpLiveSearch(oEvent,["Locid","Locnam"])
          },
          
          // This method is used for selected material.
          onConfirmPurchaseMaterial : async function(oEvent){
            let selectedPurchaseMaterial = HelperFunction._valueHelpSelectedValue(oEvent,this,"material_id");
            let purchaseMaterialDescInput = this.byId("materialDesc")
            purchaseMaterialDescInput?purchaseMaterialDescInput.setValue(selectedPurchaseMaterial.Desc) && purchaseMaterialDescInput.setVisible(true):"";
            let plantData =await HelperFunction._getSingleEntityDataWithParam(this,"getMaterialPlantDetails","Material",selectedPurchaseMaterial.title);
            let plantDataModel = new JSONModel(plantData)
            this.getView().setModel(plantDataModel,"plantDataModel")
          },

          // This method is used for selected plant.
          onConfirmPurchasePlant : async function(oEvent){
            let selectedPurchasePlant = HelperFunction._valueHelpSelectedValue(oEvent,this,"plant_id");
            let purchasePlantDescInput = this.byId("plantDesc")
            if(selectedPurchasePlant.Desc){
              purchasePlantDescInput?purchasePlantDescInput.setValue(selectedPurchasePlant.Desc) && purchasePlantDescInput.setVisible(true):"";
            }
            let storageLocationData =await HelperFunction._getSingleEntityDataWithParam(this,"getMaterialStorageLocDetails","Plant",selectedPurchasePlant.title);
            let storageLocationDataModel = new JSONModel(storageLocationData)
            this.getView().setModel(storageLocationDataModel,"storageDataModel")
          },

          // This method is used for selected storage loaction.
          onConfirmStorageLocation : async function(oEvent){
            let selectedPurchasePlant = HelperFunction._valueHelpSelectedValue(oEvent,this,"storage_id");
            let purchasePlantDescInput = this.byId("storageDesc")
            if(selectedPurchasePlant.Desc){
              purchasePlantDescInput?purchasePlantDescInput.setValue(selectedPurchasePlant.Desc) && purchasePlantDescInput.setVisible(true):"";
              }
            },

          // This method is used for selected purchase group.
          onConfirmPurchaseGroupValueHelp : async function(oEvent){
            let selectedPurchaseGroup = HelperFunction._valueHelpSelectedValue(oEvent,this,"purchase_id");
            let purchaseGroupDescInput = this.byId("purchGrpDesc")
            purchaseGroupDescInput?purchaseGroupDescInput.setValue(selectedPurchaseGroup.Desc) && purchaseGroupDescInput.setVisible(true):""
          },

          // This method is used for selected uom.
          onConfirmUom : async function(oEvent){
            let selectedPurchaseGroup = HelperFunction._valueHelpSelectedValue(oEvent,this,"Uom_id")
          },

          // This method is used for selected delivery point.
          onConfirmDeliveryPoint : async function(oEvent){
            let selectedDeliveryPoint = HelperFunction._valueHelpSelectedValue(oEvent,this,"delivery_id")
            let deliveryPointInput = this.byId("delivery_Desc")
            deliveryPointInput?deliveryPointInput.setValue(selectedDeliveryPoint.Desc) && deliveryPointInput.setVisible(true):""
          },

         // This method is used for execute the code after selected service profile.
          onSelectProfile : async function(oEvent) {
            var oSelectedItem = oEvent.getSource().getSelectedItem(); 
            if (oSelectedItem) {
                var sKey = oSelectedItem.getKey(); 
                var sText = oSelectedItem.getText();
                let derivedTargetedQty = this.byId("DCQ_Input").getValue()
                let uomValue = this.byId("Uom_id").getValue()
                let serviceProfileData =await HelperFunction._getSingleEntityDataWithParam(this,"getSelectedProfileData","serviceProfileName",sText);
                console.log("data",serviceProfileData)
                let ThresholdRelevantData = new JSONModel(serviceProfileData[0].ThresholdRelevant)
                this.getView().setModel(ThresholdRelevantData,"ThresholdRelevantModel")
                let RefrenceRelevantData = new JSONModel(serviceProfileData[0].RefrenceRelevant)
                this.getView().setModel(RefrenceRelevantData,"RefrenceRelevantModel")
                let valueParameterData = new JSONModel(serviceProfileData[0].ValueParameter);
                this.getView().setModel(valueParameterData, "valueParameterModel");

                // let dcqEntry = serviceProfileData[0].ValueParameter.find(item => item.serviceParameter === "DCQ");
                // if (dcqEntry) {
                //     dcqEntry.value = derivedTargetedQty;
                //     dcqEntry.uom = uomValue;
                //     valueParameterData.refresh(true); 
                // }

                console.log("value rank",valueParameterData.getData())
                let transformedData = Object.entries(serviceProfileData[0].AllocationRelevant).map(
                  ([level, params]) => ({
                    Level : level,
                    Parameters : params.map((p) => ({
                      key : p.serviceParameter,
                      text : p.serviceParameter
                    })),
                    selectedParam : params.length > 0 ? params[0].serviceParameter : ""
                  })
                );
                var oAllocModel = new sap.ui.model.json.JSONModel({
                  allocLevel : transformedData
                });
                
                this.getView().setModel(oAllocModel, "allocModel");
            }
        },        

        // This method is used for add the clause code after clicked on add button.
        onAddClauseCodePress : function () {
          let threshDataModel = this.getView().getModel("threshDataModel");
          let threshData = threshDataModel.getData();
          let emptythreshTemplate = structuredClone(threshTemplate);
          threshData.push(emptythreshTemplate);
          threshDataModel.setData(threshData);
          threshDataModel.refresh();
        },

        // This method is used to delete the add clasue code.
        onDeleteClauseCodePress : function (oEvent) {
          let selectedRow = oEvent.getSource().getParent();
          let clCodeTable = this.getView().byId("create_clCodeTable");
          let rowIndex = clCodeTable.indexOfItem(selectedRow);
          let clTableModel = this.getView().getModel("threshDataModel");
          let clCodeTableData = clTableModel.getData();
          clCodeTableData.splice(rowIndex, 1);
          clTableModel.setData(clCodeTableData);
          clTableModel.refresh();
        },

        // This method is used to validate the fields when clicked on next button in org details.
        onNext : function () {    
          let { aFieldValues: dynamicData } = this.getOrgDynamicFieldValues();
          let isValid = true;
          dynamicData.forEach(item => {
              let isVisible = item.visible; 
          
              if (isVisible !== false && item.required && (!item.value || item.value.trim() === "")) { 
                  isValid = false;
              }
          });
          if (!isValid) {
              sap.m.MessageBox.show("Please fill in all required dynamic fields.");
              return;
          }
          const [vendorinp, companycodeinp, purchaseorginp, purchaseidinp, datePickerValidFrom, datePickerValidTo] =
              HelperFunction._getInputValues(this, ["create_VendorId", "companyCode_id", "purchaseOrg_id", "purchase_id", "create_startDate", "create_endDate"]);
          if (vendorinp && companycodeinp && purchaseorginp && purchaseidinp && datePickerValidTo && datePickerValidFrom) {
              const oIconTabBar = this.byId("iconTabBarHeader");
              if (oIconTabBar) {
                  const oBoxDetailsTab = this.byId("capacityRelIconTabFilter");
                  if (oBoxDetailsTab) {
                      oBoxDetailsTab.setEnabled(true); 
                  }
                  oIconTabBar.setSelectedKey("itemDetails");
              } else {
                  console.error("IconTabBar not found.");
              }
          } else {
              sap.m.MessageBox.show("Please fill in all required fields.");
          }
      },      

          // This method is used to validate the fields when clicked on next button in service cataologue.
          checkServiceCatalogueFields : function(){
            const [materialInp,targetQtyInp,uomInp,plantInp,storageInp] 
            = HelperFunction._getInputValues(this,["material_id","targetQuantity","Uom_id","plant_id","storage_id"])
            let profiletypeInp = this.byId("selectedProfileType").getSelectedItem();
            let profiletypeValue = profiletypeInp ? profiletypeInp.getText() : ""; 
            if (materialInp && targetQtyInp && uomInp && plantInp && storageInp && profiletypeValue) {
             return true
            } else {
              return false
            }
          },     

        // This method is used to validate the fields when clicked on next button in service capacity details.
          onProceedServCat : function () {
            let dynamicData = this.getCapacityDynamicFieldValues();
            console.log("Dynamic Field Data:", dynamicData); 

            let isDynamicValid = true;

            if (Array.isArray(dynamicData)) {  
                dynamicData.forEach(item => {
                    let isVisible = item.visible; 
                    if (isVisible !== false && item.required && (!item.value || item.value.trim() === "")) {
                        isDynamicValid = false;
                    }
                });
            } else {
                console.error("Error: dynamicData is not an array:", dynamicData);
                return;
            }
            if (!isDynamicValid) {
                sap.m.MessageBox.show("Please fill in all required dynamic fields.");
                return; 
            }
            let isValid = this.checkServiceCatalogueFields();
            if (!isValid) {
                sap.m.MessageBox.show("Please fill in all required fields.");
                return; 
            }        
            const oIconTabBar = this.byId("iconTabBarHeader");
            if (oIconTabBar) {
                const oBoxDetailsTab = this.byId("serviceCatalogueIconTabFilter");
                if (oBoxDetailsTab) {
                    oBoxDetailsTab.setEnabled(true);
                }
                oIconTabBar.setSelectedKey("servDetails");
            } else {
                console.error("IconTabBar not found.");
            }
        },
        
      // This method is used to clear the material field.
      _clearMaterialForm : function () {
          HelperFunction._clearInputValues(this,["material_id","materialDesc","targetQuantity","DCQ_Input","Uom_id","plant_id","plantDesc","storage_id","storageDesc","selectedProfileType","delivery_id1"])
      },      

      // This method is used to validate the selected date in clause code.
          onSelectClauseCValidFrom : function (oEvent) {
            let contractValidFrom = this.getView().byId("create_startDate").getValue();
            let contractValidTo = this.getView().byId("create_endDate").getValue();
            let clauseCValidFrom = oEvent.getSource().getValue();

            let clTable = this.getView().byId("clCodeTable");
            let clBinding = clTable.getBinding("items");
            let items = clBinding.oList;

            let clCodeMap = {};
            let hasDuplicate = false;

            for (var i = 0; i < items.length; i++) {
              let clCode = items[i].clCode;
              if (clCodeMap[clCode]) {
                hasDuplicate = true;
                break;
              } else {
                clCodeMap[clCode] = true;
              }
            }

            if (hasDuplicate) {
              for (let j = 0; j < items.length; j++) {
                for (let k = j + 1; k < items.length; k++) {
                  if (items[j].clCode === items[k].clCode) {
                    var validityFromJ = new Date(items[j].validFrom);
                    var validityToJ = new Date(items[j].validTo);
                    var validityFromK = new Date(items[k].validFrom);
                    var validityToK = new Date(items[k].validTo);

                    if (
                      (validityFromJ <= validityFromK &&
                        validityFromK <= validityToJ) ||
                      (validityFromJ <= validityToK && validityToK <= validityToJ)
                    ) {
                      sap.m.MessageBox.error("Validity range overlap.");
                      oEvent.getSource().setValue("");
                      return;
                    }
                  }
                }
              }
            } else {
              console.log("No duplicates found.");
            }

            let contractValidFromDate = new Date(contractValidFrom);
            let contractValidToDate = new Date(contractValidTo);
            let clauseCValidFromDate = new Date(clauseCValidFrom);

            if (clauseCValidFromDate) {
              if (
                clauseCValidFromDate < contractValidFromDate ||
                clauseCValidFromDate > contractValidToDate
              ) {
                sap.m.MessageBox.error(
                  "Clause Code Valid To should be within the range of Contract Start Date to End Date."
                );
                oEvent.getSource().setValue("");
                return;
              }
            }
          },

         // This method is used to validate the selected date in clause code.
          onSelectClauseCValidTo : function (oEvent) {
            let contractValidFrom = this.getView().byId("create_startDate").getValue();
            let contractValidTo = this.getView().byId("create_endDate").getValue();
            let clauseCValidTo = oEvent.getSource().getValue();

            let clTable = this.getView().byId("clCodeTable");
            let clBinding = clTable.getBinding("items");
            let items = clBinding.oList;

            let clCodeMap = {};
            let hasDuplicate = false;

            for (let i = 0; i < items.length; i++) {
              let clCode = items[i].clCode;
              if (clCodeMap[clCode]) {
                hasDuplicate = true;
                break;
              } else {
                clCodeMap[clCode] = true;
              }
            }

            if (hasDuplicate) {
              for (let j = 0; j < items.length; j++) {
                for (let k = j + 1; k < items.length; k++) {
                  if (items[j].clCode === items[k].clCode) {
                    let validityFromJ = new Date(items[j].validFrom);
                    let validityToJ = new Date(items[j].validTo);
                    let validityFromK = new Date(items[k].validFrom);
                    let validityToK = new Date(items[k].validTo);

                    if (
                      (validityFromJ <= validityFromK &&
                        validityFromK <= validityToJ) ||
                      (validityFromJ <= validityToK && validityToK <= validityToJ)
                    ) {
                      sap.m.MessageBox.error("Validity range overlap.");
                      oEvent.getSource().setValue("");
                      return;
                    }
                  }
                }
              }
            } else {
              console.log("No duplicates found.");
            }

            let contractValidFromDate = new Date(contractValidFrom);
            let contractValidToDate = new Date(contractValidTo);
            let clauseCValidToDate = new Date(clauseCValidTo);

            if (clauseCValidToDate) {
              if (
                clauseCValidToDate < contractValidFromDate ||
                clauseCValidToDate > contractValidToDate
              ) {
                sap.m.MessageBox.error(
                  "Clause Code Valid To should be within the range of Contract Start Date to End Date."
                );
                oEvent.getSource().setValue("");
                return;
              }
            }
          },

          // This method is used to post the header data.
          submitPurchaseAgreement : async function () {
          let CompCode = this.byId("companyCode_id").getValue()
          let Vendor = this.byId("create_VendorId").getValue()
          let PurchOrg = this.byId("purchaseOrg_id").getValue()
          let PurGroup = this.byId("purchase_id").getValue()
          let StgeLoc = this.byId("storage_id").getValue()
          let Material = this.byId("material_id").getValue()
          let Plant = this.byId("plant_id").getValue()
          let TargetQty = this.byId("targetQuantity").getValue()
          let PoUnit = this.byId("Uom_id").getValue()
            let successBlockExecuted = false;
            try {
              sap.ui.core.BusyIndicator.show(0);
              let DocTypeSelect = this.byId("selectedDocumentType").getSelectedItem()
              let DocType = DocTypeSelect.getText().split(" ")[0]
              let validFrom = this.getView().byId("create_startDate").getValue();
              let validTo = this.getView().byId("create_endDate").getValue();
              let dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
              let formattedValidFrom = dateFormatter.format(new Date(validFrom));
              let formattedDateValidTo = dateFormatter.format(new Date(validTo));
              let oPurchaseData = {
                CompCode : CompCode || "",
                DocType : DocType || "",
                Vendor : Vendor || "",
                PurchOrg : PurchOrg || "",
                PurGroup : PurGroup || "",
                VperStart : formattedValidFrom,
                VperEnd: formattedDateValidTo,
                to_Items : [{
                    SalesContractItem : "10",
                    Material : Material || "",
                    Plant : Plant || "",
                    StgeLoc :StgeLoc || "",
                    TargetQty : TargetQty || "",
                    PoUnit : PoUnit || "",
                    PeriodIndExpirationDate : "D",
                }]
            };

              let purchaseModel = this.getOwnerComponent().getModel();
              let oBindList = purchaseModel.bindList("/CreatePurchaseSet");
              let oResponse = await oBindList.create(oPurchaseData, true);
              oBindList.attachCreateCompleted(async (oEvent) => {
                oResponse = oEvent.getParameters();
                if (oResponse.success === true) {
                  successBlockExecuted = true;
                  let purchAgreePath = oResponse.context.sPath;
                  purchaseNumber = purchAgreePath.match(/\d+/)[0];
                  sap.ui.core.BusyIndicator.hide();
                  sap.m.MessageBox.success(`Purchase Agreement: ${purchaseNumber}`,
                    {
                      title: "Success",
                      onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                        }
                      }.bind(this),
                    }
                  );
                  if (purchaseNumber) {
                    await this.serviceParameterData(purchaseNumber,formattedValidFrom,formattedDateValidTo);
                  }
                }
              });
              await oBindList.attachCreateCompleted((error) => {
                if (!successBlockExecuted) {
                  console.error(
                    "Error creating purchase agreement:",
                    error.mParameters.context.oModel.mMessages[""][0].message
                    
                  );
                  console.log("Error", error.mParameters.context.oModel.mMessages[""][0]);
                  if (error.response) {
                    let responseBody;
                    try {
                      responseBody = JSON.parse(error.response.body);
                    } catch (parseError) {
                      console.error("Error parsing response body:", parseError);
                      console.log(parseError)
                    }
                    if (error) {
                      sap.m.MessageBox.error("Error: " + error.mParameters.context.oModel.mMessages);
                    } else {
                      sap.m.MessageBox.error("An unexpected error occurred. Please try again.");
                    }
                    sap.ui.core.BusyIndicator.hide();
                  } else {
                    sap.m.MessageBox.error("Error: " +error.mParameters.context.oModel.mMessages[""][0].message);
                    sap.ui.core.BusyIndicator.hide()
                  }
                }
              });
            } catch (error) {
              console.error("Unexpected error:", error);
              sap.m.MessageBox.error("Unexpected error occurred: " + error.message);
              sap.ui.core.BusyIndicator.hide()
            }
          },

          // This method is used to post all data and this method is calling from 'submitPurchaseAgreement' method.
          serviceParameterData : async function (purchaseNumber, validFrom, validTo) {
            try {
            let orgDyamicFieldsValue = this.getOrgDynamicFieldValues() || [];
            let capDyamicFieldsValue = this.getCapacityDynamicFieldValues() || [];
            let formattedData = [];
        
            function formatFieldData(field, fieldLevel) {
                return {
                    Vbeln : purchaseNumber,
                    ItemNo : "000010",
                    ContractField : field.service_parameter || "",
                    Fieldlevel : fieldLevel,
                    FieldValue : field.value || "",
                    DocType : "P",
                };
            }
            let orgDynamicData =  orgDyamicFieldsValue.aFieldValues
            
            if (Array.isArray(orgDynamicData) && orgDynamicData.length > 0) {
                orgDynamicData.forEach(field => {
                    formattedData.push(formatFieldData(field, "ORG"));
                });
            }
        
            if (Array.isArray(capDyamicFieldsValue) && capDyamicFieldsValue.length > 0) {
                capDyamicFieldsValue.forEach(field => {
                    formattedData.push(formatFieldData(field, "CAP"));
                });
            }
        
            let orgDetails = HelperFunction._getInputValues(this, [
                "create_VendorId", "vendorDesc", "companyCode_id", "companyDesc", "purchaseOrg_id",
                "purchOrgDesc", "purchase_id", "purchGrpDesc", "material_id", "materialDesc", "targetQuantity",
                "Uom_id", "DCQ_Input", "plant_id", "plantDesc", "storage_id", "storageDesc", "delivery_id", "delivery_Desc"
            ]);
        
            let [vendorID, vendorDesc, companyCode, companyCodeDesc, purchaseOrg, purchaseOrgDesc,
                purchaseGroup, purchaseGroupDesc, material, materialDesc, targetQty, uom, dcq, plant, plantDesc,
                storage, storageDesc, deliveryPt, deliveryDesc] = orgDetails;
        
            let DocTypeSelect = this.byId("selectedDocumentType").getSelectedItem();
            let DocType = DocTypeSelect ? DocTypeSelect.getText().split(" ")[0] : "";
        
            let oSelect = this.byId("selectedProfileType");
            let profiletype = oSelect.getSelectedItem()?.getText() || "";
            function convertToODataDate(date) {
              if (date && typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  return date + "T00:00:00Z"; 
              }
              return date || null;  
          }
            let headerData = [{
                Vbeln : purchaseNumber || "",
                Item : "000010",
                Material : material || "",
                MaterialText  : materialDesc || "",
                DeliveryPoint : deliveryPt || "",
                DeliveryText : deliveryDesc || "",
                RedeliveryPoint : "",
                RedeliveryText : "",
                Plant : plant,
                PlantText  : plantDesc || "",
                Uom : uom,
                DPTargetQty : targetQty || "",
                ValidFrom : convertToODataDate(validFrom),
                ValidTo : convertToODataDate(validTo),
                Profile : profiletype || "",
                DeliveryDcq : dcq || "",
                RedeliveryDcq : "",
                Type : "",
                SALES_DESC : "",
                Contracttype : "P"
            }];
        
            let valParaModel = this.getView().getModel("valueParameterModel");
            let valParaData = valParaModel ? valParaModel.getData() : [];
        
            let ValueParameterData = valParaData.map(item => ({
                ServiceParam : item.serviceParameter,
                ParamValue : item.value,
                Vbeln : purchaseNumber,
                ItemNo : "000010",
                ServProfile : profiletype || "",
                ParamType : "VALUE"
            }));
        
            let allocationModel = this.getView().getModel("allocModel");
            let allocationData = allocationModel ? allocationModel.getData().allocLevel : [];
        
            let allocaModelData = allocationData.map(item => ({
                ServiceParam : item.selectedParam,
                ParamValue : item.Level,
                Vbeln : purchaseNumber || "",
                ItemNo : "000010",
                ServProfile : profiletype || "",
                ParamType : "ALLOCATION"
            }));
        
            let threshDataModel = this.getView().getModel("threshDataModel");
            let threshData = threshDataModel ? (threshDataModel.getData() || []) : [];
            
            let hasEmptyClauseCode = threshData.some(item => !item.clCode);

            let threshHoldArray = hasEmptyClauseCode ? [] : 
                threshData.map(item => ({
                    Vbeln : purchaseNumber || "",
                    ItemNo : "000010",
                    ClauseCode : item.clCode || "",
                    ValidFrom : item.validFrom ? convertToODataDate(item.validFrom) : convertToODataDate(validFrom),  
                    ValidTo : item.validTo ? convertToODataDate(item.validTo) : convertToODataDate(validTo),  
                    ThresholdP : item.threshold || "",
                    ThreshRef : item.threshRef || "",
                    Remark : item.remark || "",
                    CalculatedValue : item.threshold ? ((parseFloat(item.threshold) * dcq) / 100).toString() : ""
                }));     
        
            let oPayload = {
                Vbeln : purchaseNumber,
                toClausecode : threshHoldArray,
                toCustfld : formattedData,
                toHeaderTable : headerData,
                toservpara : [...ValueParameterData, ...allocaModelData]
            };
            console.log("data",oPayload)
            let proModel = this.getOwnerComponent().getModel();
            let that = this; 
            let oBindList = proModel.bindList("/createContractSet");
            oBindList.create(oPayload, true);
            // this.refreshAfterSubmitPurchase()
            oBindList.attachCreateCompleted((oEvent) => {
              let params = oEvent.getParameters();
              if (params.success) {
                  that.refreshAfterSubmitPurchase(); 
              } else {
                  console.error("Failed to create contract:", params.error);
                  sap.m.MessageBox.error("Contract submission failed. Please check input values.");
              }
             });
           } catch (error) {
          console.error("Error in _sendToBackend:", error);     
          }
        },  

          // This method is used to refresh the screen after submit the data.
          refreshAfterSubmitPurchase : function(){
            this.createDynamicFields()
            let oLayout =  this.byId("iconTabBarHeader")
            oLayout.setVisible(false)
            this.getView().byId("selectedDocumentType").setSelectedKey(null);
            HelperFunction._clearInputValues(this,["create_VendorId","vendorDesc","companyCode_id","companyDesc","purchaseOrg_id",
              "purchOrgDesc","purchase_id","purchGrpDesc","material_id","materialDesc","targetQuantity",
              "Uom_id","DCQ_Input","plant_id","plantDesc","storage_id","storageDesc","delivery_id","delivery_Desc"
            ])
            HelperFunction.inputFieldsDisplayOrNot(this,[{id:"purchGrpDesc",bool:false},{id:"materialDesc",bool:false},
              {id : "storageDesc",bool : false},{id : "delivery_Desc",bool : false},{id : "plantDesc",bool : false}
            ])
            this.byId("capacityRelIconTabFilter").setEnabled(false)
            this.byId("serviceCatalogueIconTabFilter").setEnabled(false)
            let sData = this.byId("create_startDate")
            let eData = this.byId("create_endDate")
            if (sData || eData) {
              sData.setValue("");      
              sData.setDateValue(null); 
              eData.setValue("");      
              eData.setDateValue(null); 
          }
            let oSelect = this.byId("selectedProfileType"); 
            if (oSelect) {
                oSelect.setSelectedKey("");  
                oSelect.setSelectedItem(null); 
            }
            this.getView().setModel(new sap.ui.model.json.JSONModel({}), "ThresholdRelevantModel");
            this.getView().setModel(new sap.ui.model.json.JSONModel({}), "RefrenceRelevantModel");
            this.getView().setModel(new sap.ui.model.json.JSONModel({}), "valueParameterModel");
            this.getView().setModel(new sap.ui.model.json.JSONModel({}), "allocModel");
            let oView = this.getView();
            let threshDataModel = oView.getModel("threshDataModel");  
            let emptyRow = {
                clCode : "",
                validFrom : "",
                validTo : "",
                threshold : "",
                threshRef : "",
                remark : ""
            };  
            threshDataModel.setData([emptyRow]);  
            threshDataModel.refresh();
            let oIconTabBar = oView.byId("iconTabBarHeader"); 
            if (oIconTabBar) {
              oIconTabBar.setSelectedKey("headerDetails"); 
            }
          }
    });
});

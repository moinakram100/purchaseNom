sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/ingenx/purchasecontract/utils/HelperFunction",
    "sap/ui/core/BusyIndicator"
], (BaseController, JSONModel, HelperFunction, BusyIndicator) => {
    "use strict";

    return BaseController.extend("com.ingenx.purchasecontract.controller.DisplayPurchaseContract", {
        onInit() {
            this.loadInitialValueHelpData();
        },

        // This method is used for opening the contract value help.
        onDisplayContract:async function () {
            HelperFunction._openValueHelpDialog(this,"purchaseFragment","PurchaseAmendContractNo")
        },

        // This method is execute after selected amend contract no.
        onConfirmAmendContractNo: async function (oEvent) {
            let selectedContract = HelperFunction._valueHelpSelectedValue(oEvent, this, "display_purchaseNumberInput");
            let orgDetailsTab = this.byId("display_iconTabBarHeader1");
        
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

        // This method is used to load initial contract data on screen.
        loadContractData: async function (selectedContractNumber) {
            let oModel = this.getOwnerComponent().getModel();      
            let oBindContext = oModel.bindContext(`/createContractSet('${selectedContractNumber}')`, undefined, {
                $expand:"toHeaderTable,toservpara,toClausecode,toCustfld,toOrgDetail"
            });
            try {
                let oData = await oBindContext.requestObject();
                console.log("contract data",oData)
                let contractDataModel = new sap.ui.model.json.JSONModel(oData.toOrgDetail);
                this.getView().setModel(contractDataModel, "displayOrgDetailsModel");
                this.getView().setModel(new JSONModel(oData.toHeaderTable[0]),"displayCapacityDetailsModel")
                this.getView().setModel(new JSONModel(oData.toClausecode),"clauseParamModel")
                this.createDynamicFields(oData.toCustfld)
                let saleData = oData.toservpara || [];
                let aValueData = saleData.filter(item => item.ParamType === "VALUE");
                this.getView().setModel(new JSONModel(aValueData),"valueParameterModel")
                console.log("allocation data",saleData)
                let aAllocationData = saleData.filter(item => item.ParamType === "ALLOCATION")
                this.getView().setModel(new JSONModel(aAllocationData), "allocModel");
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        },   

        // This method is used to create the dynamic fields on screen
        createDynamicFields: function (customData) {
            let oVBoxOrg = this.byId("displayOrgDetailsContainer");
            let oVBoxRightOrg = this.byId("displayOrgDetailsContainer2");
            let oVBoxCap = this.byId("displayCapacityReleaseContainer");
            let oVBoxRightCap = this.byId("displayCapacityReleaseContainer2");
        
            oVBoxOrg.removeAllItems();
            oVBoxRightOrg.removeAllItems();
            oVBoxCap.removeAllItems();
            oVBoxRightCap.removeAllItems();
        
            let orgCount = 0, capCount = 0;
        
            customData.forEach((oField) => {
                var oInput = new sap.m.Input({
                    value : oField.FieldValue,
                    width : "200px",
                    editable : false
                }).addStyleClass("customInput");
        
                oInput.addCustomData(new sap.ui.core.CustomData({
                    key : "service_parameter",
                    value : oField.ContractField
                }));
        
                var oLabel = new sap.m.Label({
                    text : oField.ContractField + ":",
                    labelFor : oInput.getId()
                }).addStyleClass("customLabel");
        
                var oHBox = new sap.m.HBox({
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

        // This method is used for searching the contract in value help.
        onDisplayContractChange : function(oEvent){
            HelperFunction._valueHelpLiveSearch(oEvent,["Vbeln"])
        },

        // This method is used to load the contract data in value help.
        loadInitialValueHelpData: async function () {
            let oData = await HelperFunction._getSingleEntityData(this, "PurchaseContractNos");    
            if (Array.isArray(oData)) {
                oData = [...new Set(oData)] 
                        .map(num => parseInt(num, 10))
                        .sort((a, b) => b - a) 
                        .map(num => num.toString()); 
            }
            this.getView().setModel(new JSONModel(oData), "purchaseContractModel");
        },
 
        // This method is used to format the date in yyyy-mm-dd pattern
        formatDate: function (dateString) {
            if (dateString) {
                let date = new Date(dateString);
                let day = String(date.getDate()).padStart(2, '0'); 
                let month = String(date.getMonth() + 1).padStart(2, '0'); 
                let year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
            return "";
        }

    });
});

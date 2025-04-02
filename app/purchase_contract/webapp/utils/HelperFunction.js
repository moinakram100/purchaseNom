sap.ui.define(["sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast"],
    function (Fragment,Filter,FilterOperator,MessageToast) {
   "use strict";
   return {

    // code is using for opening a value help dialog
       _openValueHelpDialog: function (oController, fragmentId, fragmentName) {
           let oView = oController.getView();

           if (!oController[fragmentId]) {
               return Fragment.load({
                   id: oView.getId(),
                   name: `com.ingenx.purchasecontract.fragments.${fragmentName}`,
                   controller: oController
               }).then(oDialog => {
                   oController[fragmentId] = oDialog;
                   oView.addDependent(oController[fragmentId]);
                   oController[fragmentId].open();
               }).catch(error => {
                   console.warn("Fragment not Loading", error);
               });
           } else {
               oController[fragmentId].open();
           }
       },

       //set the selected item's value inside input field from value help    
       _valueHelpSelectedValue : function(oEvent,oController,inputId){
           let inputValue = oController.byId(inputId)
           let sSelect = oEvent.getParameter("selectedItem")
           let sValue = sSelect.getTitle()
           let sDesc = sSelect.getDescription()
          if(sValue){
            inputValue.setValue(sValue)
            oEvent.getSource().getBinding("items").filter([]);
            return {title:sValue,Desc : sDesc}
          }
          else{
            console.warn("Selected Value Not Found!!")
          }
       },

       //clear the value from form or input fields     
       _clearInputValues : function(oController,ids){
        if(Array.isArray(ids)){
            ids.forEach(id=>{
                let inputField = oController.byId(id)
                if(inputField){
                    inputField.setValue("")
                }
                else{
                    console.warn(`${id} not Found`)
                }
            })  
        }
        else{
            console.warn("Invalid Id")
        }
       },

      // code is using for searching the item
      _valueHelpLiveSearch: function (oEvent, filterFields) {
        let sValue =
            oEvent.getParameter("value") ||
            oEvent.getParameter("query") ||
            oEvent.getParameter("newValue");
        let oSource = oEvent.getSource();
        let oBinding = oSource.getBinding("items");
    
        if (!oBinding) {
            console.warn("No binding found for items.");
            return;
        }    
        if (sValue && filterFields.length > 0) {
            let aFilters = filterFields.map(field => 
                new sap.ui.model.Filter(field, sap.ui.model.FilterOperator.Contains, sValue)
            );    
            let oCombinedFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false 
            });
            oBinding.filter([oCombinedFilter]);
        } else {
            oBinding.filter([]);
        }
    },    

    // read data based on property 
    _getSingleEntityDataWithParam : async function(oController,url,property,param){
       let oModel = oController.getOwnerComponent().getModel()
       let oBindList = oModel.bindList(`/${url}(${property}='${param}')`)
       try {
        let oContext = await oBindList.requestContexts(0,Infinity)
        let oData = oContext.map(context=>context.getObject())
        if(oData.length===0){
            sap.m.MessageToast.show("Data Not Found")
            return
        }
        return oData
       } catch (error) {
        console.log(`Error occurred while reading data from the '${url}' entity : `, error)
        sap.m.MessageToast.show(error)
       }
    },

    //read all data of a entity  
    _getSingleEntityData :async function(oController,url){
        let oModel = oController.getOwnerComponent().getModel()
        let oBindList = oModel.bindList(`/${url}`)
        try {
            let oContext = await  oBindList.requestContexts(0,Infinity)
            let oData = oContext.map(context=>context.getObject())
            if(oData.length === 0){
                return console.log("Data Not Found")
            }
            return oData
        } catch (error) {
            console.log(`Error occurred while reading data from the '${url}' entity : `, error)
            sap.m.MessageToast.show(error, {
                duration: 3000,
                width: "1000px", 
            });
        }
    },

    // searching on table with muliple filter value 
    performTableSearchMethod: function (oController,oEvent, tableId, filterFields) {
        const sValue = oEvent.getParameter("query") || oEvent.getParameter("newValue");
        const oTable = oController.getView().byId(tableId);
        if (!oTable) {
            console.error("Table not found");
            return;
        }
        const aFilters = filterFields.map((field) =>
            new sap.ui.model.Filter(field, sap.ui.model.FilterOperator.Contains, sValue)
        );
        const oFilter = new sap.ui.model.Filter({
            filters: aFilters,
            and: false
        });
        const oBinding = oTable.getBinding("items");
        if (!oBinding) {
            console.error("Table binding not found");
            return;
        }
        oBinding.filter(oFilter);
    },

    // get input fileds values
    _getInputValues: function (oController, inputIds) {
        if (!Array.isArray(inputIds)) {
            console.error("Input IDs must be an array. Received:", inputIds);
            return [];
        }
        return inputIds.map(id => {
            let inputField = oController.byId(id);
            if (!inputField) {
                console.warn(`Input field not found for ID: ${id}`);
                return null;
            }
            return inputField.getValue();
        }).filter(value => value !== null); 
    },

    // set value in input field
    setValueInsideInputField : function(oController,inputValues){
      if(Array.isArray(inputValues)){
          inputValues.forEach(item=>{
              let input = oController.getView().byId(item.id)
              if(input){
                 input ? input.setValue(item.value) : ""
              }
          })    
      }
      else{
        return []
      }
    },

    // hide or display input fields
    inputFieldsDisplayOrNot: function(oController, inputIDs) {
        if (!oController) {
            console.error("inputFieldsDisplayOrNot: oController is undefined");
            return;
        }
    
        inputIDs.forEach(item => {
            let input = oController.byId(item.id);
            if (input) {
                input.setVisible(item.bool !== undefined ? item.bool : false);
            } else {
                console.warn("Element not found:", item.id);
            }
        });
    },

    //convert date object and date string in datetime pattern
    convertToODataDate: function(date) {
        if (typeof date === "string") {
            let parts = date.split("-");
            if (parts.length === 3) {
                let day = parseInt(parts[0], 10);
                let month = parseInt(parts[1], 10) - 1; 
                let year = parseInt(parts[2], 10);
                date = new Date(year, month, day);
            } else {
                return null;
            }
        }
        if (date instanceof Date && !isNaN(date)) {
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}T00:00:00Z`;
        }
        return null;
    },


    getAllTypeInputValues: function(oController, aControlIds) {
        if (!Array.isArray(aControlIds) || aControlIds.length === 0) {
            console.warn("Invalid control IDs provided");
            return [];
        }
        return aControlIds.map(id => {
            let oControl = oController.byId(id);
            if (!oControl) {
                console.warn(`Control with ID ${id} not found`);
                return null;
            }
    
            let value = null;
    
            if (oControl.isA("sap.m.Input")) {
                value = oControl.getValue();
            }
            else if (oControl.isA("sap.m.ComboBox") || oControl.isA("sap.m.Select")) {
                value = oControl.getSelectedKey() || oControl.getSelectedItem()?.getText();
            }
            else if (oControl.isA("sap.m.DatePicker")) {
                let date = oControl.getDateValue();
                value = date ? date.toISOString().split("T")[0] : null;
            }
            else if (oControl.isA("sap.m.DateTimePicker")) {
                let dateTime = oControl.getDateValue();
                value = dateTime ? dateTime.toISOString() : null; 
            }
            else {
                console.warn(`Unsupported control type for ID: ${id}`);
            }
            return value;
        });
    }
    
    
    
    
    
   };
});
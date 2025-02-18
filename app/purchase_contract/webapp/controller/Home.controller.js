sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.purchasecontract.controller.Home", {
        onInit() {
        },
        onCreatePA : function(){
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("purchaseCreationRoute")
        }
    });
});
/* checksum : f9b4ea8c39c936c5dcf23f5746ae176b */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service GMSPD_SERV_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.OrgDetailSet {
  @sap.unicode : 'false'
  @sap.label : 'Contract Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sold-To Party'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SoldToParty : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sold-To Party Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SoldToPartyText : String(80) not null;
  @sap.unicode : 'false'
  @sap.label : 'Ship-To Party'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ShipToParty : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Ship-To Party Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ShipToPartyText : String(80) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Org.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SalesOrg : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Org. Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SalesOrgText : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Distr. Channel'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DistributionChannel : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Distr. Channel Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DistributionChannelText : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Division'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Division : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Division Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DivisionText : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Contract Descr'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Description : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CompanyCode : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Company Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CompanyCodeText : String(25) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purchasing Org.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PurchOrg : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purchasing Org. Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PurchOrgText : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purch. Group'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PurchGrp : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purch. Group Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PurchGrpText : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocType : String(1) not null;
  @sap.display.format : 'Date'
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidFrom : Date;
  @sap.display.format : 'Date'
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidTo : Date;
  @sap.unicode : 'false'
  @sap.label : 'Contract Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Type : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.CapDetailSet {
  @sap.unicode : 'false'
  @sap.label : 'Contract Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Item : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MaterialText : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Target Quantity'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TargetQty : Decimal(3, 3);
  @sap.unicode : 'false'
  @sap.label : 'Target Qty UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Uom : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Daily ContractQty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DCQ : Decimal(3, 3);
  @sap.unicode : 'false'
  @sap.label : 'Plant'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Plant : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Plant Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PlantText : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Service Profile'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ServProfile : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RedeliveryPt : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RedeliveryPtText : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPt : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPtText : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transm. Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Transmissiontype : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Stor. Loc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StorageLocation : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StorageLocationName : String(16) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.CreateSPSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  toHeaderItemCfg : Association to many GMSPD_SERV_SRV.HeaderItemConfigSet {  };
  toContractHeader : Association to many GMSPD_SERV_SRV.ContractHeaderSet {  };
  SalesToItemNav : Association to many GMSPD_SERV_SRV.SPItemSet {  };
  SalesToHeaderNav : Association to many GMSPD_SERV_SRV.SpHeaderSet {  };
  toOrgDetail : Association to GMSPD_SERV_SRV.OrgDetailSet {  };
  toCapDetails : Association to many GMSPD_SERV_SRV.CapDetailSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.SpHeaderSet {
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ItemNo : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Path'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Path : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Service Profile'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ServProfile : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Service Parameter'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ServiceParam : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Parameter Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ParamType : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocType : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Fuel%'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FuelPercentage : Decimal(5, 2);
  @sap.unicode : 'false'
  @sap.label : 'Sales Contract Descr'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SalesDesc : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Parameter Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ParamValue : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPt : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RedeliveryPt : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.SPItemSet {
  @sap.unicode : 'false'
  @sap.label : 'Path'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Path : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ItemNo : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Service Parameter'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ClauseCode : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocType : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Threshold Perc'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ThresholdP : Decimal(3, 0) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidFrom : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidTo : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Service Parameter'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ThreshRef : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Remark'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Remark : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Calculated Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CalculatedValue : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.ContractHeaderSet {
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ItemNo : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'DocumentNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key DeliveryPt : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key RedeliveryPt : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Path'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Path : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Daily ContractQty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Dcq : Decimal(13, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPtText : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RedeliveryPtText : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Fuel%'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FuelPercentage : Decimal(5, 2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transm. Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Transmissiontype : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocType : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSPD_SERV_SRV.HeaderItemConfigSet {
  @sap.unicode : 'false'
  @sap.label : 'Field Level'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Fieldlevel : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'DocumentNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ItemNo : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Contract Field'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ContractField : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Field Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FieldValue : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocType : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Service Profile Get'
entity GMSPD_SERV_SRV.xGMSxServP_Get {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ServiceParam : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  key DocType : String(1) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  key Path : String(50) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ClauseCode : String(20) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid From'
  key ValidFrom : Date not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid To'
  key ValidTo : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  ParamValue : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Type'
  ParamType : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  RedeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  SalesDesc : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'Threshold Perc'
  @sap.quickinfo : 'Threshold Percentage'
  ThresholdP : Decimal(3, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  ThreshRef : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Remark'
  @sap.quickinfo : 'Remarks'
  Remark : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculated Value'
  CalculatedValue : String(20);
};


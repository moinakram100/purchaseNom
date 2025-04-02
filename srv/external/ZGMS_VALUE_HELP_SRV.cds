/* checksum : bdc98e2bf37a8d7ee3edff0cae256955 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZGMS_VALUE_HELP_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.MaterialSet {
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Matnr : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Base Unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Meins : String(3) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.PlantSet {
  @sap.unicode : 'false'
  @sap.label : 'Plant'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Werks : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Matnr : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Storage_LocSet {
  @sap.unicode : 'false'
  @sap.label : 'Stor. Loc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Lgort : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Sold_To_PartySet {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Kunnr : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.LocationSet {
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Pblnr : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Bus.loc. name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Name1 : String(35) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.TransportSet {
  @sap.unicode : 'false'
  @sap.label : 'Trans system'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Tsyst : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'TS name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Tsnam : String(60) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Sales_OrgSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales Org.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vkorg : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Dist_ChannelSet {
  @sap.unicode : 'false'
  @sap.label : 'Distr. Channel'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vtweg : String(2) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.DivisionSet {
  @sap.unicode : 'false'
  @sap.label : 'Division'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Spart : String(2) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Ship_To_PartySet {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Kunnr : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Org.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vkorg : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Division'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Spart : String(2) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.Sales_ContractSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.LocMatnrSet {
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Pmatnr : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locid : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Plan UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Pluom : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locname : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Pmatname : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.UOMSet {
  @sap.unicode : 'false'
  @sap.label : 'Internal UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  key Msehi : String(3) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.LocationPointSet {
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Locid : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Loctyp : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locnam : String(60) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.TsystLocSet {
  @sap.unicode : 'false'
  @sap.label : 'Trans system'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Tsyst : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locid : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locnam : String(60) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZGMS_VALUE_HELP_SRV.ContractTypeSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales Doc. Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Auart : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Screen seq.grp'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Kopgr : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Location Material'
entity ZGMS_VALUE_HELP_SRV.ZLocMatnr {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Location ID'
  key Locid : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Pmatnr : String(40) not null;
  @sap.label : 'Location name'
  @sap.quickinfo : 'Location name (used by system owner)'
  Locname : String(60);
  @sap.label : 'Material description'
  Pmatname : String(40);
  @sap.label : 'Planning UoM'
  @sap.quickinfo : 'OIL-TSW: Planning UoM'
  @sap.semantics : 'unit-of-measure'
  Pluom : String(3);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Location Path Mapping Value Help'
entity ZGMS_VALUE_HELP_SRV.ZLocPath_Map {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Business location ID'
  @sap.quickinfo : 'Business location identifier (IS-Oil MRN)'
  key Pblnr : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Transport system'
  key Tsyst : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Location ID'
  key Locid : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Bus. Location Type'
  @sap.quickinfo : 'Business Location Type (IS-Oil MRN)'
  key Pbltyp : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Origin'
  @sap.quickinfo : 'OIL-TSW: Location is origin flag'
  Delivery_Point : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Destination'
  @sap.quickinfo : 'OIL-TSW: Location destination flag'
  Redelivery_Point : Boolean;
};


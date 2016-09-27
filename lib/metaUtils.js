
var xmlBuilder = require('xmlbuilder');

/**
 * Mapping of file name to Metadata Definition
 */
var metaMap = {
	'actionLinkGroupTemplates': 'ActionLinkGroupTemplate',
	'analyticSnapshots': 'AnalyticSnapshot',
	'applications': 'CustomApplication',
	'appMenus': 'AppMenu',
	'approvalProcesses': 'ApprovalProcess',
	'assignmentRules': 'AssignmentRules',
	'aura': 'AuraDefinitionBundle',
	'authproviders': 'AuthProvider',
	'autoResponseRules': 'AutoResponseRules',
	'cachePartitions': 'PlatformCachePartition',
	'callCenters': 'CallCenter',
	'certs': 'Certificate',
	'channelLayouts': 'ChannelLayout',
	'classes': 'ApexClass',
	'communities': 'Community',
	'components': 'ApexComponent',
	'connectedApps': 'ConnectedApp',
	'corsWhitelistOrigins': 'CorsWhitelistOrigin',
	'customApplicationComponents': 'CustomApplicationComponent',
	'customMetadata': 'CustomMetadata',
	'customPermissions': 'CustomPermission',
	'dashboards': 'Dashboard',
	'datacategorygroups': 'DataCategoryGroup',
	'dataSources': 'ExternalDataSource',
	'delegateGroups': 'DelegateGroup',
	'documents': 'Document',
	'email': 'EmailTemplate',
	'entitlementProcesses': 'EntitlementProcess',
	'entitlementTemplates': 'EntitlementTemplate',
	'escalationRules': 'EscalationRules',
	'feedFilters': 'CustomFeedFilter',
	'flexipages': 'FlexiPage',
	'flowDefinitions': 'FlowDefinition',
	'flows': 'Flow',
	'globalPicklists': 'GlobalPicklist',
	'groups': 'Group',
	'homePageComponents': 'HomePageComponent',
	'homePageLayouts': 'HomePageLayout',
	'installedPackages': 'InstalledPackage',
	'labels': 'CustomLabels',
	'layouts': 'Layout',
	'letterhead': 'Letterhead',
	'managedTopics': 'ManagedTopics',
	'matchingRules': 'MatchingRule',
	'moderation': 'KeywordList',
	'namedCredentials': 'NamedCredential',
	'networks': 'Network',
	'objects': 'CustomObject',
	'objectTranslations': 'CustomObjectTranslation',
	'pages': 'ApexPage',
	'pathAssistants': 'PathAssistant',
	'permissionsets': 'PermissionSet',
	'portals': 'Portal',
	'postTemplates': 'PostTemplate',
	'profiles': 'Profile',
	'queues': 'Queue',
	'quickActions': 'QuickAction',
	'remoteSiteSettings': 'RemoteSiteSetting',
	'reports': 'Report',
	'reportTypes': 'ReportType',
	'roles': 'Role',
	'samlssoconfigs': 'SamlSsoConfig',
	'scontrols': 'Scontrol',
	'settings': 'Settings',
	'sharingRules': 'SharingRules',
	'sharingSets': 'SharingSet',
	'siteDotComSites': 'SiteDotCom',
	'sites': 'CustomSite',
	'staticresources': 'StaticResource',
	'synonymDictionaries': 'SynonymDictionary',
	'tabs': 'CustomTab',
	'transactionSecurityPolicies': 'TransactionSecurityPolicy',
	'translations': 'Translations',
	'triggers': 'ApexTrigger',
	'wave': 'WaveApplication',
	'wave': 'WaveDashboard',
	'wave': 'WaveDataflow',
	'wave': 'WaveDataset',
	'wave': 'WaveLens',
	'weblinks': 'CustomPageWebLink',
	'workflows': 'Workflow'
};

exports.packageWriter = function(metadata, apiVersion) {

	apiVersion = apiVersion || '37.0';
	var xml = xmlBuilder.create('Package', { version: '1.0'});
		xml.att('xmlns', 'http://soap.sforce.com/2006/04/metadata');

	for (var type in metadata) {

		if (metadata.hasOwnProperty(type)) {

			var typeXml = xml.ele('types');

			metadata[type].forEach(function(item) {
				typeXml.ele('members', item);
			});

			typeXml.ele('name', metaMap[type]);
		}

	}
	xml.ele('version', apiVersion);

	return xml.end({pretty: true});
};

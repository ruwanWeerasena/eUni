targetScope = 'subscription'

param subscription string = '7e357fdc-ce6b-4d83-8703-a83caed05747'

resource rg 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: 'test-iac'
  location: 'southeastasia'
}

module database 'modules/database.bicep' = {
  name: 'enui-database'
  scope:rg
  params: {
    serverName: 'euni-adminserverxxx'
    databaseName: 'euni-backendxxx'
  }
}

param serverName string
param databaseName string

resource sqlServer 'Microsoft.Sql/servers@2021-02-01-preview' = {
  name: serverName
  location: resourceGroup().location
  properties: {
    administratorLogin: 'euni'
    administratorLoginPassword: 'Test@123'
  }
}

resource db 'Microsoft.Sql/servers/databases@2014-04-01' = {
  parent: sqlServer
  name: databaseName
  location: resourceGroup().location
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    requestedServiceObjectiveName: 'Basic'
  }
}

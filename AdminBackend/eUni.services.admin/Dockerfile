FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["eUni.data/eUni.data.csproj", "eUni.data/"]
COPY ["eUni.test/eUni.test.csproj", "eUni.test/"] 
COPY ["eUni.services.admin/eUni.services.admin.csproj", "eUni.services.admin/"]
RUN dotnet restore eUni.services.admin/eUni.services.admin.csproj
RUN dotnet restore eUni.test/eUni.test.csproj
COPY . .
WORKDIR /src
RUN dotnet build eUni.services.admin/eUni.services.admin.csproj -c Release -o /app/build
RUN dotnet build eUni.test/eUni.test.csproj -c Release 

FROM build AS test  
ARG BuildId=localhost
LABEL test=${BuildId}
RUN dotnet test --no-build -c Release --results-directory /testresults --logger "trx;LogFileName=test_results.trx" /p:CollectCoverage=true /p:CoverletOutputFormat=json%2cCobertura /p:CoverletOutput=/testresults/coverage/ -p:MergeWith=/testresults/coverage/coverage.json  eUni.test/eUni.test.csproj  

FROM build AS publish
RUN dotnet publish eUni.services.admin.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eUni.services.admin.dll"]

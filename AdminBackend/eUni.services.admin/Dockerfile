FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["eUni.data/eUni.data.csproj", "eUni.data/"]
COPY ["eUni.services.admin/eUni.services.admin.csproj", "eUni.services.admin/"]
RUN dotnet restore eUni.services.admin/eUni.services.admin.csproj
COPY . .
WORKDIR /src/eUni.services.admin
RUN dotnet build eUni.services.admin.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish eUni.services.admin.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eUni.services.admin.dll"]

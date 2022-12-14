alias run-back="cd Backend-Shopping/Api && dotnet watch run"
alias run-front="cd Frontend-Shopping/ && ng serve"
alias run-admin="cd Admin/ && ng serve --port 4210"
alias add-mg="dotnet ef --startup-project ../Api/Api.csproj  migrations add InitialCreation -p DataService.csproj -o Migrations"
alias up-db="dotnet ef --startup-project ../Api/Api.csproj database update -p DataService.csproj"
alias add-mg-c$cName="dotnet ef --startup-project ../Api/Api.csproj migrations add $cName -p DataService.csproj -o migrations"
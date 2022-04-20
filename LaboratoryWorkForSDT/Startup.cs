using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using LaboratoryWorkForSDT.Models;

namespace LaboratoryWorkForSDT
{
    public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SeedlingsContext>(options => options.UseSqlServer(SqlConnectionIntegratedSecurity));
            services.AddControllers();
        }

        public static string SqlConnectionIntegratedSecurity
        {
            get
            {

                var sb = new SqlConnectionStringBuilder
                {

                    DataSource = @"LAPTOP-92FKSE2H",
                    InitialCatalog = "SoftwareDevelopmentsTools",
                    IntegratedSecurity = true

                };

                return sb.ConnectionString;

            }
        }

        public void Configure(IApplicationBuilder app)
        {

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseEndpoints(endpoint =>
            {
                endpoint.MapControllers();
            });

        }


    }
}
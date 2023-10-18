using Microsoft.EntityFrameworkCore;

namespace Take_Care.Models
{
	public class EmployeeContext: DbContext
	{
		public DbSet<Employee> Employees { get; set; }
	}
	
}

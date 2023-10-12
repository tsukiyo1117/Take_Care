using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class Case
{
    public int CaseId { get; set; }

    public int EmployeeId { get; set; }

    public int EmployerId { get; set; }

    public DateTime? StartDateTime { get; set; }

    public DateTime? EndDateTime { get; set; }

    public string? TaskName { get; set; }

    public decimal? Commission { get; set; }

    public decimal? Amount { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Employer Employer { get; set; } = null!;
}

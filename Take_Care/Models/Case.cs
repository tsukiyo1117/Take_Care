using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class Case
{
    public int CaseId { get; set; }

    public int EmployerId { get; set; }

    public string? ServiceName { get; set; }

    public DateTime? StartDateTime { get; set; }

    public string? Remark { get; set; }

    public int EmployeeId { get; set; }

    public decimal? Amount { get; set; }

    public bool? PaymentStatus { get; set; }

    public bool? CaseStatus { get; set; }

    public virtual ICollection<EcpayOrder> EcpayOrders { get; set; } = new List<EcpayOrder>();

    //public virtual Employee Employee { get; set; } 

    //public virtual Employer Employer { get; set; } 
}

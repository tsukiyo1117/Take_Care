using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class ServiceItem
{
    public int ServiceItemId { get; set; }

    public string? ServiceCode { get; set; }

    public string? ServiceName { get; set; }

    public decimal? Price { get; set; }
}

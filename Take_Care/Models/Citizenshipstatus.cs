using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class Citizenshipstatus
{
    public int CitizenshipstatuId { get; set; }

    public string? Category { get; set; }

    public decimal? Care { get; set; }

    public decimal? Transport { get; set; }

    public decimal? Aid { get; set; }

    public decimal? Respite { get; set; }
}

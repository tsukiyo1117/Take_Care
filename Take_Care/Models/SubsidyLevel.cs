using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class SubsidyLevel
{
    public int SubsidyLevelId { get; set; }

    public int? Level { get; set; }

    public decimal? Care { get; set; }

    public decimal? Respite { get; set; }
}

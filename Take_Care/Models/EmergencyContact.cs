using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class EmergencyContact
{
    public int ContactId { get; set; }

    public int? PersonalInfoId { get; set; }

    public string? ContactName { get; set; }

    public string? ContactPhone { get; set; }

    public string? ContactMobile { get; set; }

    public string? ContactRelationship { get; set; }
}

using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class Employer
{
    public int EmployerId { get; set; }

    public string Account { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Gender { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Address { get; set; }

    public byte[]? Photo { get; set; }

    public string? PhotoUrl { get; set; }

    public string? AddressSection { get; set; }

    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    public virtual ICollection<PersonalInfo> PersonalInfos { get; set; } = new List<PersonalInfo>();
}

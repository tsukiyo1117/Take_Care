using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class PersonalInfo
{
    public int Id { get; set; }

    public string IdentityCard { get; set; } = null!;

    public string? Name { get; set; }

    public string? Gender { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Language { get; set; }

    public string? ResidentialAddress { get; set; }

    public string? MailingAddress { get; set; }

    public string? WelfareStatus { get; set; }

    public string? LongTermCareStatus { get; set; }

    public string? ResidentialStatus { get; set; }

    public string? MedicalCondition { get; set; }

    public string? Remark { get; set; }
}

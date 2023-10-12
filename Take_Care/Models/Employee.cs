using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string? EmployeeName { get; set; }

    public string Account { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public string? CellPhone { get; set; }

    public string? Gender { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Address { get; set; }

    public string? SelfIntroduction { get; set; }

    public string? Skill { get; set; }

    public byte[]? Photo { get; set; }

    public string? PhotoUrl { get; set; }

    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}

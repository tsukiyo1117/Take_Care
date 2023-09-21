using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class MemberView
{
    public string? MemberName { get; set; }

    public string Account { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public string UserType { get; set; } = null!;
}

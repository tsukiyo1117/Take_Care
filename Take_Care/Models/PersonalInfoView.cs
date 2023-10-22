using System;
using System.Collections.Generic;

namespace Take_Care.Models;

public partial class PersonalInfoView
{
    public DateTime? PersonalBirthday { get; set; }

    public string? PersonalGender { get; set; }

    public string PersonalIdentityCard { get; set; } = null!;

    public string? PersonalName { get; set; }

    public string? PersonalResidentialAddress { get; set; }

    public string? PersonalResidentialAddressSection { get; set; }

    public string? PersonalLanguage { get; set; }

    public string? PersonalMailingAddress { get; set; }

    public string? PersonalMailingAddressSection { get; set; }

    public string? PersonaWelfareStatusl { get; set; }

    public string? PersonalLongTermCareStatus { get; set; }

    public string? PersonalMedicalCondition { get; set; }

    public string? PersonalRemark { get; set; }

    public string EmployerAccount { get; set; } = null!;

    public string EmployerPassword { get; set; } = null!;

    public string? EmployerFullName { get; set; }

    public string? EmployerEmail { get; set; }

    public string? EmployerPhoneNumber { get; set; }

    public string? EmployerGender { get; set; }

    public string? EmployerAddress { get; set; }

    public string? EmployerAddressSection { get; set; }

    public string? EmployerPhotoUrl { get; set; }
}

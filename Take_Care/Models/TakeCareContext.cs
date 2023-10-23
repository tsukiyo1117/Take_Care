using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Take_Care.Models;

public partial class TakeCareContext : DbContext
{
    public TakeCareContext()
    {
    }

    public TakeCareContext(DbContextOptions<TakeCareContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Case> Cases { get; set; }

    public virtual DbSet<Citizenshipstatus> Citizenshipstatuses { get; set; }

    public virtual DbSet<EcpayOrder> EcpayOrders { get; set; }

    public virtual DbSet<EmergencyContact> EmergencyContacts { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Employer> Employers { get; set; }

    public virtual DbSet<Fourpack> Fourpacks { get; set; }

    public virtual DbSet<FourpacksLongterm> FourpacksLongterms { get; set; }

    public virtual DbSet<FourpacksOrder> FourpacksOrders { get; set; }

    public virtual DbSet<MemberView> MemberViews { get; set; }

    public virtual DbSet<PersonalInfo> PersonalInfos { get; set; }

    public virtual DbSet<PersonalInfoView> PersonalInfoViews { get; set; }

    public virtual DbSet<ServiceItem> ServiceItems { get; set; }

    public virtual DbSet<ServiceItemsDetail> ServiceItemsDetails { get; set; }

    public virtual DbSet<SubsidyLevel> SubsidyLevels { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=.;Database=Take_Care;Integrated Security=True;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.CaseId).HasName("PK__Cases__6CAE526C0A607B6A");

            entity.Property(e => e.CaseId).HasColumnName("CaseID");
            entity.Property(e => e.Amount).HasColumnType("money");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.EmployerId).HasColumnName("EmployerID");
            entity.Property(e => e.Remark).HasMaxLength(255);
            entity.Property(e => e.ServiceName).HasMaxLength(50);
            entity.Property(e => e.StartDateTime).HasColumnType("datetime");

            //entity.HasOne(d => d.Employee).WithMany(p => p.Cases)
            //    .HasForeignKey(d => d.EmployeeId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__Cases__EmployeeI__4F47C5E3");

            //entity.HasOne(d => d.Employer).WithMany(p => p.Cases)
            //    .HasForeignKey(d => d.EmployerId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__Cases__EmployerI__503BEA1C");
        });

        modelBuilder.Entity<Citizenshipstatus>(entity =>
        {
            entity.HasKey(e => e.CitizenshipstatuId).HasName("PK__Citizens__5885361912BEA187");

            entity.ToTable("Citizenshipstatus");

            entity.Property(e => e.CitizenshipstatuId).HasColumnName("CitizenshipstatuID");
            entity.Property(e => e.Aid).HasColumnType("money");
            entity.Property(e => e.Care).HasColumnType("money");
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Respite).HasColumnType("money");
            entity.Property(e => e.Transport).HasColumnType("money");
        });

        modelBuilder.Entity<EcpayOrder>(entity =>
        {
            entity.HasKey(e => e.MerchantTradeNo);

            entity.Property(e => e.MerchantTradeNo).HasMaxLength(50);
            entity.Property(e => e.CaseId).HasColumnName("CaseID");
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentType).HasMaxLength(50);
            entity.Property(e => e.PaymentTypeChargeFee).HasMaxLength(50);
            entity.Property(e => e.RtnMsg).HasMaxLength(50);
            entity.Property(e => e.TradeDate).HasMaxLength(50);
            entity.Property(e => e.TradeNo).HasMaxLength(50);

            entity.HasOne(d => d.Case).WithMany(p => p.EcpayOrders)
                .HasForeignKey(d => d.CaseId)
                .HasConstraintName("FK__EcpayOrde__Membe__57DD0BE4");
        });

        modelBuilder.Entity<EmergencyContact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__Emergenc__82ACC1CD85EA98D7");

            entity.ToTable("Emergency_Contacts");

            entity.Property(e => e.ContactId).HasColumnName("Contact_ID");
            entity.Property(e => e.ContactMobile)
                .HasMaxLength(20)
                .HasColumnName("Contact_Mobile");
            entity.Property(e => e.ContactName)
                .HasMaxLength(255)
                .HasColumnName("Contact_Name");
            entity.Property(e => e.ContactPhone)
                .HasMaxLength(20)
                .HasColumnName("Contact_Phone");
            entity.Property(e => e.ContactRelationship)
                .HasMaxLength(50)
                .HasColumnName("Contact_Relationship");
            entity.Property(e => e.PersonalInfoId).HasColumnName("Personal_Info_ID");

            entity.HasOne(d => d.PersonalInfo).WithMany(p => p.EmergencyContacts)
                .HasForeignKey(d => d.PersonalInfoId)
                .HasConstraintName("FK_Emergency_Contacts_Personal_Info");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF1E7D2045A");

            entity.HasIndex(e => e.Email, "UQ__Employee__A9D105344CF63248").IsUnique();

            entity.HasIndex(e => e.Account, "UQ__Employee__B0C3AC467976D68A").IsUnique();

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Account)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.CellPhone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.EmployeeName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhotoUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PhotoURL");
            entity.Property(e => e.SelfIntroduction).HasColumnType("text");
            entity.Property(e => e.Skill)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Employer>(entity =>
        {
            entity.HasKey(e => e.EmployerId).HasName("PK__Employer__1788CCACB247CE8E");

            entity.HasIndex(e => e.Email, "UQ__Employer__A9D10534A957DDB0").IsUnique();

            entity.HasIndex(e => e.Account, "UQ__Employer__B0C3AC4687B45FE7").IsUnique();

            entity.Property(e => e.EmployerId).HasColumnName("EmployerID");
            entity.Property(e => e.Account)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AddressSection)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PhotoUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PhotoURL");
        });

        modelBuilder.Entity<Fourpack>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fourpacks");

            entity.Property(e => e.FourpacksP1).HasMaxLength(255);
            entity.Property(e => e.FourpacksP10).HasMaxLength(255);
            entity.Property(e => e.FourpacksP11).HasMaxLength(255);
            entity.Property(e => e.FourpacksP12).HasMaxLength(255);
            entity.Property(e => e.FourpacksP13).HasMaxLength(255);
            entity.Property(e => e.FourpacksP14).HasMaxLength(255);
            entity.Property(e => e.FourpacksP15).HasMaxLength(255);
            entity.Property(e => e.FourpacksP16).HasMaxLength(255);
            entity.Property(e => e.FourpacksP17).HasMaxLength(255);
            entity.Property(e => e.FourpacksP2).HasMaxLength(255);
            entity.Property(e => e.FourpacksP3).HasMaxLength(255);
            entity.Property(e => e.FourpacksP4).HasMaxLength(255);
            entity.Property(e => e.FourpacksP5).HasMaxLength(255);
            entity.Property(e => e.FourpacksP6).HasMaxLength(255);
            entity.Property(e => e.FourpacksP7).HasMaxLength(255);
            entity.Property(e => e.FourpacksP8).HasMaxLength(255);
            entity.Property(e => e.FourpacksP9).HasMaxLength(255);
        });

        modelBuilder.Entity<FourpacksLongterm>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fourpacksLongterm");

            entity.Property(e => e.LongtermP1)
                .HasMaxLength(255)
                .HasColumnName("longtermP1");
            entity.Property(e => e.LongtermP2)
                .HasMaxLength(255)
                .HasColumnName("longtermP2");
            entity.Property(e => e.LongtermP3)
                .HasMaxLength(255)
                .HasColumnName("longtermP3");
            entity.Property(e => e.LongtermP4)
                .HasMaxLength(255)
                .HasColumnName("longtermP4");
            entity.Property(e => e.LongtermP5)
                .HasMaxLength(255)
                .HasColumnName("longtermP5");
            entity.Property(e => e.LongtermP6)
                .HasMaxLength(255)
                .HasColumnName("longtermP6");
            entity.Property(e => e.LongtermP7)
                .HasMaxLength(255)
                .HasColumnName("longtermP7");
        });

        modelBuilder.Entity<FourpacksOrder>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fourpacksOrder");

            entity.Property(e => e.FourpacksOrderP1)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP1");
            entity.Property(e => e.FourpacksOrderP2)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP2");
            entity.Property(e => e.FourpacksOrderP3)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP3");
            entity.Property(e => e.FourpacksOrderP4)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP4");
            entity.Property(e => e.FourpacksOrderP5)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP5");
            entity.Property(e => e.FourpacksOrderP6)
                .HasMaxLength(255)
                .HasColumnName("fourpacksOrderP6");
        });

        modelBuilder.Entity<MemberView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MemberView");

            entity.Property(e => e.Account)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MemberName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserType)
                .HasMaxLength(8)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PersonalInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Personal__3214EC27EE778406");

            entity.ToTable("Personal_Info");

            entity.HasIndex(e => e.IdentityCard, "UQ__Personal__A450139A9FB8F5FE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.EmployerId).HasColumnName("EmployerID");
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.IdentityCard)
                .HasMaxLength(10)
                .HasColumnName("Identity_Card");
            entity.Property(e => e.Language).HasMaxLength(50);
            entity.Property(e => e.LongTermCareStatus)
                .HasMaxLength(50)
                .HasColumnName("Long_Term_Care_Status");
            entity.Property(e => e.MailingAddress)
                .HasMaxLength(255)
                .HasColumnName("Mailing_Address");
            entity.Property(e => e.MailingAddressSection)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Mailing_AddressSection");
            entity.Property(e => e.MedicalCondition)
                .HasMaxLength(255)
                .HasColumnName("Medical_Condition");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Remark).HasMaxLength(255);
            entity.Property(e => e.ResidentialAddress)
                .HasMaxLength(255)
                .HasColumnName("Residential_Address");
            entity.Property(e => e.ResidentialAddressSection)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Residential_AddressSection");
            entity.Property(e => e.ResidentialStatus)
                .HasMaxLength(50)
                .HasColumnName("Residential_Status");
            entity.Property(e => e.WelfareStatus)
                .HasMaxLength(50)
                .HasColumnName("Welfare_Status");

            entity.HasOne(d => d.Employer).WithMany(p => p.PersonalInfos)
                .HasForeignKey(d => d.EmployerId)
                .HasConstraintName("FK_Personal_Info_Employers");
        });

        modelBuilder.Entity<PersonalInfoView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("PersonalInfoView");

            entity.Property(e => e.EmployerAccount)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EmployerAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmployerAddressSection)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.EmployerEmail)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.EmployerFullName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.EmployerGender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.EmployerPassword)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmployerPhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.EmployerPhotoUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EmployerPhotoURL");
            entity.Property(e => e.PersonaWelfareStatusl).HasMaxLength(50);
            entity.Property(e => e.PersonalBirthday).HasColumnType("date");
            entity.Property(e => e.PersonalGender).HasMaxLength(10);
            entity.Property(e => e.PersonalIdentityCard).HasMaxLength(10);
            entity.Property(e => e.PersonalLanguage).HasMaxLength(50);
            entity.Property(e => e.PersonalLongTermCareStatus).HasMaxLength(50);
            entity.Property(e => e.PersonalMailingAddress).HasMaxLength(255);
            entity.Property(e => e.PersonalMailingAddressSection)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PersonalMedicalCondition).HasMaxLength(255);
            entity.Property(e => e.PersonalName).HasMaxLength(255);
            entity.Property(e => e.PersonalRemark).HasMaxLength(255);
            entity.Property(e => e.PersonalResidentialAddress).HasMaxLength(255);
            entity.Property(e => e.PersonalResidentialAddressSection)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ServiceItem>(entity =>
        {
            entity.HasKey(e => e.ServiceItemId).HasName("PK__ServiceI__CC153FD8FDC50EE4");

            entity.Property(e => e.ServiceItemId).HasColumnName("ServiceItemID");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.ServiceCode).HasMaxLength(50);
            entity.Property(e => e.ServiceName).HasMaxLength(255);
        });

        modelBuilder.Entity<ServiceItemsDetail>(entity =>
        {
            entity.HasKey(e => e.ServiceItemId).HasName("PK__ServiceI__CC153FD81BBE1E8C");

            entity.ToTable("ServiceItemsDetail");

            entity.Property(e => e.ServiceItemId).HasColumnName("ServiceItemID");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.ServiceCode).HasMaxLength(50);
            entity.Property(e => e.ServiceName).HasMaxLength(255);
        });

        modelBuilder.Entity<SubsidyLevel>(entity =>
        {
            entity.HasKey(e => e.SubsidyLevelId).HasName("PK__SubsidyL__B26BEB18454DC22E");

            entity.ToTable("SubsidyLevel");

            entity.Property(e => e.SubsidyLevelId).HasColumnName("SubsidyLevelID");
            entity.Property(e => e.Care).HasColumnType("money");
            entity.Property(e => e.Respite).HasColumnType("money");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

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

    public virtual DbSet<EmergencyContact> EmergencyContacts { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Employer> Employers { get; set; }

    public virtual DbSet<MemberView> MemberViews { get; set; }

    public virtual DbSet<PersonalInfo> PersonalInfos { get; set; }

    public virtual DbSet<ServiceItem> ServiceItems { get; set; }

    public virtual DbSet<ServiceItemsDetail> ServiceItemsDetails { get; set; }

    public virtual DbSet<SubsidyLevel> SubsidyLevels { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=.;Database=Take_Care;Integrated Security=True;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.CaseId).HasName("PK__Cases__6CAE526C642A2079");

            entity.Property(e => e.CaseId).HasColumnName("CaseID");
            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Commission).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.EmployerId).HasColumnName("EmployerID");
            entity.Property(e => e.EndDateTime).HasColumnType("datetime");
            entity.Property(e => e.StartDateTime).HasColumnType("datetime");
            entity.Property(e => e.TaskName).HasMaxLength(50);

            entity.HasOne(d => d.Employee).WithMany(p => p.Cases)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cases__EmployeeI__3E52440B");

            entity.HasOne(d => d.Employer).WithMany(p => p.Cases)
                .HasForeignKey(d => d.EmployerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cases__EmployerI__3F466844");
        });

        modelBuilder.Entity<Citizenshipstatus>(entity =>
        {
            entity.HasKey(e => e.CitizenshipstatuId).HasName("PK__Citizens__58853619DD0D6F46");

            entity.ToTable("Citizenshipstatus");

            entity.Property(e => e.CitizenshipstatuId).HasColumnName("CitizenshipstatuID");
            entity.Property(e => e.Aid).HasColumnType("money");
            entity.Property(e => e.Care).HasColumnType("money");
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Respite).HasColumnType("money");
            entity.Property(e => e.Transport).HasColumnType("money");
        });

        modelBuilder.Entity<EmergencyContact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__Emergenc__82ACC1CD6B673C3B");

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
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF189A390A4");

            entity.HasIndex(e => e.Email, "UQ__Employee__A9D10534F96DE4A7").IsUnique();

            entity.HasIndex(e => e.Account, "UQ__Employee__B0C3AC46F93ABA72").IsUnique();

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
            entity.HasKey(e => e.EmployerId).HasName("PK__Employer__CA4452417916F2D3");

            entity.HasIndex(e => e.Email, "UQ__Employer__A9D105344B0200C9").IsUnique();

            entity.HasIndex(e => e.Account, "UQ__Employer__B0C3AC46FD6145BB").IsUnique();

            entity.Property(e => e.EmployerId).HasColumnName("EmployerID");
            entity.Property(e => e.Account)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address)
                .HasMaxLength(255)
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
            entity.HasKey(e => e.Id).HasName("PK__Personal__3214EC27567A357B");

            entity.ToTable("Personal_Info");

            entity.HasIndex(e => e.IdentityCard, "UQ__Personal__A450139ABCD9CD52").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Birthday).HasColumnType("date");
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
            entity.Property(e => e.MedicalCondition)
                .HasMaxLength(255)
                .HasColumnName("Medical_Condition");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Remark).HasMaxLength(255);
            entity.Property(e => e.ResidentialAddress)
                .HasMaxLength(255)
                .HasColumnName("Residential_Address");
            entity.Property(e => e.ResidentialStatus)
                .HasMaxLength(50)
                .HasColumnName("Residential_Status");
            entity.Property(e => e.WelfareStatus)
                .HasMaxLength(50)
                .HasColumnName("Welfare_Status");
        });

        modelBuilder.Entity<ServiceItem>(entity =>
        {
            entity.HasKey(e => e.ServiceItemId).HasName("PK__ServiceI__CC153FD87FDFAD2B");

            entity.Property(e => e.ServiceItemId).HasColumnName("ServiceItemID");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.ServiceCode).HasMaxLength(50);
            entity.Property(e => e.ServiceName).HasMaxLength(255);
        });

        modelBuilder.Entity<ServiceItemsDetail>(entity =>
        {
            entity.HasKey(e => e.ServiceItemId).HasName("PK__ServiceI__CC153FD81E1D45F7");

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
            entity.HasKey(e => e.SubsidyLevelId).HasName("PK__SubsidyL__B26BEB18D33C8472");

            entity.ToTable("SubsidyLevel");

            entity.Property(e => e.SubsidyLevelId).HasColumnName("SubsidyLevelID");
            entity.Property(e => e.Care).HasColumnType("money");
            entity.Property(e => e.Respite).HasColumnType("money");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

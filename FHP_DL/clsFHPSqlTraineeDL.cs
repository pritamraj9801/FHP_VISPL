using FHP_Res;
using FHP_Res.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
namespace FHP_DL
{
    public class clsFHPSqlTraineeDL : ITraineeRepository
    {
        private readonly string connectionString;
        private string filePath = @"D:\.Net Development\FHP_VERTEX\Build\Resources\appConfig.ini";
        public clsFHPSqlTraineeDL()
        {
            IniFilesHandle iniFile = new IniFilesHandle(filePath);
            connectionString = iniFile.IniReadValue("Db", "ConnectionString");
        }
        public bool Add(Trainee trainee)
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO Trainee (prefix, first_name, middle_name, last_name, education, joining_date, current_company, current_address, date_of_birth) 
                         VALUES (@Prefix, @FirstName, @MiddleName, @LastName, @Education, @JoiningDate, @CurrentCompany, @CurrentAddress, @DateOfBirth)";
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@Prefix", trainee.Prefix);
                    command.Parameters.AddWithValue("@FirstName", trainee.FirstName);
                    command.Parameters.AddWithValue("@MiddleName", trainee.MiddleName);
                    command.Parameters.AddWithValue("@LastName", trainee.LastName);
                    command.Parameters.AddWithValue("@Education", trainee.Education);
                    command.Parameters.AddWithValue("@JoiningDate", trainee.JoiningDate);
                    command.Parameters.AddWithValue("@CurrentCompany", trainee.CurrentCompany);
                    command.Parameters.AddWithValue("@CurrentAddress", trainee.CurrentAddress);
                    command.Parameters.AddWithValue("@DateOfBirth", trainee.DateOfBirth);

                    try
                    {
                        sqlConnection.Open();
                        int rowsAffected = command.ExecuteNonQuery();
                        return rowsAffected > 0;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
        }
        public List<Trainee> GetAllTrainee()
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Trainee";
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    sqlConnection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<Trainee> trainees = new List<Trainee>();
                        while (reader.Read())
                        {
                            Trainee trainee = new Trainee();
                            trainee.SerialNumber = Convert.ToInt32(reader["id"]);
                            trainee.Prefix = reader["prefix"].ToString();
                            trainee.FirstName = reader["first_name"].ToString();
                            trainee.MiddleName = reader["middle_name"].ToString();
                            trainee.LastName = reader["last_name"].ToString();
                            trainee.Education = Convert.ToByte(reader["education"]);
                            trainee.JoiningDate = Convert.ToDateTime(reader["joining_date"]);
                            trainee.CurrentCompany = reader["current_company"].ToString();
                            trainee.CurrentAddress = reader["current_address"].ToString();
                            trainee.DateOfBirth = Convert.ToDateTime(reader["date_of_birth"]);
                            trainees.Add(trainee);
                        }
                        return trainees;
                    }
                }
            }
        }
        public bool Delete(Trainee trainee)
        {
            string query = "DELETE FROM Trainee WHERE id = @Id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@Id", trainee.SerialNumber);

                    sqlConnection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }
        public bool Update(Trainee trainee)
        {
            string query = "UPDATE Trainee SET prefix = @Prefix, first_name = @FirstName, middle_name = @MiddleName, " +
                           "last_name = @LastName, education = @Education, joining_date = @JoiningDate, " +
                           "current_company = @CurrentCompany, current_address = @CurrentAddress, date_of_birth = @DateOfBirth " +
                           "WHERE id = @Id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@Id", trainee.SerialNumber);
                    command.Parameters.AddWithValue("@Prefix", (object)trainee.Prefix ?? DBNull.Value);
                    command.Parameters.AddWithValue("@FirstName", (object)trainee.FirstName ?? DBNull.Value);
                    command.Parameters.AddWithValue("@MiddleName", (object)trainee.MiddleName ?? DBNull.Value);
                    command.Parameters.AddWithValue("@LastName", (object)trainee.LastName ?? DBNull.Value);
                    command.Parameters.AddWithValue("@Education", (object)trainee.Education ?? DBNull.Value);
                    command.Parameters.AddWithValue("@JoiningDate", (object)trainee.JoiningDate ?? DBNull.Value);
                    command.Parameters.AddWithValue("@CurrentCompany", (object)trainee.CurrentCompany ?? DBNull.Value);
                    command.Parameters.AddWithValue("@CurrentAddress", (object)trainee.CurrentAddress ?? DBNull.Value);
                    command.Parameters.AddWithValue("@DateOfBirth", (object)trainee.DateOfBirth ?? DBNull.Value);

                    sqlConnection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

    }
}

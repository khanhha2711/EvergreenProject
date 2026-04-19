package com.example.logistic.repository;

import com.example.logistic.entity.Accounts;
import com.example.logistic.entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface IAccountRepository extends JpaRepository<Accounts,Integer> {
    Optional<Accounts> findByUserId_Id(int userId);
    Accounts findByGmail(String gmail);
    Optional<Accounts> findByGmailAndIdNot(String gmail, Integer accountId);
    Optional<Accounts> findByUserId(Users user);
    @Modifying
    @Transactional
    @Query("UPDATE Accounts a SET a.password = :newPassword WHERE a.gmail = :gmail")
    int resetPassword(@Param("gmail") String gmail,
                      @Param("newPassword") String newPassword);

}

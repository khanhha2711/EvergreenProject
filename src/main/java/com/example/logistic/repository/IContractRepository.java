package com.example.logistic.repository;

import com.example.logistic.entity.Contracts;
import com.example.logistic.entity.Quotations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IContractRepository extends JpaRepository<Contracts,Integer> {
    Contracts findByContractCode(String contractCode);
    @Modifying
    @Transactional
    @Query("UPDATE Contracts c SET c.contractStatus = 'DONE' " +
            "WHERE c.expiredDate <= :today AND c.contractStatus = 'ACTIVE'")
    int updateStatusToDoneForExpired(@Param("today") LocalDate today);
    @Query(
            value = "SELECT * FROM contracts c " +
                    "WHERE (:search IS NULL OR c.contract_code LIKE %:search%) " +
                    "AND (:filter IS NULL OR c.contract_status = :filter)",
            nativeQuery = true
    )
    List<Contracts> findBySearchAndFilter(@Param("search") String search,
                                          @Param("filter") String filter);
    boolean existsByQuotations(Quotations quotations);

    boolean existsByContractNumber(String contractNumber);
    List<Contracts> findAllByOrderByContractCodeDesc();
}

package com.example.logistic.repository;

import com.example.logistic.DTO.QuotationDTO.ListQuoDTO;
import com.example.logistic.entity.QuotationDetail;
import com.example.logistic.entity.Quotations;
import com.example.logistic.entity.Requests;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface IQuotationRepository extends JpaRepository<Quotations, Integer> {
    Optional<Quotations> findByQuotationCode(String quotationCode);
    @Query("SELECT q FROM Quotations q " +
            "JOIN FETCH q.request r " +
            "JOIN FETCH r.customer c " +
            "JOIN FETCH q.employee e " +
            "JOIN FETCH e.user u " +
            "WHERE (:search IS NULL OR c.companyName LIKE %:search%) " +
            "AND (:filter IS NULL OR q.status = :filter)")
    List<Quotations> findBySearchAndFilter(@Param("search") String search,
                                           @Param("filter") String filter);

    Quotations findByRequest(Requests request);
    List<Quotations> findAllByOrderByQuotationCodeDesc();

}

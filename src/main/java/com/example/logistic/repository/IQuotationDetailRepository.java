package com.example.logistic.repository;

import com.example.logistic.entity.Employees;
import com.example.logistic.entity.QuotationDetail;
import com.example.logistic.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuotationDetailRepository extends JpaRepository<QuotationDetail, Integer> {

    @Query(value=" select q.quotation_code from quotation_details dt join quotations q on dt.quotation_id=q.id where q.quotation_code =:quotationCode;" ,nativeQuery = true)
    List<QuotationDetail> findByQuotationCode(@Param("quotationCode") String quotationCode);

    List<QuotationDetail> findByQuotationId(int quotationId);

}

package com.example.logistic.repository;

import com.example.logistic.entity.CusDocuments;
import com.example.logistic.entity.LogDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILogDocumentRepository extends JpaRepository<LogDocuments ,Integer> {
    @Query(value = "SELECT * FROM log_documents WHERE document_id = :documentId", nativeQuery = true)
    List<LogDocuments> findByDocumentId(@Param("documentId") int documentId);
}

package com.example.logistic.repository;

import com.example.logistic.entity.LogDeclarations;
import com.example.logistic.entity.LogDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILogDeclarationRepository extends JpaRepository<LogDeclarations,Integer> {
    @Query(value = "SELECT * FROM log_declarations WHERE declarations_id = :declarationId ORDER BY created_at DESC", nativeQuery = true)
    List<LogDeclarations> findByDeclarationId(@Param("declarationId") int declarationId);
}

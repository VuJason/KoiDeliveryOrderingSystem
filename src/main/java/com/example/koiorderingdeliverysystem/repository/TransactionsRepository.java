package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionsRepository extends JpaRepository<Transactions, String> {
    @Query("SELECT MONTH(t.transactionDate) AS month, SUM(t.amount) AS totalRevenue " +
            "FROM Transactions t GROUP BY MONTH(t.transactionDate)")
    List<Object[]> findMonthlyRevenue();

}

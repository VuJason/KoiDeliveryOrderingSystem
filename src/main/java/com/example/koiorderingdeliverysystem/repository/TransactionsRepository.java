package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionsRepository extends JpaRepository<Transactions, String> {
}

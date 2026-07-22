package com.spillthebill.expense.repository;

import com.spillthebill.expense.entity.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {

}
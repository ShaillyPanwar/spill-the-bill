package com.spillthebill.expense.repository;

import com.spillthebill.expense.entity.Expense;
import com.spillthebill.expense.entity.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {

    List<ExpenseSplit> findByExpense(Expense expense);

}
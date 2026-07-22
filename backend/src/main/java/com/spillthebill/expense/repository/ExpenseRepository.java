package com.spillthebill.expense.repository;

import com.spillthebill.expense.entity.Expense;
import com.spillthebill.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByGroup(Group group);

}

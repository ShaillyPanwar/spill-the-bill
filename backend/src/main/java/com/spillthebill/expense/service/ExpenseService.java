package com.spillthebill.expense.service;

import com.spillthebill.expense.dto.AddExpenseRequest;
import com.spillthebill.expense.dto.ExpenseResponse;
import com.spillthebill.expense.entity.Expense;
import com.spillthebill.expense.entity.ExpenseSplit;
import com.spillthebill.expense.repository.ExpenseRepository;
import com.spillthebill.expense.repository.ExpenseSplitRepository;
import com.spillthebill.group.entity.Group;
import com.spillthebill.group.entity.GroupMember;
import com.spillthebill.group.repository.GroupMemberRepository;
import com.spillthebill.group.repository.GroupRepository;
import com.spillthebill.user.entity.User;
import com.spillthebill.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseSplitRepository expenseSplitRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            ExpenseSplitRepository expenseSplitRepository,
            GroupRepository groupRepository,
            UserRepository userRepository,
            GroupMemberRepository groupMemberRepository) {

        this.expenseRepository = expenseRepository;
        this.expenseSplitRepository = expenseSplitRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.groupMemberRepository = groupMemberRepository;
    }

    public ExpenseResponse addExpense(AddExpenseRequest request){
        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = userRepository.findById(request.getPaidBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = new Expense();
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setGroup(group);
        expense.setPaidBy(user);

        Expense savedExpense = expenseRepository.save(expense);
        List<GroupMember> members = groupMemberRepository.findByGroup(group);

        if (members.isEmpty()) {
            throw new RuntimeException("Group has no members");
        }

        Double splitAmount = savedExpense.getAmount() / members.size();

        for (GroupMember member : members) {
            ExpenseSplit split = new ExpenseSplit();
            split.setExpense(savedExpense);
            split.setUser(member.getUser());
            split.setAmountOwed(splitAmount);

            expenseSplitRepository.save(split);
        }

        return new ExpenseResponse(
                savedExpense.getId(),
                savedExpense.getDescription(),
                savedExpense.getAmount(),
                savedExpense.getPaidBy().getName(),
                savedExpense.getCreatedAt()
        );
    }

    public List<ExpenseResponse> getExpenses(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<Expense> expenses = expenseRepository.findByGroup(group);

        return expenses.stream()
                .map(expense -> new ExpenseResponse(
                        expense.getId(),
                        expense.getDescription(),
                        expense.getAmount(),
                        expense.getPaidBy().getName(),
                        expense.getCreatedAt()
                ))
                .toList();
    }


}

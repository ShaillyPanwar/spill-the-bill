package com.spillthebill.expense.service;

import com.spillthebill.expense.dto.AddExpenseRequest;
import com.spillthebill.expense.dto.BalanceResponse;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Transactional
    public ExpenseResponse addExpense(AddExpenseRequest request) {

        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = userRepository.findById(request.getPaidBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GroupMember> members = groupMemberRepository.findByGroup(group);
        if (members.isEmpty()) {
            throw new RuntimeException("Group has no members");
        }
        boolean isMember = members.stream()
                .anyMatch(member -> member.getUser().getId().equals(user.getId()));
        if (!isMember) {
            throw new RuntimeException("Paid by user is not a member of this group");
        }

        if (request.getParticipantIds() == null || request.getParticipantIds().isEmpty()) {
            throw new RuntimeException("Please select at least one participant");
        }
        for (Long participantId : request.getParticipantIds()) {
            boolean participantExists = members.stream()
                    .anyMatch(member -> member.getUser().getId().equals(participantId));
            if (!participantExists) {
                throw new RuntimeException("Participant is not a member of this group");
            }
        }

        Expense expense = new Expense();
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setGroup(group);
        expense.setPaidBy(user);

        Expense savedExpense = expenseRepository.save(expense);

        double splitAmount = savedExpense.getAmount() / request.getParticipantIds().size();

        for (Long participantId : request.getParticipantIds()) {
            User participant = userRepository.findById(participantId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            ExpenseSplit split = new ExpenseSplit();
            split.setExpense(savedExpense);
            split.setUser(participant);
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

        List<Expense> expenses = expenseRepository.findByGroupOrderByCreatedAtDesc(group);

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

    public List<BalanceResponse> calculateBalances(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        List<Expense> expenses = expenseRepository.findByGroupOrderByCreatedAtDesc(group);
        Map<Long, Double> balances = new HashMap<>();
        for (Expense expense : expenses) {
            // Add full amount to the payer
            Long payerId = expense.getPaidBy().getId();
            balances.put(
                    payerId,
                    balances.getOrDefault(payerId, 0.0) + expense.getAmount()
            );
            // Subtract each member's share
            List<ExpenseSplit> splits = expenseSplitRepository.findByExpense(expense);
            for (ExpenseSplit split : splits) {
                Long userId = split.getUser().getId();

                balances.put(
                        userId,
                        balances.getOrDefault(userId, 0.0) - split.getAmountOwed()
                );
            }
        }
        List<BalanceResponse> response = new ArrayList<>();

        List<GroupMember> members = groupMemberRepository.findByGroup(group);

        for (GroupMember member : members) {

            response.add(
                    new BalanceResponse(
                            member.getUser().getId(),
                            member.getUser().getName(),
                            balances.getOrDefault(member.getUser().getId(), 0.0)
                    )
            );
        }
        return response;
    }


}

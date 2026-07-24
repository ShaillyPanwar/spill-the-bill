package com.spillthebill.expense.service;

import com.spillthebill.expense.dto.BalanceEntry;
import com.spillthebill.expense.dto.BalanceResponse;
import com.spillthebill.expense.dto.SettlementDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SettlementService {

    private final ExpenseService expenseService;

    public SettlementService(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    public List<SettlementDTO> calculateSettlements(Long groupId) {

        List<BalanceResponse> balances = expenseService.calculateBalances(groupId);

        List<BalanceEntry> creditors = new ArrayList<>();
        List<BalanceEntry> debtors = new ArrayList<>();

        for (BalanceResponse balance : balances) {
            creditors.sort((a, b) -> Double.compare(b.getBalance(), a.getBalance()));
            debtors.sort((a, b) -> Double.compare(b.getBalance(), a.getBalance()));
            if (balance.getBalance() > 0) {
                creditors.add(
                        new BalanceEntry(
                                balance.getUserId(),
                                balance.getUserName(),
                                balance.getBalance()
                        ));
            }
            else if (balance.getBalance() < 0) {
                debtors.add(
                        new BalanceEntry(
                                balance.getUserId(),
                                balance.getUserName(),
                                Math.abs(balance.getBalance())
                        )
                );
            }
        }
        List<SettlementDTO> settlements = new ArrayList<>();
        int i = 0;
        int j = 0;

        while (i < debtors.size() && j < creditors.size()) {
            BalanceEntry debtor = debtors.get(i);
            BalanceEntry creditor = creditors.get(j);
            double amount = Math.min(debtor.getBalance(), creditor.getBalance());

            settlements.add(
                    new SettlementDTO(
                            debtor.getUserName(),
                            creditor.getUserName(),
                            amount
                    )
            );
            debtor.setBalance(debtor.getBalance() - amount);
            creditor.setBalance(creditor.getBalance() - amount);
            if (debtor.getBalance()<0.01) {
                i++;
            }
            if (creditor.getBalance()<0.01) {
                j++;
            }
        }
        return settlements;
    }
}
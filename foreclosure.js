'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
  var account = {
    borrowed : 550000,
    balance : 286000,
    monthlyPayment : 1700,
    defaulted : 0,
    defaultsToForeclose : 5,
    foreclosed : false
  };
  function missPayment() {
    account.defaulted++;
    if (account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;
    }
  }
  return {
    getBalance: function() {
      return account.balance;
    },
    receivePayment: function(amount) {
      if (amount < account.monthlyPayment) { 
            missPayment();
      }
        account.balance -= amount;
    },
    getMonthlyPayment: function() {
      return account.monthlyPayment;
    },
    isForeclosed: function() {
      return account.foreclosed;
        },
    };
}

function borrower(loan){
    var account = {
        monthlyIncome: 1350,
        funds: 2800,
        loan: loan,
    };
    return {
        getFunds: function(){
            return account.funds;
        },
        makePayment: function(){
            if(account.funds > loan.getMonthlyPayment()){
                account.funds -= loan.getMonthlyPayment();
                loan.receivePayment(loan.getMonthlyPayment());
            }else{
                loan.receivePayment(account.funds);
                account.funds = 0;
            }
        },
        payDay: function(){
            account.funds += account.monthlyIncome;
        }
    };
}

var stevesLoan = loan();
var steve = borrower(stevesLoan);

while (!stevesLoan.isForeclosed()){
    steve.payDay();
    steve.makePayment();
    month++;
}

monthsUntilEvicted = month;




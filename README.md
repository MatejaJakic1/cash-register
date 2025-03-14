##Description

This project is a simple cash register system that calculates the change due to a customer based on their payment and the total price of the item(s) they are purchasing. The program checks if the customer has provided enough money, calculates the change, and ensures there are enough bills and coins in the drawer to make the change. The program also outputs the status of the transaction, whether it’s "INSUFFICIENT_FUNDS", "CLOSED", or "OPEN", along with the breakdown of the change due.

##Features

- Input cash from the customer.
- Displays the total amount to be paid.
- Computes the change due to the customer.
- Ensures there are enough funds in the cash drawer.
- Handles cases for:
    - Exact payment: "No change due".
    - Insufficient funds in the drawer.
    - Closed drawer when the drawer amount matches the change due.
    - Detailed breakdown of the change with denomination labels.

##Technologies Used

    HTML5
    CSS3
    JavaScript

##How to Use

Clone this repository to your local machine using:

    git clone https://github.com/your-username/cash-register.git

Navigate to the project directory:

    cd cash-register
    
Open the index.html file in a browser.

Enter the cash amount from the customer in the input field and click the "Purchase" button.
The system will display:
    Total amount.
    The change due, if applicable.
    The current state of the cash drawer (including a detailed list of available denominations).
The change will be calculated and presented in denominations such as pennies, nickels, dimes, quarters, and various bill denominations.

##Example Workflow

    Total: $3.26
    Customer enters $5.00.
    The system calculates the change: $1.74.
    The system checks if there are enough coins and bills in the drawer.
    If there’s enough change in the drawer, it will return a breakdown like:

    Status: OPEN
    QUARTER: $0.75
    DIME: $0.10
    NICKEL: $0.05
    PENNY: $0.01

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);

interface Customer {
  id: number;
  name: string;
}

interface table_customer {
  Transaction_id: number,
  custom_id: number,
  amount: number,
  date: string,
  name: string
}

interface Transaction {
  id: number;
  customer_id: number;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'routeTechSummitTask';
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  showTransactions: table_customer[] = [];
  searchTerm: string = " ";
  days: any;
  amounts: any;
  chart: any;

  constructor(private _DataService: DataService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [{
          label: "amount",
          data: this.amounts,
          borderColor: '#000000',
      backgroundColor: '#4f4f4a',
          borderWidth: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this._DataService.TestHostApi().subscribe(
      {
        next: res => {
          console.log("responese of json host")
          console.log(res)
          this.customers = res.record.customers;
          console.log('customers')
          console.log(this.customers)
          console.log('transactions')
          this.transactions = res.record.transactions
          console.log(this.transactions)
          this.FillTable();

        },

        error: err => {
          console.log('error of (json host) ')
          console.log(err)
        }
      }
    )

  }





  getChart(Customer_name: string, customerid: number) {
    let days = this.transactions.filter(transaction => customerid == transaction.customer_id).map(obj => obj.date);
    let amounts = this.transactions.filter(transaction => customerid == transaction.customer_id).map(obj => obj.amount);
   
     // Pop all the data from the labels and datasets
     this.chart.data.labels.length = 0;
     this.chart.data.datasets.forEach((dataset :any) => dataset.data.length = 0);
 
     // Push new arrays of labels and datasets
     this.chart.data.labels.push(...days);
     this.chart.data.datasets[0].data.push(...amounts);
     this.chart.update();

  }






  FillTable() {
    for (let i = 0; i < this.transactions.length; i++) {

      for (let j = 0; j < this.customers.length; j++) {
        if (this.transactions[i].customer_id == this.customers[j].id) {
          let customer = {
            Transaction_id: this.transactions[i].id,
            custom_id: this.customers[j].id,
            amount: this.transactions[i].amount,
            date: this.transactions[i].date,
            name: this.customers[j].name
          }
          this.showTransactions.push(customer);
        }
      }


    }
    this.searchTerm = '';
  }








}
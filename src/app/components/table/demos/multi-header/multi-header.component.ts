import { Component } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-multi-header',
  templateUrl: './multi-header.component.html'
})
export class MultiHeaderComponent {

  topRowHeaders = ['fedBudget', '2017', '2018', '2019', '2020', '2021', 'historicalAvg']
  secondRowHeaders = ['baseProjections', 'gdp2017', 'usd2017', 'gdp2018', 'usd2018', 'gdp2019', 'usd2019', 'gdp2020', 'usd2020', 'gdp2021', 'usd2021', 'gdpAvg', 'usdAvg'];
  

  tableData: TableDataSource[] = [
    { rowHeader: 'Revenue', gdp2017: '17.2%', usd2017: '3,316', gdp2018: '16.4%', usd2018: '3,318', 
      gdp2019: '16.3%', usd2019: '3,490', gdp2020: '16.7%', usd2020: '3,678', gdp2021: '16.7%', 
      usd2021: '3,827', gdpAvg: '17.4%', usdAvg: '3,381'},

    { rowHeader: 'Outlays', gdp2017: '20.6%', usd2017: '3,982', gdp2018: '20.2%', usd2018: '4,142', 
      gdp2019: '21.0%', usd2019: '4,470', gdp2020: '21.3%', usd2020: '4,685', gdp2021: '21.6%',
      usd2021: '4,949', gdpAvg: '20.3%', usdAvg: '4,198'},

    { rowHeader: 'Budget Deficit', gdp2017: '-3.5%', usd2017: '-665', gdp2018: '-3.8%', usd2018: '-804',
      gdp2019: '-4.6%', usd2019: '-981', gdp2020: '-4.6%', usd2020: '-1008', gdp2021: '-4.9%', 
      usd2021: '-1,123', gdpAvg: '-2.9%', usdAvg: '-483'},

    { rowHeader: 'Debt Held by Public', gdp2017: '76.0%', usd2017: '14,665', gdp2018: '77.4%', 
      usd2018: '15,688', gdp2019: '79.2%', usd2019: '16,762', gdp2020: '80.9%', usd2020: '17,872', 
      gdp2021: '83.1%', usd2021: '18,998', gdpAvg: '41.7%', usdAvg: '8,065'},
  ]
}

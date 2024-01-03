import { AfterViewInit, Component, ElementRef } from '@angular/core';
  declare var Chart: any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const ctx = this.elementRef.nativeElement.querySelector('#myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 39, 20, 15, 2, 10],
          borderWidth: 1, 
          backgroundColor: [
            'red', 'blue', 'yellow', 'green', 'purple', 'orange'
          ]
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
  }
}
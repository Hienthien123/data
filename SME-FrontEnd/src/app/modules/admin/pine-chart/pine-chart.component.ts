import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
declare var Chart: any;
@Component({
  selector: 'app-pine-chart', 
  templateUrl: './pine-chart.component.html',
  styleUrls: ['./pine-chart.component.scss']
})
export class PineChartComponent implements AfterViewInit {
  @ViewChild('doughnutChartCanvas', { static: true }) doughnutChartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart: any, args: any, options: any) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'lightGreen',
          }
        }
      },
      plugins: [plugin],
    };

    const ctx = this.doughnutChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, config);
  }

}

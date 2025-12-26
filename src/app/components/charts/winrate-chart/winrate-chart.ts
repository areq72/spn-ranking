import { Component, computed, inject, input, Signal } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { TranslateService } from '@ngx-translate/core';
import { EChartsCoreOption } from 'echarts';
import { ThemeService } from '../../../services/theme.service';
import { QueueType } from '../../../constants/constants';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-winrate-chart',
  imports: [NgxEchartsDirective, DecimalPipe],
  templateUrl: './winrate-chart.html',
  styleUrl: './winrate-chart.css',
})
export class WinrateChart {
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);

  wins = input<number>(0);
  losses = input<number>(0);
  queueType = input<QueueType>();

  winrate = computed(() => {
    return (this.wins() / (this.wins() + this.losses())) * 100;
  });

  chartOptions: Signal<EChartsCoreOption> = computed(() => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: this.themeService.chartStyles()?.tooltipBg,
      textStyle: {
        color: this.themeService.chartStyles()?.textColor,
      },
    },
    legend: {
      top: '5%',
      left: 'center',
      icon: 'circle',
      textStyle: {
        color: this.themeService.chartStyles()?.textColor,
        fontSize: '14px',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: this.themeService.chartStyles()?.borderRadius,
          borderColor: this.themeService.chartStyles()?.borderColor,
          borderWidth: this.themeService.chartStyles()?.borderWidth,
        },
        label: {
          show: true,
          position: 'center',
          formatter: this.translate.instant(`queues.${this.queueType()}`),
          color: this.themeService.chartStyles()?.textColor,
          fontSize: '20px',
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: this.wins(),
            name: this.translate.instant('common.wins'),
            itemStyle: {
              color: this.themeService.chartStyles()?.winsColor,
            },
          },
          {
            value: this.losses(),
            name: this.translate.instant('common.losses'),
            itemStyle: {
              color: this.themeService.chartStyles()?.lossesColor,
            },
          },
        ],
      },
    ],
  }));
}

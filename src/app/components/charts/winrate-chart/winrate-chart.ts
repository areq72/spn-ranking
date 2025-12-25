import { Component, computed, inject, input, Renderer2, Signal } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { TranslateService } from '@ngx-translate/core';
import { EChartsCoreOption } from 'echarts';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-winrate-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './winrate-chart.html',
  styleUrl: './winrate-chart.css',
})
export class WinrateChart {
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);

  wins = input<number>();
  losses = input<number>();

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
      textStyle: {
        color: this.themeService.chartStyles()?.textColor,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: this.themeService.chartStyles()?.borderRadius,
          borderColor: this.themeService.chartStyles()?.borderColor,
          borderWidth: this.themeService.chartStyles()?.borderWidth,
        },
        label: {
          show: false,
          position: 'center',
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
